import Link from 'next/link'
import type { MonthlyReport, MonthlySummary, WeeklyReport, WeeklySummary } from '@/lib/report'
import { shortDateLabel } from '@/lib/week'
import { MONTHLY_NAME, MONTHLY_NAME_EN, REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'
import SiteHeader, { SiteFooter } from './SiteHeader'
import PostList from './PostList'
import ReportCover, { ReportNav, SectionTitle } from './ReportCover'
import ReportPicker from './ReportPicker'
import CopyLinkButton from './CopyLinkButton'
import { toViewPosts } from './PostsPage'

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const range = (from: string, to: string) => `${shortDateLabel(from)} – ${shortDateLabel(to)}`

export const weeklyTitle = (r: WeeklyReport) => `${REPORT_NAME} ${r.week.weekNo}주차 (${REPORT_NAME_EN})`
export const weeklyDescription = (r: WeeklyReport) =>
  `${range(r.week.from, r.week.to)} · 게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건 — 디펜스투데이가 정리한 한 주의 국방·안보 이슈`
export const monthlyTitle = (r: MonthlyReport) => `${MONTHLY_NAME} ${r.month.year}년 ${r.month.month}월 (${MONTHLY_NAME_EN})`
export const monthlyDescription = (r: MonthlyReport) =>
  `${r.month.year}년 ${r.month.month}월 · 게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건 — 디펜스투데이가 정리한 한 달의 국방·안보 이슈`

export function WeeklyReportView({ r, all }: { r: WeeklyReport; all: WeeklySummary[] }) {
  const link = (id: string | null) => (id ? { href: `/report/${id}`, label: `${Number(id.slice(-2))}주차 Week ${Number(id.slice(-2))}` } : null)
  return (
    <>
      <SiteHeader active="report" />
      <main className="mx-auto w-full max-w-5xl px-4 pb-8">
        <ReportCover
          nameEn={REPORT_NAME_EN}
          name={REPORT_NAME}
          highlight={`${r.week.weekNo}주차`}
          highlightEn={`Week ${r.week.weekNo}`}
          period={`${r.week.weekId.slice(0, 4)}년 · ${range(r.week.from, r.week.to)}`}
          inProgress={r.inProgress}
          stats={r.stats}
          note={r.note}
          actions={
            <>
              <ReportPicker
                currentId={r.week.weekId}
                items={all.map((w) => ({
                  id: w.id,
                  href: `/report/${w.id}`,
                  label: `${w.id.slice(0, 4)}년 ${w.week.weekNo}주차 · Week ${w.week.weekNo}`,
                  sub: `${range(w.from, w.to)} · 게시물 ${w.posts} · 기사 ${w.items}`,
                  inProgress: w.inProgress,
                }))}
              />
              <CopyLinkButton path={`/report/${r.week.weekId}`} />
            </>
          }
        />
        <section aria-labelledby="daily" className="mb-10">
          <SectionTitle id="daily" ko="일자별 보도" en="Daily coverage" />
          <PostList posts={toViewPosts(r.posts)} />
        </section>
        <ReportNav label="다른 주 리포트" prev={link(r.prev)} next={link(r.next)} />
      </main>
      <SiteFooter />
    </>
  )
}

export function MonthlyReportView({ r, all }: { r: MonthlyReport; all: MonthlySummary[] }) {
  const link = (id: string | null) => {
    if (!id) return null
    const m = Number(id.slice(5))
    return { href: `/monthly/${id}`, label: `${m}월 ${MONTHS_EN[m - 1]}` }
  }
  return (
    <>
      <SiteHeader active="monthly" />
      <main className="mx-auto w-full max-w-5xl px-4 pb-8">
        <ReportCover
          nameEn={MONTHLY_NAME_EN}
          name={MONTHLY_NAME}
          highlight={`${r.month.month}월`}
          highlightEn={`${MONTHS_EN[r.month.month - 1]} ${r.month.year}`}
          period={`${r.month.year}년 · ${range(r.month.from, r.month.to)}`}
          inProgress={r.inProgress}
          stats={r.stats}
          actions={
            <>
              <ReportPicker
                currentId={r.month.monthId}
                items={all.map((m) => ({
                  id: m.id,
                  href: `/monthly/${m.id}`,
                  label: `${m.month.year}년 ${m.month.month}월 · ${MONTHS_EN[m.month.month - 1]}`,
                  sub: `게시물 ${m.posts} · 기사 ${m.items}`,
                  inProgress: m.inProgress,
                }))}
              />
              <CopyLinkButton path={`/monthly/${r.month.monthId}`} />
            </>
          }
        />
        <div className="mb-10 space-y-9 sm:space-y-12">
          {r.weeks.map(({ week, posts }) => (
            <section key={week.weekId} aria-labelledby={`w-${week.weekId}`}>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-2 border-navy pb-2">
                <h2 id={`w-${week.weekId}`} className="text-lg sm:text-xl font-extrabold">
                  <span className="bg-news px-1.5">
                    {week.weekNo}주차 <span className="text-[0.78em] font-medium opacity-70">Week {week.weekNo}</span>
                  </span>
                  <span className="ml-2 text-sm sm:text-base font-semibold text-body-dark tabular-nums">{range(week.from, week.to)}</span>
                </h2>
                <Link href={`/report/${week.weekId}`} className="text-sm font-semibold text-point-dark hover:underline underline-offset-4">
                  주간 리포트 Weekly →
                </Link>
              </div>
              <PostList posts={toViewPosts(posts)} />
            </section>
          ))}
        </div>
        <ReportNav label="다른 달 리포트" prev={link(r.prev)} next={link(r.next)} />
      </main>
      <SiteFooter />
    </>
  )
}
