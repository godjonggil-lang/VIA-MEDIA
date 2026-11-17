import type { Metadata } from 'next'
import Link from 'next/link'
import { listWeeklyReports } from '@/lib/report'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'
import { shortDateLabel } from '@/lib/week'

export const revalidate = 600

export const metadata: Metadata = {
  title: { absolute: `${REPORT_NAME} (${REPORT_NAME_EN})` },
  description: `${REPORT_NAME} — 한 주의 국방·안보 카드뉴스를 한 페이지에`,
}

export default async function ReportList() {
  const reports = await listWeeklyReports()
  return (
    <>
      <SiteHeader subtitle={`${REPORT_NAME} · ${REPORT_NAME_EN}`} active="report" />
      <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:py-8">
        {reports.length === 0 ? (
          <p className="py-16 text-center text-body-dark">아직 발행된 리포트가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-navy/10 rounded-lg border border-navy/10 bg-white">
            {reports.map((r) => (
              <li key={r.week.weekId}>
                <Link
                  href={`/report/${r.week.weekId}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-navy/[0.03] focus-visible:outline-3 focus-visible:outline-point"
                >
                  <span>
                    <span className="block font-bold">
                      {r.week.weekId.slice(0, 4)}년 {r.week.weekNo}주차
                      {r.inProgress && (
                        <span className="ml-2 rounded bg-news px-1.5 py-0.5 align-middle text-xs font-semibold">작성 중</span>
                      )}
                    </span>
                    <span className="block text-sm text-body-dark">
                      {shortDateLabel(r.week.from)} – {shortDateLabel(r.week.to)} · 게시물 {r.posts}개 · 기사 {r.items}건
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-point-dark">보기 →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
