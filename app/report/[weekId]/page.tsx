import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWeeklyReport, listWeeklyReports } from '@/lib/report'
import { WeeklyReportView, weeklyDescription, weeklyTitle } from '@/components/ReportViews'

export const revalidate = 3600

// 빌드 때는 만들지 않고, 첫 방문 시 생성 후 캐시 (발행 시 즉시 갱신)
export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: PageProps<'/report/[weekId]'>): Promise<Metadata> {
  const r = await getWeeklyReport((await props.params).weekId)
  if (!r) return {}
  // og:image 는 같은 폴더의 opengraph-image.tsx 가 자동으로 붙인다
  return {
    title: { absolute: weeklyTitle(r) },
    description: weeklyDescription(r),
    openGraph: { title: weeklyTitle(r), description: weeklyDescription(r) },
  }
}

export default async function WeeklyReportPage(props: PageProps<'/report/[weekId]'>) {
  const [r, all] = await Promise.all([getWeeklyReport((await props.params).weekId), listWeeklyReports()])
  if (!r) notFound()
  return <WeeklyReportView r={r} all={all} />
}
