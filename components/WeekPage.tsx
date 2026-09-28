import type { Metadata } from 'next'
import Link from 'next/link'
import type { Week } from '@/lib/db'
import { proxiedImage } from '@/lib/db'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/config'
import SiteHeader, { SiteFooter, weekSubtitle } from './SiteHeader'
import WeekView from './WeekView'

export function weekMetadata(week: Week | null, title?: string): Metadata {
  const first = week?.items.find((i) => i.image_url)
  const image = first ? proxiedImage(first.image_url) : null
  const description = week
    ? `${weekSubtitle(week.range_label, week.week_no)} — ${SITE_DESCRIPTION}`
    : SITE_DESCRIPTION
  return {
    ...(title ? { title } : {}),
    description,
    openGraph: {
      title: title ? `${title} · ${SITE_NAME}` : SITE_NAME,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  }
}

export default function WeekPage({ week, isMain }: { week: Week | null; isMain?: boolean }) {
  return (
    <>
      <SiteHeader
        subtitle={week ? weekSubtitle(week.range_label, week.week_no) : undefined}
        nav={{ href: '/archive', label: '이전 카드뉴스' }}
      />
      <main className="mx-auto w-full max-w-5xl px-4 py-3 sm:py-8">
        {week && week.items.length > 0 ? (
          <WeekView
            items={week.items.map((i) => ({
              section: i.section,
              title: i.title,
              url: i.url,
              image: proxiedImage(i.image_url),
            }))}
          />
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg font-bold">
              {isMain ? '이번 주 카드뉴스를 준비 중입니다' : '이 주차의 카드뉴스가 없습니다'}
            </p>
            <Link
              href="/archive"
              className="mt-4 inline-block rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              이전 카드뉴스 보기
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
