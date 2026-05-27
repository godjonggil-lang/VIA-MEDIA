import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ìºì‹œ ?†ì´ ë§??”ì²­ë§ˆë‹¤ Supabase?ì„œ ìµœì‹ ê°?ì¡°íšŒ
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

  // ?´ë“œë¯¼Â·API ?´ë“œë¯¼Â·ì ê²€ ?˜ì´ì§€??? ì?ë³´ìˆ˜ ì²´í¬ ê±´ë„ˆ?€
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  const isMaintenance = pathname === '/maintenance'

  if (!isAdmin) {
    const maintenance = await isMaintenanceMode()
    if (maintenance && !isMaintenance) {
      // ?ê? ëª¨ë“œ ON ??/maintenanceë¡?ë¦¬ë””?‰ì…˜
      const res = NextResponse.redirect(new URL('/maintenance', request.url), 302)
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
      res.headers.set('Pragma', 'no-cache')
      return res
    }
    if (!maintenance && isMaintenance) {
      // ?ê? ëª¨ë“œ OFF?¸ë° /maintenance ì§ì ‘ ?‘ê·¼ ???ˆìœ¼ë¡?      return NextResponse.redirect(new URL('/', request.url), 302)
    }
  }

  // ?•ìƒ ?‘ë‹µ?ë„ ìºì‹± ë°©ì? (? ê? ì¦‰ì‹œ ë°˜ì˜)
  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')

  // ?´ë“œë¯??¸ì¦
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
