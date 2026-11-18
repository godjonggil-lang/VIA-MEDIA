import type { Metadata } from 'next'
import { getWeeklyReport, listWeeklyReports } from '@/lib/report'
import { WeeklyReportView, weeklyDescription, weeklyTitle } from '@/components/ReportViews'
import PostsPage from '@/components/PostsPage'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'

// '주간 리포트' 탭: 가장 최근 주 리포트를 바로 보여준다 (고정 주소는 /report/2026-W47)
export const revalidate = 600

async function latest() {
  const all = await listWeeklyReports()
  const r = all[0] ? await getWeeklyReport(all[0].id) : null
  return { all, r }
}

export async function generateMetadata(): Promise<Metadata> {
  const { r } = await latest()
  if (!r) return { title: { absolute: `${REPORT_NAME} (${REPORT_NAME_EN})` } }
  return {
    title: { absolute: weeklyTitle(r) },
    description: weeklyDescription(r),
    alternates: { canonical: `/report/${r.week.weekId}` },
    openGraph: { title: weeklyTitle(r), description: weeklyDescription(r) },
  }
}

export default async function LatestWeeklyReport() {
  const { all, r } = await latest()
  if (!r) return <PostsPage posts={[]} active="report" emptyText="아직 발행된 리포트가 없습니다" />
  return <WeeklyReportView r={r} all={all} />
}
