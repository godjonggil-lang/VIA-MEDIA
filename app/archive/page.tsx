import type { Metadata } from 'next'
import Link from 'next/link'
import { listWeeks } from '@/lib/db'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'

export const revalidate = 600

export const metadata: Metadata = {
  title: '이전 카드뉴스',
  description: '지난 주차 디펜스투데이 카드뉴스 원문 모음',
}

export default async function Archive() {
  const weeks = await listWeeks()
  return (
    <>
      <SiteHeader subtitle="이전 카드뉴스" nav={{ href: '/', label: '이번 주 카드뉴스' }} />
      <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:py-8">
        {weeks.length === 0 ? (
          <p className="py-16 text-center text-body-dark">아직 발행된 카드뉴스가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-navy/10 rounded-lg border border-navy/10 bg-white">
            {weeks.map((w) => (
              <li key={w.id}>
                <Link
                  href={w.is_current ? '/' : `/week/${w.week_id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-navy/[0.03] focus-visible:outline-3 focus-visible:outline-point"
                >
                  <span>
                    <span className="block font-semibold">{w.week_no}주차</span>
                    <span className="block text-sm text-body-dark">{w.range_label}</span>
                  </span>
                  <span className="shrink-0 text-sm text-point-dark">
                    {w.is_current ? (
                      <span className="rounded bg-news px-1.5 py-0.5 font-semibold text-navy">이번 주</span>
                    ) : (
                      '보기 →'
                    )}
                  </span>
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

