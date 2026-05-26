import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 30초 모듈 레벨 캐시 (웜 인스턴스에서 재사용)
let cache: { value: boolean; ts: number } | null = null

async function isMaintenanceMode(): Promise<boolean> {
  if (cache && Date.now() - cache.ts < 30_000) return cache.value

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
    const value = data[0]?.value === 'true'
    cache = { value, ts: Date.now() }
    return value
  } catch {
    return cache?.value ?? false
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
      return NextResponse.redirect(new URL('/maintenance', request.url), 302)
    }
  }

  // 어드민 인증
  if (isAdmin) {
    // 로그인·로그아웃 API는 인증 없이 통과
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin')) {
      return NextResponse.next()
    }
    const token = request.cookies.get('admin-token')?.value
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
