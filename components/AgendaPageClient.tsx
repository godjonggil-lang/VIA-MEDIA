'use client'

import { useState } from 'react'
import AgendaCard from './AgendaCard'
import ArticleCard from './ArticleCard'
import type { Agenda, Article, Category } from '@/types'

const CATEGORIES: (Category | '전체')[] = ['전체', '정치', '경제', '사회', '국제']

// "2025-05" → "2025년 5월"
function formatYearMonth(ym: string) {
  const [year, month] = ym.split('-')
  return `${year}년 ${parseInt(month)}월`
}

// publishedAt → "2025-05" 키
function toYearMonth(dateStr: string) {
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
  const [activeCategory, setActiveCategory] = useState<Category | '전체'>('전체')
  const [activeMonth, setActiveMonth] = useState<string>('전체')

  // 연도·월 목록 추출 (최신순)
  const months = ['전체', ...Array.from(
    new Set(agendas.map(a => toYearMonth(a.publishedAt)))
  ).sort((a, b) => b.localeCompare(a))]

  // 카테고리 + 월 필터 적용
  const filteredAgendas = agendas.filter(a => {
    const categoryOk = activeCategory === '전체' || a.category === activeCategory
    const monthOk = activeMonth === '전체' || toYearMonth(a.publishedAt) === activeMonth
    return categoryOk && monthOk
  })

  // 관점 필터가 있으면 해당 기사만 표시 (연도·월 필터 포함)
  if (initialView) {
    const viewArticles = articles.filter(a => a.perspective === initialView)
    const viewMonths = ['전체', ...Array.from(
      new Set(viewArticles.map(a => toYearMonth(a.publishedAt)))
    ).sort((a, b) => b.localeCompare(a))]

    const filteredViewArticles = activeMonth === '전체'
      ? viewArticles
      : viewArticles.filter(a => toYearMonth(a.publishedAt) === activeMonth)

    return (
      <div className="space-y-6">
        {/* 연도·월 필터 */}
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
                {ym === '전체' ? '전체 기간' : formatYearMonth(ym)}
              </button>
            ))}
          </div>
        )}

        {filteredViewArticles.length === 0 ? (
          <p className="font-sans text-gray-400 text-center py-20">아직 게시된 기사가 없습니다.</p>
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
      {/* 카테고리 필터 */}
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

      {/* 연도·월 필터 */}
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
              {ym === '전체' ? '전체 기간' : formatYearMonth(ym)}
            </button>
          ))}
        </div>
      )}

      {filteredAgendas.length === 0 ? (
        <p className="font-sans text-gray-400 text-center py-12">해당 조건의 아젠다가 없습니다.</p>
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
