'use client'

import { useState } from 'react'
import AgendaCard from './AgendaCard'
import ArticleCard from './ArticleCard'
import type { Agenda, Article, Category } from '@/types'

const CATEGORIES: (Category | '전체')[] = ['전체', '정치', '경제', '사회', '국제']

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

  const filteredAgendas =
    activeCategory === '전체' ? agendas : agendas.filter(a => a.category === activeCategory)

  // 관점 필터가 있으면 해당 기사만 표시
  if (initialView) {
    const viewArticles = articles.filter(a => a.perspective === initialView)
    return (
      <div className="space-y-6">
        {viewArticles.length === 0 ? (
          <p className="font-sans text-gray-400 text-center py-20">아직 게시된 기사가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {viewArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-10 border-b border-gray-200 pb-6">
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

      {filteredAgendas.length === 0 ? (
        <p className="font-sans text-gray-400 text-center py-12">해당 카테고리의 아젠다가 없습니다.</p>
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
