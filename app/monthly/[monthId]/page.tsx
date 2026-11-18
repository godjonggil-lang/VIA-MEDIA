import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMonthlyReport, listMonthlyReports } from '@/lib/report'
import { MonthlyReportView, monthlyDescription, monthlyTitle } from '@/components/ReportViews'

export const revalidate = 3600

export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: PageProps<'/monthly/[monthId]'>): Promise<Metadata> {
  const r = await getMonthlyReport((await props.params).monthId)
  if (!r) return {}
  return {
    title: { absolute: monthlyTitle(r) },
    description: monthlyDescription(r),
    openGraph: { title: monthlyTitle(r), description: monthlyDescription(r) },
  }
}

export default async function MonthlyReportPage(props: PageProps<'/monthly/[monthId]'>) {
  const [r, all] = await Promise.all([getMonthlyReport((await props.params).monthId), listMonthlyReports()])
  if (!r) notFound()
  return <MonthlyReportView r={r} all={all} />
}
