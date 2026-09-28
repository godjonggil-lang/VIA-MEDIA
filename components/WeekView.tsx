import { SECTIONS } from '@/lib/config'
import ArticleCard from './ArticleCard'

export type ViewItem = {
  section: 'news' | 'column'
  title: string
  url: string
  image: string | null
}

// 메인·주차 페이지·관리자 미리보기가 모두 이 컴포넌트를 쓴다
export default function WeekView({ items }: { items: ViewItem[] }) {
  return (
    <div className="space-y-4 sm:space-y-8">
      {SECTIONS.map((s, si) => {
        const list = items.filter((i) => i.section === s.key)
        if (list.length === 0) return null
        return (
          <section key={s.key} aria-labelledby={`sec-${s.key}`}>
            <h2 id={`sec-${s.key}`} className="mb-2 sm:mb-4">
              <span
                className={`${s.accent} inline-block px-1.5 text-[17px] sm:text-xl font-extrabold text-navy leading-snug`}
              >
                {s.label}
              </span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {list.map((item, i) => (
                <li key={item.url + i}>
                  <ArticleCard
                    title={item.title}
                    url={item.url}
                    image={item.image}
                    priority={si === 0}
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
