import Link from 'next/link'

export type PickerItem = { id: string; href: string; label: string; sub: string; inProgress: boolean }

// '지난 리포트 보기' 펼침 목록 (JS 없이 <details>)
export default function ReportPicker({ items, currentId }: { items: PickerItem[]; currentId: string }) {
  return (
    <details className="group relative">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-md bg-news px-2.5 py-1.5 text-[13px] sm:text-sm font-semibold text-navy hover:bg-news/90 [&::-webkit-details-marker]:hidden">
        지난 리포트 보기 <span className="text-[0.85em] font-medium opacity-70">Past reports</span>
        <span aria-hidden className="transition-transform group-open:rotate-180">▾</span>
      </summary>
      <ul className="absolute left-0 z-20 mt-2 max-h-80 w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border border-navy/15 bg-white py-1 text-navy shadow-lg">
        {items.map((it) => (
          <li key={it.id}>
            <Link
              href={it.href}
              aria-current={it.id === currentId ? 'page' : undefined}
              className={`flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-navy/[0.04] ${it.id === currentId ? 'bg-news/40 font-bold' : ''}`}
            >
              <span>
                <span className="block font-semibold">{it.label}</span>
                <span className="block text-xs text-body-dark">{it.sub}</span>
              </span>
              {it.inProgress && <span className="shrink-0 rounded bg-news px-1.5 py-0.5 text-[11px] font-semibold">작성 중</span>}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
