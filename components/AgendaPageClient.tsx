'use client'

import { useState } from 'react'
import AgendaCard from './AgendaCard'
import ArticleCard from './ArticleCard'
import type { Agenda, Article, Category } from '@/types'

const CATEGORIES: (Category | '?ÑÏ≤¥')[] = ['?ÑÏ≤¥', '?ïÏπò', 'Í≤ΩÏ†ú', '?¨Ìöå', 'Íµ?†ú']

// "2025-05" ??"2025??5??
function formatYearMonth(ym: string) {
  const [year, month] = ym.split('-')
  return `${year}??${parseInt(month)}??
}

// publishedAt ??"2025-05" ??function toYearMonth(dateStr: string) {
  return dateStr.slice(0, 7)
}

export default function AgendaPageClient({
  agendas,
  articles,
  initialView,
}: {
  agendas: Agenda[]
  articles: Article[]
  initialView?: 'progressive' | 'conservative' | null
}) {
  const [activeCategory, setActiveCategory] = useState<Category | '?ÑÏ≤¥'>('?ÑÏ≤¥')
  const [activeMonth, setActiveMonth] = useState<string>('?ÑÏ≤¥')

  // ?∞ÎèÑ¬∑??Î™©Î°ù Ï∂îÏ∂ú (ÏµúÏã†??
  const months = ['?ÑÏ≤¥', ...Array.from(
    new Set(agendas.map(a => toYearMonth(a.publishedAt)))
  ).sort((a, b) => b.localeCompare(a))]

  // Ïπ¥ÌÖåÍ≥†Î¶¨ + ???ÑÌÑ∞ ?ÅÏö©
  const filteredAgendas = agendas.filter(a => {
    const categoryOk = activeCategory === '?ÑÏ≤¥' || a.category === activeCategory
    const monthOk = activeMonth === '?ÑÏ≤¥' || toYearMonth(a.publishedAt) === activeMonth
    return categoryOk && monthOk
  })

  // Í¥Ä???ÑÌÑ∞Í∞Ä ?àÏúºÎ©??¥Îãπ Í∏∞ÏÇ¨Îß??úÏãú (?∞ÎèÑ¬∑???ÑÌÑ∞ ?¨Ìï®)
  if (initialView) {
    const viewArticles = articles.filter(a => a.perspective === initialView)
    const viewMonths = ['?ÑÏ≤¥', ...Array.from(
      new Set(viewArticles.map(a => toYearMonth(a.publishedAt)))
    ).sort((a, b) => b.localeCompare(a))]

    const filteredViewArticles = activeMonth === '?ÑÏ≤¥'
      ? viewArticles
      : viewArticles.filter(a => toYearMonth(a.publishedAt) === activeMonth)

    return (
      <div className="space-y-6">
        {/* ?∞ÎèÑ¬∑???ÑÌÑ∞ */}
        {viewMonths.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-6 border-b border-gray-200 pb-6">
            {viewMonths.map(ym => (
              <button
                key={ym}
                onClick={() => setActiveMonth(ym)}
                className={`font-sans text-xs px-3 py-1.5 border transition-colors ${
                  activeMonth === ym
                    ? 'border-[#B22222] bg-[#B22222] text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                {ym === '?ÑÏ≤¥' ? '?ÑÏ≤¥ Í∏∞Í∞Ñ' : formatYearMonth(ym)}
              </button>
            ))}
          </div>
        )}

        {filteredViewArticles.length === 0 ? (
          <p className="font-sans text-gray-400 text-center py-20">?ÑÏßÅ Í≤åÏãú??Í∏∞ÏÇ¨Í∞Ä ?ÜÏäµ?àÎã§.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredViewArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Ïπ¥ÌÖåÍ≥†Î¶¨ ?ÑÌÑ∞ */}
      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans text-sm px-4 py-2 border transition-colors ${
              activeCategory === cat
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ?∞ÎèÑ¬∑???ÑÌÑ∞ */}
      {months.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-10 border-b border-gray-200 pb-6">
          {months.map(ym => (
            <button
              key={ym}
              onClick={() => setActiveMonth(ym)}
              className={`font-sans text-xs px-3 py-1.5 border transition-colors ${
                activeMonth === ym
                  ? 'border-[#B22222] bg-[#B22222] text-white'
                  : 'border-gray-200 text-gray-500 hover:border-gray-400'
              }`}
            >
              {ym === '?ÑÏ≤¥' ? '?ÑÏ≤¥ Í∏∞Í∞Ñ' : formatYearMonth(ym)}
            </button>
          ))}
        </div>
      )}

      {filteredAgendas.length === 0 ? (
        <p className="font-sans text-gray-400 text-center py-12">?¥Îãπ Ï°∞Í±¥???ÑÏ††?§Í? ?ÜÏäµ?àÎã§.</p>
      ) : (
        <>
          {/* Agenda Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
            {filteredAgendas.map(agenda => (
              <AgendaCard key={agenda.id} agenda={agenda} />
            ))}
          </div>

          {/* Articles by Agenda */}
          {filteredAgendas.map(agenda => {
            const agendaArticles = articles.filter(a => a.agendaId === agenda.id)
            if (!agendaArticles.length) return null
            return (
              <section
                key={agenda.id}
                id={agenda.id}
                className="mb-14 border-t border-gray-200 pt-10"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <h2 className="font-serif font-bold text-2xl text-gray-900">{agenda.title}</h2>
                  <span className="font-sans text-xs text-gray-400 border border-gray-300 px-2 py-0.5">
                    {agenda.category}
                  </span>
                  <span className="font-sans text-xs text-gray-400 ml-auto">
                    {formatYearMonth(toYearMonth(agenda.publishedAt))}
                  </span>
                </div>
                <p className="font-sans text-sm text-gray-600 mb-6">{agenda.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {agendaArticles.map(article => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )
          })}
        </>
      )}
    </>
  )
}
