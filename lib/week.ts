// 날짜·ISO 주차 계산 (한국 시간 기준). 날짜는 'YYYY-MM-DD' 문자열로 주고받는다.

const pad = (n: number) => String(n).padStart(2, '0')
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

const toIso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
const fromIso = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

/** 한국 시간 기준 오늘 'YYYY-MM-DD' */
export function todaySeoul(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function addDays(date: string, days: number): string {
  const d = fromIso(date)
  d.setUTCDate(d.getUTCDate() + days)
  return toIso(d)
}

export function isValidDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && toIso(fromIso(s)) === s
}

/** '2026-11-17' → '11.17 (화)' */
export function dateLabel(date: string): string {
  const d = fromIso(date)
  return `${d.getUTCMonth() + 1}.${pad(d.getUTCDate())} (${WEEKDAYS[d.getUTCDay()]})`
}

/** '2026-11-17' → '11.17(화)' (공백 없는 짧은 꼴) */
export function shortDateLabel(date: string): string {
  return dateLabel(date).replace(' ', '')
}

/** '2026-11-17' → '2026년 11월' */
export function monthLabel(date: string): string {
  const d = fromIso(date)
  return `${d.getUTCFullYear()}년 ${d.getUTCMonth() + 1}월`
}

/** ISO 주차의 월요일 (UTC 자정) */
function mondayOf(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = jan4.getUTCDay() || 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - (jan4Day - 1) + (week - 1) * 7)
  return monday
}

function isoWeekOf(date: Date): { year: number; week: number } {
  const d = new Date(date)
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day) // 그 주의 목요일
  const year = d.getUTCFullYear()
  const week = Math.ceil(((d.getTime() - Date.UTC(year, 0, 1)) / 86_400_000 + 1) / 7)
  return { year, week }
}

export type WeekInfo = {
  weekId: string
  weekNo: number
  rangeLabel: string // '2026. 10. 26 - 10. 30' (월~금)
  from: string // 월요일
  to: string // 일요일
}

function weekInfo(year: number, week: number): WeekInfo {
  const mon = mondayOf(year, week)
  const from = toIso(mon)
  const fri = fromIso(addDays(from, 4))
  const rangeLabel =
    `${mon.getUTCFullYear()}. ${pad(mon.getUTCMonth() + 1)}. ${pad(mon.getUTCDate())}` +
    ` - ${pad(fri.getUTCMonth() + 1)}. ${pad(fri.getUTCDate())}`
  return { weekId: `${year}-W${pad(week)}`, weekNo: week, rangeLabel, from, to: addDays(from, 6) }
}

/** 'YYYY-MM-DD' 가 속한 ISO 주차 */
export function weekOfDate(date: string): WeekInfo {
  const { year, week } = isoWeekOf(fromIso(date))
  return weekInfo(year, week)
}

/** "2026-W38" → WeekInfo. 형식이 틀리면 null */
export function parseWeekId(weekId: string): WeekInfo | null {
  const m = /^(\d{4})-W(\d{2})$/.exec(weekId.trim())
  if (!m) return null
  const year = Number(m[1])
  const week = Number(m[2])
  if (week < 1 || week > 53) return null
  // 53주가 없는 해 걸러내기
  if (isoWeekOf(mondayOf(year, week)).year !== year) return null
  return weekInfo(year, week)
}
