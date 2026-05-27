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
    initialView === 'progressive' ? 'ì§„ë³´???œê°' :
    initialView === 'conservative' ? 'ë³´ìˆ˜???œê°' : '?„ì  ??

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-3">{pageTitle}</h1>
        <p className="font-sans text-gray-600">
          {initialView
            ? `VIA MEDIA News??${pageTitle} ê¸°ì‚¬ ëª¨ìŒ?…ë‹ˆ??`
            : '?„ì¬ VIA MEDIA Newsê°€ ?¤ë£¨??ì£¼ìš” ?˜ì œ?¤ì…?ˆë‹¤. ê°??„ì  ?¤ë§ˆ??ì§„ë³´?€ ë³´ìˆ˜???œê°???¨ê»˜ ?½ì–´ë³´ì„¸??'}
        </p>
      </div>

      {agendas.length === 0 ? (
        <p className="font-sans text-gray-400 text-center py-20">
          ?„ì§ ê²Œì‹œ???„ì  ?¤ê? ?†ìŠµ?ˆë‹¤.
        </p>
      ) : (
        <AgendaPageClient agendas={agendas} articles={articles} initialView={initialView} />
      )}
    </div>
  )
}
