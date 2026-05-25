import Link from 'next/link'
import { Article } from '@/types'
import PerspectiveBadge from './PerspectiveBadge'
import { siteConfig } from '@/lib/data'

const borderByPerspective = {
  progressive: 'border-l-[#B22222]',
  conservative: 'border-l-gray-800',
  analysis: 'border-l-gray-300',
}

export default function ArticleCard({ article }: { article: Article }) {
  const author =
    article.author === 'publisher' ? siteConfig.publisher.name : siteConfig.editor.name

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article
        className={`border border-gray-100 border-l-4 ${borderByPerspective[article.perspective]} bg-white p-5 h-full transition-shadow hover:shadow-md`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-[#B22222] font-sans font-medium tracking-wide uppercase">
            {article.agenda}
          </span>
        </div>
        <PerspectiveBadge perspective={article.perspective} />
        <h2 className="font-serif font-bold text-gray-900 text-lg leading-snug mt-2 mb-2 group-hover:text-[#B22222] transition-colors">
          {article.title}
        </h2>
        <p className="font-sans text-sm text-gray-600 leading-relaxed line-clamp-3">
          {article.summary}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400 font-sans">
          <span>{author}</span>
          <time>{article.publishedAt}</time>
        </div>
      </article>
    </Link>
  )
}
