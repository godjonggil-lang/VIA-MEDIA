import type { Metadata } from 'next'
import Link from 'next/link'
import { listMonthlyReports } from '@/lib/report'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'
import { MONTHLY_NAME, MONTHLY_NAME_EN } from '@/lib/config'

export const revalidate = 600

export const metadata: Metadata = {
  title: { absolute: `${MONTHLY_NAME} (${MONTHLY_NAME_EN})` },
  description: `${MONTHLY_NAME} — 한 달의 국방·안보 카드뉴스를 한 페이지에`,
}

export default async function MonthlyList() {
  const reports = await listMonthlyReports()
  return (
    <>
      <SiteHeader subtitle={`${MONTHLY_NAME} · ${MONTHLY_NAME_EN}`} active="monthly" />
      <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:py-8">
        {reports.length === 0 ? (
          <p className="py-16 text-center text-body-dark">아직 발행된 리포트가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-navy/10 rounded-lg border border-navy/10 bg-white">
            {reports.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/monthly/${r.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-navy/[0.03] focus-visible:outline-3 focus-visible:outline-point"
                >
                  <span>
                    <span className="block font-bold">
                      {r.month.year}년 {r.month.month}월
                      {r.inProgress && (
                        <span className="ml-2 rounded bg-news px-1.5 py-0.5 align-middle text-xs font-semibold">작성 중</span>
                      )}
                    </span>
                    <span className="block text-sm text-body-dark">
                      게시물 {r.posts}개 · 기사 {r.items}건
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
