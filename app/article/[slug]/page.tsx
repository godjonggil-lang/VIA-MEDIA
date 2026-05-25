import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getPublishedArticleSlugs } from '@/lib/queries'
import { siteConfig } from '@/lib/data'
import PerspectiveBadge from '@/components/PerspectiveBadge'
import SupportWidget from '@/components/SupportWidget'
import ShareButtons from '@/components/ShareButtons'
import ArticleCard from '@/components/ArticleCard'

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'VIA MEDIA' }
  return {
    title: `${article.title} | VIA MEDIA`,
    description: article.summary,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const relatedArticle = article.relatedSlug ? await getArticleBySlug(article.relatedSlug) : null

  const author = article.author === 'publisher' ? siteConfig.publisher : siteConfig.editor
  const paragraphs = (article.content ?? '').split(/\r?\n\r?\n/).filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="font-sans text-xs text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#B22222] transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link href="/agenda" className="hover:text-[#B22222] transition-colors">
            아젠다
          </Link>
          <span>/</span>
          <span className="text-gray-600">{article.agenda}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sans text-xs text-[#B22222] font-semibold tracking-widest uppercase">
            {article.agenda}
          </span>
        </div>
        <PerspectiveBadge perspective={article.perspective} />

        {/* Title */}
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-gray-900 leading-tight mt-4 mb-5">
          {article.title}
        </h1>

        {/* Summary */}
        <p className="font-sans text-lg text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-4 mb-6">
          {article.summary}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
          <div className="font-sans text-sm text-gray-600">
            <span className="text-xs text-gray-400 block">{author.role}</span>
            {author.name}
          </div>
          <time className="font-sans text-sm text-gray-400">
            {article.publishedAt ? article.publishedAt.slice(0, 10) : ''}
          </time>
        </div>

        {/* Content */}
        <article className="mb-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-sans text-base text-gray-800 leading-8 mb-5">
              {para}
            </p>
          ))}
        </article>

        {/* Share */}
        <div className="mb-2">
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        {/* Support Widget */}
        <SupportWidget articleSlug={article.slug} />

        {/* Related Article */}
        {relatedArticle && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-sans text-xs text-gray-500 whitespace-nowrap tracking-widest">
                반대 시각도 읽어보세요
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <ArticleCard article={relatedArticle} />
          </section>
        )}

        {/* Subscribe CTA */}
        <div className="bg-gray-50 border border-gray-200 p-8 text-center">
          <p className="font-serif font-bold text-xl text-gray-900 mb-2">균형 잡힌 시각을 유지하세요</p>
          <p className="font-sans text-sm text-gray-600 mb-5">
            VIA MEDIA를 구독하면 주요 아젠다마다 진보와 보수의 시각을 함께 받아보실 수 있습니다.
          </p>
          <Link
            href="/subscribe"
            className="inline-block font-sans text-sm px-8 py-3 bg-gray-900 text-white hover:bg-[#B22222] transition-colors"
          >
            구독하기
          </Link>
        </div>
      </div>
    </div>
  )
}
