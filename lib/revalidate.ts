import 'server-only'
import { createHash, timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { weekOfDate } from './week'

/** 게시물 저장·삭제 후 다시 그려야 할 공개 페이지 */
export function revalidatePostPages(dates: string[]) {
  revalidatePath('/')
  revalidatePath('/archive')
  revalidatePath('/report')
  for (const d of new Set(dates)) revalidateReport(weekOfDate(d).weekId)
}

export function revalidateReport(weekId: string) {
  revalidatePath(`/report/${weekId}`)
  revalidatePath(`/report/${weekId}/opengraph-image`)
}

// /api/revalidate 호출용 토큰. 새 환경변수 없이 service role 키에서 유도한다
// (scripts/publish.mjs 도 같은 방식으로 계산).
export function revalidateToken(): string | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return key ? createHash('sha256').update(`cardnews-revalidate:${key}`).digest('hex') : null
}

export function checkRevalidateToken(header: string | null): boolean {
  const expected = revalidateToken()
  if (!expected || !header?.startsWith('Bearer ')) return false
  const a = createHash('sha256').update(header.slice(7)).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}
