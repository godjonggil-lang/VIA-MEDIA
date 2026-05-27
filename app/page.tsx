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
            <p className="font-sans text-sm">?„ì§ ê²Œì‹œ??ê¸°ì‚¬ê°€ ?†ìŠµ?ˆë‹¤.</p>
            <p className="font-sans text-xs mt-2 text-gray-300">
              ?´ë“œë¯¼ì—???„ì  ?¤ì? ê¸°ì‚¬ë¥??‘ì„±????ê²Œì‹œ?˜ì„¸??
            </p>
          </section>
        ) : (
          <>
            {/* Hero */}
            <section className="py-12 border-b border-gray-200">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-xs font-semibold text-[#B22222] tracking-widest uppercase">
                    ?¤ëŠ˜??ì£¼ìš” ?„ì  ??                  </span>
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
                  ê¸°ì‚¬ ?½ê¸° ??                </Link>
              </div>
            </section>

            {/* Latest Articles */}
            {recentArticles.length > 0 && (
              <section className="py-12 border-b border-gray-200">
                <div className="flex items-baseline justify-between mb-8">
                  <h2 className="font-serif font-bold text-2xl text-gray-900">ìµœì‹  ê¸°ì‚¬</h2>
                  <Link
                    href="/agenda"
                    className="font-sans text-sm text-gray-500 hover:text-[#B22222] transition-colors"
                  >
                    ?„ì  ???„ì²´ë³´ê¸° ??                  </Link>
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
              <h2 className="font-serif font-bold text-2xl text-gray-900">?„ì¬ ?¤ë£¨???„ì  ??/h2>
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
            VIA MEDIA News???…ë¦½ ?€?ë¦¬ì¦˜ì„ êµ¬ë…?˜ê³ , ê· í˜• ?¡íŒ ?œê°??? ì??˜ì„¸??
          </p>
          <Link
            href="/subscribe"
            className="inline-block font-sans text-sm px-8 py-3 bg-[#B22222] text-white hover:bg-[#8B0000] transition-colors"
          >
            êµ¬ë… ?Œëœ ë³´ê¸°
          </Link>
        </section>
      </div>
    </div>
  )
}
