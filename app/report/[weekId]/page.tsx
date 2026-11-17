import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWeeklyReport, type WeeklyReport } from '@/lib/report'
import { shortDateLabel } from '@/lib/week'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'
import PostList from '@/components/PostList'
import { toViewPosts } from '@/components/PostsPage'

export const revalidate = 3600

// 빌드 때는 만들지 않고, 첫 방문 시 생성 후 캐시 (발행 시 즉시 갱신)
export function generateStaticParams() {
  return []
}

const title = (r: WeeklyReport) => `${REPORT_NAME} ${r.week.weekNo}주차 (${REPORT_NAME_EN})`
const period = (r: WeeklyReport) => `${shortDateLabel(r.week.from)} – ${shortDateLabel(r.week.to)}`

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
        {/* 표지 */}
        <section className="-mx-4 mb-6 bg-navy px-4 pb-6 pt-5 text-white sm:mx-0 sm:mt-6 sm:rounded-xl sm:px-8 sm:py-8">
          <p className="text-xs font-bold tracking-[0.18em] text-news uppercase">{REPORT_NAME_EN}</p>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-extrabold leading-tight">
            {REPORT_NAME} <span className="whitespace-nowrap text-news">{r.week.weekNo}주차</span>
          </h1>
          <p className="mt-1 text-sm sm:text-base text-white/80 tabular-nums">
            {r.week.weekId.slice(0, 4)}년 · {period(r)}
            {r.inProgress ? (
              <span className="ml-2 rounded bg-news px-1.5 py-0.5 text-xs font-semibold text-navy">작성 중</span>
            ) : (
              <span className="ml-2 rounded bg-white/15 px-1.5 py-0.5 text-xs font-semibold">발행 완료</span>
            )}
          </p>
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <Stat label="게시물" value={`${r.stats.posts}개`} />
            <Stat label="기사" value={`${r.stats.items}건`} />
            <Stat label="뉴스" value={`${r.stats.news}`} />
            <Stat label="칼럼" value={`${r.stats.column}`} />
          </dl>
          {r.note && (
            <blockquote className="mt-4 border-l-2 border-news pl-3 text-[15px] leading-relaxed text-white/90 whitespace-pre-line">
              {r.note}
            </blockquote>
          )}
        </section>

        {/* 일자별 보도 */}
        <section aria-labelledby="daily" className="mb-10">
          <h2 id="daily" className="mb-3 text-lg sm:text-xl font-extrabold">
            <span className="bg-news px-1.5">일자별 보도</span>
          </h2>
          <PostList posts={toViewPosts(r.posts)} />
        </section>

        {/* 이전·다음 주 */}
        <nav aria-label="다른 주 리포트" className="flex items-center justify-between gap-3 border-t border-navy/10 pt-5 text-sm">
          {r.prev ? (
            <Link href={`/report/${r.prev}`} className="font-semibold text-point-dark hover:underline underline-offset-4">
              ← {Number(r.prev.slice(-2))}주차 리포트
            </Link>
          ) : (
            <span />
          )}
          <Link href="/report" className="text-body-dark hover:underline underline-offset-4">전체 목록</Link>
          {r.next ? (
            <Link href={`/report/${r.next}`} className="font-semibold text-point-dark hover:underline underline-offset-4">
              {Number(r.next.slice(-2))}주차 리포트 →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <SiteFooter />
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="text-white/65">{label}</dt>
      <dd className="font-bold tabular-nums">{value}</dd>
    </div>
  )
}
