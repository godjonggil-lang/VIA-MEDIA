export const SITE_NAME = '디펜스투데이 카드뉴스 HUB'
export const SITE_DESCRIPTION =
  '디펜스투데이 인스타그램 카드뉴스 원문 모음 — 국방안보 뉴스와 안보 칼럼'

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

// 기사 분류 꼬리표. 색은 인스타 카드뉴스 탭 색과 맞춤
export const CATEGORIES = {
  news: { label: '뉴스', accent: 'bg-news' },
  column: { label: '칼럼', accent: 'bg-column' },
} as const

export type Category = keyof typeof CATEGORIES

// 디펜스투데이 기사 분류(페이지 <title> 의 두 번째 칸) 중 '칼럼'으로 볼 것. 나머지는 '뉴스'
export const COLUMN_SECTIONS = ['오피니언', '밀리터리+']

// 주간 리포트 이름 (국문 + 영문 병기)
export const REPORT_NAME = '디펜스투데이 주간 리포트'
export const REPORT_NAME_EN = 'DEFENSE TODAY Weekly Report'

// 메인에 보여줄 기간(일)
export const RECENT_DAYS = 7
