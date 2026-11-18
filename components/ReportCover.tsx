import Link from 'next/link'

type Props = {
  nameEn: string // 'DEFENSE TODAY Weekly Report'
  name: string // '디펜스투데이 주간 리포트'
  highlight: string // '46주차' / '11월'
  period: string // '2026년 · 11.09(월) – 11.15(일)'
  inProgress: boolean
  stats: { posts: number; items: number; news: number; column: number }
  note?: string | null
}

// 주간·월간 리포트 공용 표지
export default function ReportCover({ nameEn, name, highlight, period, inProgress, stats, note }: Props) {
  return (
    <section className="-mx-4 mb-6 bg-navy px-4 pb-6 pt-5 text-white sm:mx-0 sm:mt-6 sm:rounded-xl sm:px-8 sm:py-8">
      <p className="text-xs font-bold tracking-[0.18em] text-news uppercase">{nameEn}</p>
      <h1 className="mt-1.5 text-2xl sm:text-3xl font-extrabold leading-tight">
        {name} <span className="whitespace-nowrap text-news">{highlight}</span>
      </h1>
      <p className="mt-1 text-sm sm:text-base text-white/80 tabular-nums">
        {period}
        {inProgress ? (
          <span className="ml-2 rounded bg-news px-1.5 py-0.5 text-xs font-semibold text-navy">작성 중</span>
        ) : (
          <span className="ml-2 rounded bg-white/15 px-1.5 py-0.5 text-xs font-semibold">발행 완료</span>
        )}
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <Stat label="게시물" value={`${stats.posts}개`} />
        <Stat label="기사" value={`${stats.items}건`} />
        <Stat label="뉴스" value={`${stats.news}`} />
        <Stat label="칼럼" value={`${stats.column}`} />
      </dl>
      {note && (
        <blockquote className="mt-4 border-l-2 border-news pl-3 text-[15px] leading-relaxed text-white/90 whitespace-pre-line">
          {note}
        </blockquote>
      )}
    </section>
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

type NavLink = { href: string; label: string } | null

// 이전·다음 리포트 + 전체 목록
export function ReportNav({ prev, next, list, label }: { prev: NavLink; next: NavLink; list: string; label: string }) {
  const cls = 'font-semibold text-point-dark hover:underline underline-offset-4'
  return (
    <nav aria-label={label} className="flex items-center justify-between gap-3 border-t border-navy/10 pt-5 text-sm">
      {prev ? <Link href={prev.href} className={cls}>← {prev.label}</Link> : <span />}
      <Link href={list} className="text-body-dark hover:underline underline-offset-4">전체 목록</Link>
      {next ? <Link href={next.href} className={cls}>{next.label} →</Link> : <span />}
    </nav>
  )
}
