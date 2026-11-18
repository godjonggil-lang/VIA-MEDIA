import type { Metadata } from 'next'
import { getMonthlyReport, listMonthlyReports } from '@/lib/report'
import { MonthlyReportView, monthlyDescription, monthlyTitle } from '@/components/ReportViews'
import PostsPage from '@/components/PostsPage'
import { MONTHLY_NAME, MONTHLY_NAME_EN } from '@/lib/config'

// '월간 리포트' 탭: 가장 최근 달 리포트를 바로 보여준다 (고정 주소는 /monthly/2026-11)
export const revalidate = 600

async function latest() {
  const all = await listMonthlyReports()
  const r = all[0] ? await getMonthlyReport(all[0].id) : null
  return { all, r }
}

export async function generateMetadata(): Promise<Metadata> {
  const { r } = await latest()
  if (!r) return { title: { absolute: `${MONTHLY_NAME} (${MONTHLY_NAME_EN})` } }
  return {
    title: { absolute: monthlyTitle(r) },
    description: monthlyDescription(r),
    alternates: { canonical: `/monthly/${r.month.monthId}` },
    openGraph: { title: monthlyTitle(r), description: monthlyDescription(r) },
  }
}

export default async function LatestMonthlyReport() {
  const { all, r } = await latest()
  if (!r) return <PostsPage posts={[]} active="monthly" emptyText="아직 발행된 리포트가 없습니다" />
  return <MonthlyReportView r={r} all={all} />
}
