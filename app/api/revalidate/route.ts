import { NextResponse } from 'next/server'
import { checkRevalidateToken, revalidatePostPages } from '@/lib/revalidate'
import { isValidDate } from '@/lib/week'

// 관리자 화면 밖(scripts/publish.mjs)에서 게시물을 저장한 뒤 공개 페이지를 즉시 갱신
export async function POST(request: Request) {
  if (!checkRevalidateToken(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { dates } = (await request.json().catch(() => ({}))) as { dates?: unknown }
  const valid = Array.isArray(dates) ? dates.filter((d): d is string => typeof d === 'string' && isValidDate(d)) : []
  revalidatePostPages(valid)
  return NextResponse.json({ ok: true, dates: valid })
}
