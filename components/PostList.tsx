import type { Category } from '@/lib/config'
import { dateLabel } from '@/lib/week'
import ArticleCard from './ArticleCard'
import CategoryTag from './CategoryTag'

export type ViewPost = {
  key: string
  date: string // 'YYYY-MM-DD'
  topic: string | null
  items: { category: Category; title: string; url: string; image: string | null }[]
}

// 메인·주차 페이지·관리자 미리보기가 모두 이 컴포넌트를 쓴다
export default function PostList({ posts, markNewest }: { posts: ViewPost[]; markNewest?: boolean }) {
  return (
    <div className="space-y-5 sm:space-y-9">
      {posts.map((post, pi) => {
        const cats = [...new Set(post.items.map((i) => i.category))]
        const mixed = cats.length > 1
        const headingId = `post-${post.key}`
        return (
          <section key={post.key} aria-labelledby={headingId}>
            <h2 id={headingId} className="mb-2 sm:mb-3.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] sm:text-lg font-extrabold text-navy tabular-nums">{dateLabel(post.date)}</span>
              {!mixed && cats[0] && <CategoryTag category={cats[0]} />}
              {markNewest && pi === 0 && (
                <span className="rounded bg-point px-1.5 py-px text-xs font-bold text-navy">NEW</span>
              )}
              {post.topic && <span className="w-full text-base sm:text-lg font-bold text-navy">{post.topic}</span>}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {post.items.map((item, i) => (
                <li key={item.url + i}>
                  <ArticleCard
                    title={item.title}
                    url={item.url}
                    image={item.image}
                    tag={mixed ? item.category : undefined}
                    first={pi === 0}
                  />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
