import { NextResponse } from 'next/server'
import { DOMAIN_ERROR, parseAllowedUrl } from '@/lib/config'
import { fetchArticleMeta } from '@/lib/meta'
import { FetchError } from '@/lib/safe-fetch'
import { isAdmin } from '@/lib/session'

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 })
  }

  const { url } = (await request.json().catch(() => ({}))) as { url?: unknown }
  if (typeof url !== 'string' || !parseAllowedUrl(url)) {
    return NextResponse.json({ error: DOMAIN_ERROR }, { status: 400 })
  }

  try {
    return NextResponse.json(await fetchArticleMeta(url))
  } catch (e) {
    if (e instanceof FetchError) return NextResponse.json({ error: e.message }, { status: e.status })
    return NextResponse.json({ error: '제목·이미지를 가져오지 못했습니다' }, { status: 500 })
  }
}
