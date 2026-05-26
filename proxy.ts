import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 캐시 없이 매 요청마다 Supabase에서 최신값 조회
async function isMaintenanceMode(): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/site_settings?key=eq.maintenance_mode&select=value`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        cache: 'no-store',
      }
    )
    const data = await res.json()
    return data[0]?.value === 'true'
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 어드민·API 어드민·점검 페이지는 유지보수 체크 건너뜀
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  const isMaintenance = pathname === '/maintenance'

  if (!isAdmin && !isMaintenance) {
    const maintenance = await isMaintenanceMode()
    if (maintenance) {
      // CDN 캐싱 방지: no-store 헤더 추가
      const res = NextResponse.redirect(new URL('/maintenance', request.url), 302)
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
      res.headers.set('Pragma', 'no-cache')
      return res
    }
  }

  // 정상 응답에도 캐싱 방지 (토글 즉시 반영)
  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')

  // 어드민 인증
  if (isAdmin) {
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin')) {
      return res
    }
    const token = request.cookies.get('admin-token')?.value
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
