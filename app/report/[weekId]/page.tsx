import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWeeklyReport, type WeeklyReport } from '@/lib/report'
import { shortDateLabel } from '@/lib/week'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'
import PostList from '@/components/PostList'
import ReportCover, { ReportNav } from '@/components/ReportCover'
import { toViewPosts } from '@/components/PostsPage'

export const revalidate = 3600

// 빌드 때는 만들지 않고, 첫 방문 시 생성 후 캐시 (발행 시 즉시 갱신)
export function generateStaticParams() {
  return []
}

const title = (r: WeeklyReport) => `${REPORT_NAME} ${r.week.weekNo}주차 (${REPORT_NAME_EN})`
const period = (r: WeeklyReport) => `${shortDateLabel(r.week.from)} – ${shortDateLabel(r.week.to)}`
const weekLink = (id: string | null) => (id ? { href: `/report/${id}`, label: `${Number(id.slice(-2))}주차 리포트` } : null)

export async function generateMetadata(props: PageProps<'/report/[weekId]'>): Promise<Metadata> {
  const r = await getWeeklyReport((await props.params).weekId)
  if (!r) return {}
  const description = `${period(r)} · 게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건 — 디펜스투데이가 정리한 한 주의 국방·안보 이슈`
  // og:image 는 같은 폴더의 opengraph-image.tsx 가 자동으로 붙인다
  return { title: { absolute: title(r) }, description, openGraph: { title: title(r), description } }
}

export default async function WeeklyReportPage(props: PageProps<'/report/[weekId]'>) {
  const r = await getWeeklyReport((await props.params).weekId)
  if (!r) notFound()

  return (
    <>
      <SiteHeader active="report" />
      <main className="mx-auto w-full max-w-5xl px-4 pb-8">
        <ReportCover
          nameEn={REPORT_NAME_EN}
          name={REPORT_NAME}
          highlight={`${r.week.weekNo}주차`}
          period={`${r.week.weekId.slice(0, 4)}년 · ${period(r)}`}
          inProgress={r.inProgress}
          stats={r.stats}
          note={r.note}
        />

        <section aria-labelledby="daily" className="mb-10">
          <h2 id="daily" className="mb-3 text-lg sm:text-xl font-extrabold">
            <span className="bg-news px-1.5">일자별 보도</span>
          </h2>
          <PostList posts={toViewPosts(r.posts)} />
        </section>

        <ReportNav label="다른 주 리포트" list="/report" prev={weekLink(r.prev)} next={weekLink(r.next)} />
      </main>
      <SiteFooter />
    </>
  )
}
