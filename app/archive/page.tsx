import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/db'
import { dateLabel, monthLabel } from '@/lib/week'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'
import CategoryTag from '@/components/CategoryTag'

export const revalidate = 600

export const metadata: Metadata = {
  title: '이전 카드뉴스',
  description: '지난 디펜스투데이 카드뉴스 원문 모음',
}

// 월별로 묶은 전체 목록. 기사 제목을 누르면 원문이 새 탭으로 열린다.
export default async function Archive() {
  const posts = await getAllPosts()
  const months = new Map<string, typeof posts>()
  for (const p of posts) {
    const key = monthLabel(p.post_date)
    months.set(key, [...(months.get(key) ?? []), p])
  }

  return (
    <>
      <SiteHeader subtitle="지난 카드뉴스 원문 · 월별" active="archive" />
      <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:py-8">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-body-dark">아직 발행된 카드뉴스가 없습니다.</p>
        ) : (
          <div className="space-y-8">
            {[...months].map(([month, list]) => (
              <section key={month} aria-labelledby={`m-${month}`}>
                <h2 id={`m-${month}`} className="mb-2 text-lg font-extrabold">{month}</h2>
                <ul className="divide-y divide-navy/10 rounded-lg border border-navy/10 bg-white">
                  {list.map((p) => (
                    <li key={p.id} className="flex gap-3 px-4 py-3">
                      <span className="w-[4.5rem] shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-body-dark">
                        {dateLabel(p.post_date)}
                      </span>
                      <ul className="min-w-0 flex-1 space-y-1.5">
                        {p.topic && <li className="font-bold">{p.topic}</li>}
                        {p.items.map((i) => (
                          <li key={i.url} className="flex items-start gap-2">
                            <CategoryTag category={i.category} className="mt-0.5 shrink-0" />
                            <a
                              href={i.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[15px] leading-snug hover:underline decoration-point underline-offset-2 focus-visible:outline-3 focus-visible:outline-point"
                            >
                              {i.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
