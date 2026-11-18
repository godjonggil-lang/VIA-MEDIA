import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMonthlyReport, type MonthlyReport } from '@/lib/report'
import { shortDateLabel } from '@/lib/week'
import { MONTHLY_NAME, MONTHLY_NAME_EN } from '@/lib/config'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'
import PostList from '@/components/PostList'
import ReportCover, { ReportNav } from '@/components/ReportCover'
import { toViewPosts } from '@/components/PostsPage'

export const revalidate = 3600

export function generateStaticParams() {
  return []
}

const title = (r: MonthlyReport) => `${MONTHLY_NAME} ${r.month.year}년 ${r.month.month}월 (${MONTHLY_NAME_EN})`
const monthLink = (id: string | null) => (id ? { href: `/monthly/${id}`, label: `${Number(id.slice(5))}월 리포트` } : null)

export async function generateMetadata(props: PageProps<'/monthly/[monthId]'>): Promise<Metadata> {
  const r = await getMonthlyReport((await props.params).monthId)
  if (!r) return {}
  const description = `${r.month.year}년 ${r.month.month}월 · 게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건 — 디펜스투데이가 정리한 한 달의 국방·안보 이슈`
  return { title: { absolute: title(r) }, description, openGraph: { title: title(r), description } }
}

export default async function MonthlyReportPage(props: PageProps<'/monthly/[monthId]'>) {
  const r = await getMonthlyReport((await props.params).monthId)
  if (!r) notFound()

  return (
    <>
      <SiteHeader active="monthly" />
      <main className="mx-auto w-full max-w-5xl px-4 pb-8">
        <ReportCover
          nameEn={MONTHLY_NAME_EN}
          name={MONTHLY_NAME}
          highlight={`${r.month.month}월`}
          period={`${r.month.year}년 · ${shortDateLabel(r.month.from)} – ${shortDateLabel(r.month.to)}`}
          inProgress={r.inProgress}
          stats={r.stats}
        />

        {/* 주차별 보도 */}
        <div className="mb-10 space-y-9 sm:space-y-12">
          {r.weeks.map(({ week, posts }) => (
            <section key={week.weekId} aria-labelledby={`w-${week.weekId}`}>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-2 border-navy pb-2">
                <h2 id={`w-${week.weekId}`} className="text-lg sm:text-xl font-extrabold">
                  <span className="bg-news px-1.5">{week.weekNo}주차</span>
                  <span className="ml-2 text-sm sm:text-base font-semibold text-body-dark tabular-nums">
                    {shortDateLabel(week.from)} – {shortDateLabel(week.to)}
                  </span>
                </h2>
                <Link href={`/report/${week.weekId}`} className="text-sm font-semibold text-point-dark hover:underline underline-offset-4">
                  주간 리포트 →
                </Link>
              </div>
              <PostList posts={toViewPosts(posts)} />
            </section>
          ))}
        </div>

        <ReportNav label="다른 달 리포트" list="/monthly" prev={monthLink(r.prev)} next={monthLink(r.next)} />
      </main>
      <SiteFooter />
    </>
  )
}
