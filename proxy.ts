import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 점검 모드: 어드민·점검 페이지 제외하고 전부 차단
  if (process.env.MAINTENANCE_MODE === 'true') {
    if (!pathname.startsWith('/admin') && pathname !== '/maintenance') {
      return NextResponse.redirect(new URL('/maintenance', request.url))
    }
  }

  // 어드민 인증
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
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
