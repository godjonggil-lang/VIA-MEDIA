import Link from 'next/link'
import { getPublishedArticles, getPublishedAgendas } from '@/lib/queries'
import { siteConfig } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'
import AgendaCard from '@/components/AgendaCard'
import PerspectiveBadge from '@/components/PerspectiveBadge'

export default async function HomePage() {
  const [articles, agendas] = await Promise.all([
    getPublishedArticles(),
    getPublishedAgendas(),
  ])

  const hero = articles[0]
  const recentArticles = articles.slice(1)

  return (
    <div>
      {/* Slogan Banner */}
      <div className="bg-gray-900 text-white py-3 text-center">
        <p className="font-sans text-xs tracking-widest uppercase text-gray-300">
          {siteConfig.slogan}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {!hero ? (
          <section className="py-20 text-center text-gray-400">
            <p className="font-sans text-sm">아직 게시된 기사가 없습니다.</p>
            <p className="font-sans text-xs mt-2 text-gray-300">
              어드민에서 아젠다와 기사를 작성한 후 게시하세요.
            </p>
          </section>
        ) : (
          <>
            {/* Hero */}
            <section className="py-12 border-b border-gray-200">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-xs font-semibold text-[#B22222] tracking-widest uppercase">
                    오늘의 주요 아젠다
                  </span>
                  <span className="font-sans text-xs text-gray-400">{hero.agenda}</span>
                </div>
                <PerspectiveBadge perspective={hero.perspective} />
                <h1 className="font-serif font-black text-4xl sm:text-5xl text-gray-900 leading-tight mt-3 mb-4">
                  {hero.title}
                </h1>
                <p className="font-sans text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
                  {hero.summary}
                </p>
                <Link
                  href={`/article/${hero.slug}`}
                  className="inline-block font-sans text-sm border border-gray-900 px-6 py-3 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                >
                  기사 읽기 →
                </Link>
              </div>
            </section>

            {/* Latest Articles */}
            {recentArticles.length > 0 && (
              <section className="py-12 border-b border-gray-200">
                <div className="flex items-baseline justify-between mb-8">
                  <h2 className="font-serif font-bold text-2xl text-gray-900">최신 기사</h2>
                  <Link
                    href="/agenda"
                    className="font-sans text-sm text-gray-500 hover:text-[#B22222] transition-colors"
                  >
                    아젠다 전체보기 →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {recentArticles.map(article => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Agenda Section */}
        {agendas.length > 0 && (
          <section className="py-12 border-b border-gray-200">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif font-bold text-2xl text-gray-900">현재 다루는 아젠다</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {agendas.map(agenda => (
                <AgendaCard key={agenda.id} agenda={agenda} />
              ))}
            </div>
          </section>
        )}

        {/* Subscribe CTA */}
        <section className="py-16 text-center">
          <h2 className="font-serif font-bold text-3xl text-gray-900 mb-3">
            {siteConfig.subSlogan}
          </h2>
          <p className="font-sans text-gray-600 mb-8 max-w-lg mx-auto">
            VIA MEDIA의 독립 저널리즘을 구독하고, 균형 잡힌 시각을 유지하세요.
          </p>
          <Link
            href="/subscribe"
            className="inline-block font-sans text-sm px-8 py-3 bg-[#B22222] text-white hover:bg-[#8B0000] transition-colors"
          >
            구독 플랜 보기
          </Link>
        </section>
      </div>
    </div>
  )
}
