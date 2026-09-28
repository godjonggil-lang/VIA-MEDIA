// ISO 주차 계산 (한국 시간 기준)

const pad = (n: number) => String(n).padStart(2, '0')

/** 한국 시간 기준 오늘 날짜를 UTC 자정 Date 로 */
function todayInSeoul(now = new Date()): Date {
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .split('-')
    .map(Number)
  return new Date(Date.UTC(y, m - 1, d))
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

export type WeekInfo = { weekId: string; weekNo: number; rangeLabel: string }

export function weekInfo(year: number, week: number): WeekInfo {
  const mon = mondayOf(year, week)
  const fri = new Date(mon)
  fri.setUTCDate(mon.getUTCDate() + 4)
  const rangeLabel =
    `${mon.getUTCFullYear()}. ${pad(mon.getUTCMonth() + 1)}. ${pad(mon.getUTCDate())}` +
    ` - ${pad(fri.getUTCMonth() + 1)}. ${pad(fri.getUTCDate())}`
  return { weekId: `${year}-W${pad(week)}`, weekNo: week, rangeLabel }
}

export function currentWeekInfo(now = new Date()): WeekInfo {
  const { year, week } = isoWeekOf(todayInSeoul(now))
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
