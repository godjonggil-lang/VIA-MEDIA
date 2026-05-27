import { getPublishedAgendas, getPublishedArticles } from '@/lib/queries'
import AgendaPageClient from '@/components/AgendaPageClient'

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>
}) {
  const { view } = await searchParams
  const initialView = view === 'progressive' || view === 'conservative' ? view : null

  const [agendas, articles] = await Promise.all([
    getPublishedAgendas(),
    getPublishedArticles(),
  ])

  const pageTitle =
    initialView === 'progressive' ? '진보의 시각' :
    initialView === 'conservative' ? '보수의 시각' : '아젠다'

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-3">{pageTitle}</h1>
        <p className="font-sans text-gray-600">
          {initialView
            ? `VIA MEDIA News의 ${pageTitle} 기사 모음입니다.`
            : '현재 VIA MEDIA News가 다루는 주요 의제들입니다. 각 아젠다마다 진보와 보수의 시각을 함께 읽어보세요.'}
        </p>
      </div>

      {agendas.length === 0 ? (
        <p className="font-sans text-gray-400 text-center py-20">
          아직 게시된 아젠다가 없습니다.
        </p>
      ) : (
        <AgendaPageClient agendas={agendas} articles={articles} initialView={initialView} />
      )}
    </div>
  )
}
