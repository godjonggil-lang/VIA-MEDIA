import 'server-only'
import { getPostDates, getPostsBetween, getWeekNote, type Post } from './db'
import { parseWeekId, todaySeoul, weekOfDate, type WeekInfo } from './week'

export type ReportSummary = { week: WeekInfo; posts: number; items: number; inProgress: boolean }

export type WeeklyReport = {
  week: WeekInfo
  posts: Post[] // 날짜 오름차순 (월 → 일)
  stats: { posts: number; items: number; news: number; column: number }
  coverImage: string | null // 공유 미리보기 사진: 가장 최근 게시물의 첫 사진
  note: string | null
  inProgress: boolean // 아직 그 주 일요일이 지나지 않음
  prev: string | null // 이전 리포트 weekId
  next: string | null
}

/** 게시물이 있는 주 목록 (최신 주 먼저) */
export async function listWeeklyReports(): Promise<ReportSummary[]> {
  const today = todaySeoul()
  const byWeek = new Map<string, ReportSummary>()
  for (const p of await getPostDates()) {
    const week = weekOfDate(p.post_date)
    const s = byWeek.get(week.weekId) ?? { week, posts: 0, items: 0, inProgress: today <= week.to }
    s.posts += 1
    s.items += p.items
    byWeek.set(week.weekId, s)
  }
  return [...byWeek.values()].sort((a, b) => (a.week.weekId < b.week.weekId ? 1 : -1))
}

export async function getWeeklyReport(weekIdParam: string): Promise<WeeklyReport | null> {
  const week = parseWeekId(decodeURIComponent(weekIdParam))
  if (!week) return null
  const [postsDesc, note, all] = await Promise.all([
    getPostsBetween(week.from, week.to),
    getWeekNote(week.weekId),
    listWeeklyReports(),
  ])
  if (postsDesc.length === 0) return null

  const items = postsDesc.flatMap((p) => p.items)
  const idx = all.findIndex((r) => r.week.weekId === week.weekId)
  return {
    week,
    // 날짜만 오름차순(월 → 일)으로. 같은 날짜 안의 순서는 메인과 같게 유지
    posts: [...postsDesc].sort((x, y) => (x.post_date < y.post_date ? -1 : x.post_date > y.post_date ? 1 : 0)),
    stats: {
      posts: postsDesc.length,
      items: items.length,
      news: items.filter((i) => i.category === 'news').length,
      column: items.filter((i) => i.category === 'column').length,
    },
    coverImage: items.find((i) => i.image_url)?.image_url ?? null,
    note,
    inProgress: todaySeoul() <= week.to,
    prev: idx >= 0 ? (all[idx + 1]?.week.weekId ?? null) : null,
    next: idx > 0 ? all[idx - 1].week.weekId : null,
  }
}
