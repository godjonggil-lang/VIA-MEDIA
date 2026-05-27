import Link from 'next/link'
import { getAllAgendas, getMaintenanceMode } from '@/lib/admin-queries'
import { setMaintenanceMode } from '@/lib/admin-actions'
import DeleteAgendaButton from '@/components/DeleteAgendaButton'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const [agendas, maintenance] = await Promise.all([
    getAllAgendas(),
    getMaintenanceMode(),
  ])

  return (
    <div>
      {error && (
        <p className="font-sans text-sm text-[#B22222] bg-red-50 border border-red-100 px-4 py-3 mb-6">
          ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.
        </p>
      )}

      {/* ?¬ì´???íƒœ ? ê? */}
      <section className="bg-white border border-gray-200 p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${maintenance ? 'bg-amber-400' : 'bg-green-500'}`} />
              <h2 className="font-sans text-sm font-semibold text-gray-900">
                ?¬ì´???íƒœ: {maintenance ? 'ì¤€ë¹?ì¤? : '?•ìƒ ?´ì˜'}
              </h2>
            </div>
            <p className="font-sans text-xs text-gray-400">
              {maintenance
                ? '?„ì¬ ë°©ë¬¸?ì—ê²?ì¤€ë¹?ì¤??˜ì´ì§€ê°€ ?œì‹œ?©ë‹ˆ??'
                : 'ë°©ë¬¸?ê? ?¬ì´?¸ë? ?•ìƒ?ìœ¼ë¡??´ìš©?????ˆìŠµ?ˆë‹¤.'}
            </p>
          </div>
          <form action={setMaintenanceMode}>
            <input type="hidden" name="enabled" value={maintenance ? 'false' : 'true'} />
            <button
              type="submit"
              className={`font-sans text-xs px-4 py-2 transition-colors ${
                maintenance
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-800 text-white hover:bg-[#B22222]'
              }`}
            >
              {maintenance ? '?•ìƒ ëª¨ë“œë¡??„í™˜' : 'ì¤€ë¹?ì¤‘ìœ¼ë¡??„í™˜'}
            </button>
          </form>
        </div>
      </section>

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif font-bold text-2xl text-gray-900">?„ì  ??ê´€ë¦?/h1>
        <Link
          href="/admin/agenda/new"
          className="font-sans text-sm bg-gray-900 text-white px-4 py-2 hover:bg-[#B22222] transition-colors"
        >
          + ???„ì  ??        </Link>
      </div>

      {agendas.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="font-sans text-sm mb-4">?„ì  ?¤ê? ?†ìŠµ?ˆë‹¤.</p>
          <Link href="/admin/agenda/new" className="font-sans text-sm text-gray-900 underline">
            ì²?ë²ˆì§¸ ?„ì  ??ë§Œë“¤ê¸?          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {agendas.map(agenda => {
            const hasProgressive = agenda.articles.some(a => a.perspective === 'progressive')
            const hasConservative = agenda.articles.some(a => a.perspective === 'conservative')
            const isPublished = agenda.status === 'published'

            return (
              <div
                key={agenda.id}
                className="flex items-center justify-between bg-white border border-gray-200 hover:border-gray-400 transition-colors group"
              >
                {/* ?¸ì§‘ ë§í¬ ?????€ë¶€ë¶?ì°¨ì? */}
                <Link
                  href={`/admin/agenda/${agenda.id}`}
                  className="flex items-center gap-4 min-w-0 flex-1 px-5 py-4"
                >
                  <span
                    className={`font-sans text-xs px-2 py-0.5 flex-shrink-0 ${
                      isPublished
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}
                  >
                    {isPublished ? 'ê²Œì‹œ?? : 'ì´ˆì•ˆ'}
                  </span>
                  <span className="font-sans text-xs text-gray-400 border border-gray-200 px-2 py-0.5 flex-shrink-0">
                    {agenda.category}
                  </span>
                  <span className="font-sans font-medium text-gray-900 truncate">{agenda.title}</span>
                  <div className="ml-auto flex items-center gap-4 flex-shrink-0">
                    <div className="flex gap-2">
                      <span className={`font-sans text-xs ${hasProgressive ? 'text-green-600' : 'text-red-400'}`}>
                        ì§„ë³´ {hasProgressive ? '?? : '??}
                      </span>
                      <span className={`font-sans text-xs ${hasConservative ? 'text-green-600' : 'text-red-400'}`}>
                        ë³´ìˆ˜ {hasConservative ? '?? : '??}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-gray-400 group-hover:text-gray-700">
                      ?¸ì§‘ ??                    </span>
                  </div>
                </Link>

                {/* ?? œ ë²„íŠ¼ ??Link ë°”ê¹¥??ë¶„ë¦¬ */}
                <div className="px-3 border-l border-gray-100">
                  <DeleteAgendaButton agendaId={agenda.id} agendaTitle={agenda.title} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
