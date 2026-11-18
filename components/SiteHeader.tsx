import Link from 'next/link'
import { SITE_NAME } from '@/lib/config'

export type Tab = 'home' | 'report' | 'monthly'

const TABS: { key: Tab; href: string; label: string }[] = [
  { key: 'home', href: '/', label: '최신' },
  { key: 'report', href: '/report', label: '주간 리포트' },
  { key: 'monthly', href: '/monthly', label: '월간 리포트' },
]

type Props = {
  subtitle?: string
  active?: Tab // 없으면 탭 줄을 숨긴다 (관리자 미리보기 등)
}

export default function SiteHeader({ subtitle, active }: Props) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto max-w-5xl px-4 pt-2.5 sm:pt-5">
        <Link href="/" className="text-[15px] sm:text-lg font-bold tracking-tight">
          {SITE_NAME}
        </Link>
        {subtitle && <p className="mt-0.5 text-[13px] sm:text-sm text-news">{subtitle}</p>}
        {active ? (
          <nav aria-label="사이트 메뉴" className="mt-2 sm:mt-3 -mb-px flex gap-4 sm:gap-6 text-[13px] sm:text-sm">
            {TABS.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                aria-current={t.key === active ? 'page' : undefined}
                className={`border-b-2 pb-2 transition-colors ${
                  t.key === active
                    ? 'border-news font-bold text-white'
                    : 'border-transparent text-white/65 hover:text-white'
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="pb-2.5 sm:pb-5" />
        )}
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-white/70">
      <div className="mx-auto max-w-5xl px-4 py-4 text-xs flex flex-wrap justify-between gap-2">
        <span>© 디펜스투데이</span>
        <a href="https://www.defensetoday.kr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
          defensetoday.kr
        </a>
      </div>
    </footer>
  )
}

export function weekSubtitle(rangeLabel: string, weekNo: number) {
  return `${rangeLabel} · ${weekNo}주차`
}
