import Link from 'next/link'
import { getAllAgendas } from '@/lib/admin-queries'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const agendas = await getAllAgendas()

  return (
    <div>
      {error && (
        <p className="font-sans text-sm text-[#B22222] bg-red-50 border border-red-100 px-4 py-3 mb-6">
          오류가 발생했습니다. 다시 시도해주세요.
        </p>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif font-bold text-2xl text-gray-900">아젠다 관리</h1>
        <Link
          href="/admin/agenda/new"
          className="font-sans text-sm bg-gray-900 text-white px-4 py-2 hover:bg-[#B22222] transition-colors"
        >
          + 새 아젠다
        </Link>
      </div>

      {agendas.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="font-sans text-sm mb-4">아젠다가 없습니다.</p>
          <Link href="/admin/agenda/new" className="font-sans text-sm text-gray-900 underline">
            첫 번째 아젠다 만들기
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {agendas.map(agenda => {
            const hasProgressive = agenda.articles.some(a => a.perspective === 'progressive')
            const hasConservative = agenda.articles.some(a => a.perspective === 'conservative')
            const isPublished = agenda.status === 'published'

            return (
              <Link
                key={agenda.id}
                href={`/admin/agenda/${agenda.id}`}
                className="flex items-center justify-between bg-white border border-gray-200 px-5 py-4 hover:border-gray-400 transition-colors group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className={`font-sans text-xs px-2 py-0.5 flex-shrink-0 ${
                      isPublished
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}
                  >
                    {isPublished ? '게시됨' : '초안'}
                  </span>
                  <span className="font-sans text-xs text-gray-400 border border-gray-200 px-2 py-0.5 flex-shrink-0">
                    {agenda.category}
                  </span>
                  <span className="font-sans font-medium text-gray-900 truncate">{agenda.title}</span>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex gap-2">
                    <span
                      className={`font-sans text-xs ${hasProgressive ? 'text-green-600' : 'text-red-400'}`}
                    >
                      진보 {hasProgressive ? '✓' : '✕'}
                    </span>
                    <span
                      className={`font-sans text-xs ${hasConservative ? 'text-green-600' : 'text-red-400'}`}
                    >
                      보수 {hasConservative ? '✓' : '✕'}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-gray-400 group-hover:text-gray-700">
                    편집 →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
