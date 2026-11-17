import { CATEGORIES, type Category } from '@/lib/config'

export default function CategoryTag({ category, className = '' }: { category: Category; className?: string }) {
  const c = CATEGORIES[category]
  return (
    <span className={`${c.accent} inline-block rounded px-1.5 py-px text-xs font-bold text-navy ${className}`}>
      {c.label}
    </span>
  )
}
