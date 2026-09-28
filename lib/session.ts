import 'server-only'
import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'

type AdminSession = { admin?: boolean }

// SESSION_SECRET 이 없으면 관리자 비밀번호 + service role 키에서 유도.
// → 새 환경변수를 추가하지 않아도 되고, 비밀번호를 바꾸면 기존 로그인은 모두 풀린다.
function sessionPassword(): string {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32) {
    return process.env.SESSION_SECRET
  }
  const pw = process.env.ADMIN_PASSWORD
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!pw || !key) throw new Error('ADMIN_PASSWORD / SUPABASE_SERVICE_ROLE_KEY 환경변수가 필요합니다')
  return createHash('sha256').update(`cardnews-session:${pw}:${key}`).digest('hex')
}

export async function getSession() {
  return getIronSession<AdminSession>(await cookies(), {
    password: sessionPassword(),
    cookieName: 'cardnews-admin',
    ttl: 60 * 60 * 24 * 14,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    },
  })
}

export async function isAdmin(): Promise<boolean> {
  return (await getSession()).admin === true
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const a = createHash('sha256').update(input).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}
