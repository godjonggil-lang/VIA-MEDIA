import Link from 'next/link'
import { SITE_NAME } from '@/lib/config'

type Props = {
  subtitle?: string // 예: "2026. 09. 14 - 09. 18 · 38주차"
  nav?: { href: string; label: string }
}

export default function SiteHeader({ subtitle, nav }: Props) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto max-w-5xl px-4 py-2.5 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-[15px] sm:text-lg font-bold tracking-tight">
            {SITE_NAME}
          </Link>
          {nav && (
            <Link
              href={nav.href}
              className="shrink-0 text-xs sm:text-sm text-white/75 underline underline-offset-4 decoration-white/30 hover:text-white"
            >
              {nav.label}
            </Link>
          )}
        </div>
        {subtitle && <p className="mt-0.5 text-[13px] sm:text-sm text-news">{subtitle}</p>}
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
