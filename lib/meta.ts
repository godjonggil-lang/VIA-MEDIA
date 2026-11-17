import 'server-only'
import * as cheerio from 'cheerio'
import { COLUMN_SECTIONS, parseAllowedUrl, type Category } from './config'
import { safeFetch } from './safe-fetch'

export type ArticleMeta = {
  title: string
  image: string | null
  description: string | null
  category: Category
  section: string | null // 매체가 붙인 분류 (예: '국방∙안보', '오피니언')
  imageWarning?: string
}

export async function fetchArticleMeta(articleUrl: string): Promise<ArticleMeta> {
  const { url, headers, body } = await safeFetch(articleUrl, 'text/html,application/xhtml+xml')
  const charset = /charset=([\w-]+)/i.exec(headers.get('content-type') ?? '')?.[1] ?? 'utf-8'
  let html: string
  try {
    html = new TextDecoder(charset).decode(body)
  } catch {
    html = new TextDecoder('utf-8').decode(body)
  }

  const $ = cheerio.load(html)
  const meta = (key: string) =>
    $(`meta[property="${key}"]`).attr('content')?.trim() ||
    $(`meta[name="${key}"]`).attr('content')?.trim() ||
    ''

  // 제목: og:title → <title>. 끝에 붙는 " - 디펜스투데이" 같은 매체명 제거
  const siteName = meta('og:site_name')
  let title = meta('og:title') || $('title').first().text().trim()
  for (const suffix of [siteName, '디펜스투데이'].filter(Boolean)) {
    title = title.replace(new RegExp(`\\s*[-|–—:]\\s*${escapeRegExp(suffix)}\\s*$`), '')
  }

  // 이미지: og:image → 본문 첫 <img>
  const rawImage =
    meta('og:image') ||
    $('article img, #article-view-content-div img, .article-body img, img').first().attr('src') ||
    ''
  let image: string | null = null
  let imageWarning: string | undefined
  if (rawImage) {
    const abs = new URL(rawImage, url).toString()
    if (parseAllowedUrl(abs)) image = abs
    else imageWarning = '대표 이미지가 허용 도메인 밖에 있어 제외했습니다. 이미지 주소를 직접 넣어 주세요.'
  }

  // 분류: <title> 이 '제목 < 오피니언 < 기사본문 - 디펜스투데이' 꼴 → 두 번째 칸
  const parts = $('title').first().text().split(' < ').map((p) => p.trim())
  const section = parts.length >= 3 ? parts[parts.length - 2] : null
  const category: Category = section && COLUMN_SECTIONS.includes(section) ? 'column' : 'news'

  return { title, image, description: meta('og:description') || null, category, section, imageWarning }
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
