import Link from 'next/link'
import { Agenda } from '@/types'

const categoryColor: Record<string, string> = {
  ?�치: 'bg-gray-100 text-gray-700',
  경제: 'bg-gray-100 text-gray-700',
  ?�회: 'bg-gray-100 text-gray-700',
  �?��: 'bg-gray-100 text-gray-700',
}

export default function AgendaCard({ agenda }: { agenda: Agenda }) {
  const total =
    agenda.articleCount.progressive +
    agenda.articleCount.conservative +
    agenda.articleCount.analysis

  return (
    <Link href={`/agenda#${agenda.id}`} className="group block">
      <article className="border border-gray-200 bg-white p-6 h-full transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`text-xs font-sans font-medium px-2 py-1 ${categoryColor[agenda.category]}`}
          >
            {agenda.category}
          </span>
          <span className="text-xs text-gray-400 font-sans">{total}�?기사</span>
        </div>
        <h2 className="font-serif font-bold text-gray-900 text-xl leading-snug mb-3 group-hover:text-[#B22222] transition-colors">
          {agenda.title}
        </h2>
        <p className="font-sans text-sm text-gray-600 leading-relaxed">{agenda.description}</p>
        <div className="mt-5 flex gap-3 text-xs font-sans">
          {agenda.articleCount.progressive > 0 && (
            <span className="text-[#B22222] border border-[#B22222] px-2 py-0.5">
              진보 {agenda.articleCount.progressive}
            </span>
          )}
          {agenda.articleCount.conservative > 0 && (
            <span className="text-gray-800 border border-gray-800 px-2 py-0.5">
              보수 {agenda.articleCount.conservative}
            </span>
          )}
          {agenda.articleCount.analysis > 0 && (
            <span className="text-gray-500 border border-gray-400 px-2 py-0.5">
              분석 {agenda.articleCount.analysis}
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
