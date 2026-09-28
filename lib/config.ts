export const SITE_NAME = '디펜스투데이 카드뉴스 HUB'
export const SITE_DESCRIPTION =
  '디펜스투데이 인스타그램 카드뉴스 원문 모음 — 이주의 국방안보 뉴스와 이주의 안보 칼럼'

// 등록 가능한 기사 도메인. 하위 도메인(www., cdn. 등)도 자동 허용.
// 매체가 늘면 여기에 한 줄 추가하거나, 환경변수 NEXT_PUBLIC_ALLOWED_DOMAINS 에 쉼표로 나열.
const DEFAULT_ALLOWED_DOMAINS = ['defensetoday.kr']

export const ALLOWED_DOMAINS: string[] = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS
  ?.split(',')
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean) ?? DEFAULT_ALLOWED_DOMAINS

export const DOMAIN_ERROR = '디펜스투데이 기사 주소만 등록할 수 있습니다'

/** http(s) 이고, 허용 도메인(하위 도메인 포함)이며, 계정정보·비표준 포트가 없는 URL만 통과 */
export function parseAllowedUrl(input: string): URL | null {
  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
  if (url.username || url.password || url.port) return null
  const host = url.hostname.toLowerCase()
  const ok = ALLOWED_DOMAINS.some((d) => host === d || host.endsWith('.' + d))
  return ok ? url : null
}

export const SECTIONS = [
  { key: 'news', label: '이주의 국방안보 뉴스', accent: 'bg-news' },
  { key: 'column', label: '이주의 안보 칼럼', accent: 'bg-column' },
] as const

export type Section = (typeof SECTIONS)[number]['key']
