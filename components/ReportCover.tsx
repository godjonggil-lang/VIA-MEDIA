import Link from 'next/link'
import Bi from './Bi'

type Props = {
  nameEn: string // 'DEFENSE TODAY Weekly Report'
  name: string // '디펜스투데이 주간 리포트'
  highlight: string // '47주차' / '11월'
  highlightEn: string // 'Week 47' / 'November'
  period: string // '2026년 · 11.16(월) – 11.22(일)'
  inProgress: boolean
  stats: { posts: number; items: number; news: number; column: number }
  note?: string | null
  actions?: React.ReactNode // 지난 리포트 보기 · URL 복사
}

// 주간·월간 리포트 공용 표지
export default function ReportCover({ nameEn, name, highlight, highlightEn, period, inProgress, stats, note, actions }: Props) {
  return (
    <section className="-mx-4 mb-6 bg-navy px-4 pb-5 pt-5 text-white sm:mx-0 sm:mt-6 sm:rounded-xl sm:px-8 sm:py-8">
      <p className="text-xs font-bold tracking-[0.18em] text-news uppercase">{nameEn}</p>
      <h1 className="mt-1.5 text-2xl sm:text-3xl font-extrabold leading-tight">
        {name} <span className="whitespace-nowrap text-news">{highlight}</span>
        <span className="ml-2 whitespace-nowrap text-sm sm:text-base font-semibold text-white/70">{highlightEn}</span>
      </h1>
      <p className="mt-1 text-sm sm:text-base text-white/80 tabular-nums">
        {period}
        {inProgress ? (
          <span className="ml-2 rounded bg-news px-1.5 py-0.5 text-xs font-semibold text-navy">작성 중 In progress</span>
        ) : (
          <span className="ml-2 rounded bg-white/15 px-1.5 py-0.5 text-xs font-semibold">발행 완료 Published</span>
        )}
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <Stat ko="게시물" en="Posts" value={stats.posts} />
        <Stat ko="기사" en="Articles" value={stats.items} />
        <Stat ko="뉴스" en="News" value={stats.news} />
        <Stat ko="칼럼" en="Columns" value={stats.column} />
      </dl>
      {note && (
        <blockquote className="mt-4 border-l-2 border-news pl-3 text-[15px] leading-relaxed text-white/90 whitespace-pre-line">
          {note}
        </blockquote>
      )}
      {actions && <div className="mt-5 flex flex-wrap items-start gap-2">{actions}</div>}
    </section>
  )
}

function Stat({ ko, en, value }: { ko: string; en: string; value: number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="text-white/65">
        {ko} <span className="text-[0.85em]">{en}</span>
      </dt>
      <dd className="font-bold tabular-nums">{value}</dd>
    </div>
  )
}

type NavLink = { href: string; label: string } | null

// 이전·다음 리포트
export function ReportNav({ prev, next, label }: { prev: NavLink; next: NavLink; label: string }) {
  const cls = 'font-semibold text-point-dark hover:underline underline-offset-4'
  return (
    <nav aria-label={label} className="flex items-center justify-between gap-3 border-t border-navy/10 pt-5 text-sm">
      {prev ? <Link href={prev.href} className={cls}>← {prev.label}</Link> : <span />}
      {next ? <Link href={next.href} className={cls}>{next.label} →</Link> : <span />}
    </nav>
  )
}

export function SectionTitle({ ko, en, id, accent = 'bg-news' }: { ko: string; en: string; id: string; accent?: string }) {
  return (
    <h2 id={id} className="mb-3 text-lg sm:text-xl font-extrabold">
      <span className={`${accent} px-1.5`}>
        <Bi ko={ko} en={en} />
      </span>
    </h2>
  )
}
