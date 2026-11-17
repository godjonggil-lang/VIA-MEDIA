// 게시물 발행 (관리자 화면 대신 터미널에서):
//   npm run publish -- URL1 URL2 ...
//   npm run publish -- --date 2026-11-17 --topic "머리글" URL1 URL2
// 날짜를 생략하면 오늘(한국 시간). 제목·사진·뉴스/칼럼 분류는 기사 페이지에서 자동으로 가져온다.
// 저장 후 공개 페이지를 즉시 갱신하고 사진을 미리 불러 둔다.
import { createHash } from 'node:crypto'
import * as cheerio from 'cheerio'
import { createClient } from '@supabase/supabase-js'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://via-media-ten.vercel.app'
const ALLOWED = (process.env.NEXT_PUBLIC_ALLOWED_DOMAINS ?? 'defensetoday.kr').split(',').map((d) => d.trim())
const COLUMN_SECTIONS = ['오피니언', '밀리터리+'] // lib/config.ts 와 같게 유지

const args = process.argv.slice(2)
const opt = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args.splice(i, 2)[1] : undefined
}
const date = opt('--date') ?? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date())
const topic = opt('--topic') ?? null
const dryRun = args.includes('--dry-run') && args.splice(args.indexOf('--dry-run'), 1)
const urls = args

if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || urls.length === 0) {
  console.error('사용법: npm run publish -- [--date YYYY-MM-DD] [--topic 머리글] [--dry-run] URL ...')
  process.exit(1)
}

const allowed = (u) => {
  try {
    const url = new URL(u)
    const h = url.hostname.toLowerCase()
    return /^https?:$/.test(url.protocol) && ALLOWED.some((d) => h === d || h.endsWith('.' + d))
  } catch {
    return false
  }
}

async function meta(url) {
  if (!allowed(url)) throw new Error(`허용되지 않은 주소: ${url}`)
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; DefenseTodayCardnewsHub/1.0)' }, signal: AbortSignal.timeout(10000) })
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  const $ = cheerio.load(await res.text())
  const m = (k) => $(`meta[property="${k}"]`).attr('content')?.trim() || ''
  const title = (m('og:title') || $('title').first().text()).replace(/\s*[-|–—:]\s*디펜스투데이\s*$/, '').trim()
  const parts = $('title').first().text().split(' < ').map((p) => p.trim())
  const section = parts.length >= 3 ? parts[parts.length - 2] : null
  const image = m('og:image') ? new URL(m('og:image'), url).toString() : ''
  return {
    category: section && COLUMN_SECTIONS.includes(section) ? 'column' : 'news',
    section,
    title,
    url,
    image_url: allowed(image) ? image : '',
  }
}

const items = []
for (const [i, url] of urls.entries()) {
  const it = await meta(url)
  items.push({ sort_order: i + 1, ...it })
  console.log(`${i + 1}. [${it.category === 'column' ? '칼럼' : '뉴스'} · ${it.section}] ${it.title}${it.image_url ? '' : '  (사진 없음)'}`)
}
if (dryRun) process.exit(0)

const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, { auth: { persistSession: false } })
const { data: postId, error } = await db.rpc('save_post', {
  p_post_date: date,
  p_items: items.map(({ sort_order, category, title, url, image_url }) => ({ sort_order, category, title, url, image_url })),
  p_topic: topic,
  p_post_id: null,
})
if (error) {
  console.error('저장 실패:', error.message)
  process.exit(1)
}
console.log(`저장 완료: ${date} (${postId})`)

// 공개 페이지 즉시 갱신 (lib/revalidate.ts 와 같은 토큰)
const token = createHash('sha256').update(`cardnews-revalidate:${key}`).digest('hex')
const rv = await fetch(`${SITE}/api/revalidate`, {
  method: 'POST',
  headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  body: JSON.stringify({ dates: [date] }),
}).catch((e) => ({ status: e.message }))
console.log('페이지 갱신:', rv.status)

// 사진 미리 불러두기
await Promise.all(
  items.filter((i) => i.image_url).map(async (i) => {
    const proxy = `/api/image?src=${encodeURIComponent(i.image_url)}`
    const opts = { signal: AbortSignal.timeout(15000) }
    const a = await fetch(SITE + proxy, opts).catch(() => null)
    const b = await fetch(`${SITE}/_next/image?url=${encodeURIComponent(proxy)}&w=256&q=75`, opts).catch(() => null)
    console.log(`사진 ${i.sort_order}: ${a?.status ?? '실패'} / ${b?.status ?? '실패'}`)
  }),
)
