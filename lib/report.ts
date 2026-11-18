import 'server-only'
import { getPostDates, getPostsBetween, getWeekNote, type Post } from './db'
import {
  monthOfDate,
  parseMonthId,
  parseWeekId,
  todaySeoul,
  weekOfDate,
  type MonthInfo,
  type WeekInfo,
} from './week'

type Stats = { posts: number; items: number; news: number; column: number }

type ReportBase = {
  posts: Post[] // 날짜 오름차순. 같은 날짜 안의 순서는 메인과 같게 유지
  stats: Stats
  coverImage: string | null // 공유 미리보기 사진: 가장 최근 게시물의 첫 사진
  inProgress: boolean // 아직 기간이 끝나지 않음
  prev: string | null // 이전 리포트 id
  next: string | null
}

export type WeeklyReport = ReportBase & { week: WeekInfo; note: string | null }
export type MonthlyReport = ReportBase & { month: MonthInfo; weeks: { week: WeekInfo; posts: Post[] }[] }

export type ReportSummary = { id: string; from: string; to: string; posts: number; items: number; inProgress: boolean }
export type WeeklySummary = ReportSummary & { week: WeekInfo }
export type MonthlySummary = ReportSummary & { month: MonthInfo }

/** 게시물 날짜를 기간별로 묶어 최신 기간 먼저 */
async function summarize<T extends { id: string; from: string; to: string }>(
  periodOf: (date: string) => T,
): Promise<(ReportSummary & { period: T })[]> {
  const today = todaySeoul()
  const map = new Map<string, ReportSummary & { period: T }>()
  for (const p of await getPostDates()) {
    const period = periodOf(p.post_date)
    const s = map.get(period.id) ?? { id: period.id, from: period.from, to: period.to, posts: 0, items: 0, inProgress: today <= period.to, period }
    s.posts += 1
    s.items += p.items
    map.set(period.id, s)
  }
  return [...map.values()].sort((a, b) => (a.id < b.id ? 1 : -1))
}

export async function listWeeklyReports(): Promise<WeeklySummary[]> {
  const rows = await summarize((d) => {
    const week = weekOfDate(d)
    return { id: week.weekId, from: week.from, to: week.to, week }
  })
  return rows.map(({ period, ...r }) => ({ ...r, week: period.week }))
}

export async function listMonthlyReports(): Promise<MonthlySummary[]> {
  const rows = await summarize((d) => {
    const month = monthOfDate(d)
    return { id: month.monthId, from: month.from, to: month.to, month }
  })
  return rows.map(({ period, ...r }) => ({ ...r, month: period.month }))
}

async function buildBase(from: string, to: string, id: string, all: ReportSummary[]): Promise<ReportBase | null> {
  const postsDesc = await getPostsBetween(from, to)
  if (postsDesc.length === 0) return null
  const items = postsDesc.flatMap((p) => p.items)
  const idx = all.findIndex((r) => r.id === id)
  return {
    posts: [...postsDesc].sort((x, y) => (x.post_date < y.post_date ? -1 : x.post_date > y.post_date ? 1 : 0)),
    stats: {
      posts: postsDesc.length,
      items: items.length,
      news: items.filter((i) => i.category === 'news').length,
      column: items.filter((i) => i.category === 'column').length,
    },
    coverImage: items.find((i) => i.image_url)?.image_url ?? null,
    inProgress: todaySeoul() <= to,
    prev: idx >= 0 ? (all[idx + 1]?.id ?? null) : null,
    next: idx > 0 ? all[idx - 1].id : null,
  }
}

export async function getWeeklyReport(weekIdParam: string): Promise<WeeklyReport | null> {
  const week = parseWeekId(decodeURIComponent(weekIdParam))
  if (!week) return null
  const [all, note] = await Promise.all([listWeeklyReports(), getWeekNote(week.weekId)])
  const base = await buildBase(week.from, week.to, week.weekId, all)
  return base ? { ...base, week, note } : null
}

export async function getMonthlyReport(monthIdParam: string): Promise<MonthlyReport | null> {
  const month = parseMonthId(decodeURIComponent(monthIdParam))
  if (!month) return null
  const base = await buildBase(month.from, month.to, month.monthId, await listMonthlyReports())
  if (!base) return null
  // 주차별로 묶기 (월 경계에 걸친 주는 그 달에 속한 날짜만)
  const weeks = new Map<string, { week: WeekInfo; posts: Post[] }>()
  for (const p of base.posts) {
    const week = weekOfDate(p.post_date)
    const g = weeks.get(week.weekId) ?? { week, posts: [] }
    g.posts.push(p)
    weeks.set(week.weekId, g)
  }
  return { ...base, month, weeks: [...weeks.values()] }
}
