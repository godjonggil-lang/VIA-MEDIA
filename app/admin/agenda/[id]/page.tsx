import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAdminAgendaById } from '@/lib/admin-queries'
import { saveAll, publishAgenda, unpublishAgenda, deleteArticle } from '@/lib/admin-actions'
import type { DbArticle } from '@/lib/database.types'
import DeleteAgendaButton from '@/components/DeleteAgendaButton'

const CATEGORIES = ['정치', '경제', '사회', '국제'] as const

function ArticleFields({
  perspective,
  agendaId,
  agendaTitle,
  article,
}: {
  perspective: 'progressive' | 'conservative'
  agendaId: string
  agendaTitle: string
  article?: DbArticle
}) {
  const label = perspective === 'progressive' ? '진보' : '보수'
  const accentBorder = perspective === 'progressive' ? 'border-l-[#B22222]' : 'border-l-gray-800'
  const accentText = perspective === 'progressive' ? 'text-[#B22222]' : 'text-gray-800'
  const p = perspective
  const defaultSlug = article?.slug ?? `${agendaId.slice(0, 8)}-${perspective}`

  return (
    <section className={`bg-white border border-gray-200 border-l-4 ${accentBorder} p-6 mb-6`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`font-serif font-bold text-lg ${accentText}`}>{label} 시각 기사</h2>
        {article && (
          <form action={deleteArticle}>
            <input type="hidden" name="articleId" value={article.id} />
            <input type="hidden" name="agendaId" value={agendaId} />
            <button type="submit" className="font-sans text-xs text-red-400 hover:text-red-600 transition-colors">
              삭제
            </button>
          </form>
        )}
      </div>

      {/* 숨김 필드 */}
      {article && <input type="hidden" name={`${p}_articleId`} value={article.id} />}

      <div className="space-y-4">
        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
            슬러그 (URL) <span className="text-[#B22222]">*</span>
          </label>
          <input
            type="text"
            name={`${p}_slug`}
            defaultValue={defaultSlug}
            className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900 font-mono"
          />
          <p className="font-sans text-xs text-gray-400 mt-1">
            URL: /article/<span className="font-mono">{defaultSlug}</span>
          </p>
        </div>

        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
            제목 <span className="text-[#B22222]">*</span>
          </label>
          <input
            type="text"
            name={`${p}_title`}
            defaultValue={article?.title ?? ''}
            placeholder={`${agendaTitle} — ${label}의 시각`}
            className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">요약 (리드문)</label>
          <textarea
            name={`${p}_summary`}
            rows={2}
            defaultValue={article?.summary ?? ''}
            placeholder="기사를 대표하는 한두 문장"
            className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900 resize-none"
          />
        </div>

        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">본문</label>
          <textarea
            name={`${p}_content`}
            rows={14}
            defaultValue={article?.content ?? ''}
            placeholder={'단락은 빈 줄로 구분합니다.\n\n두 번째 단락...'}
            className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900 resize-y font-mono leading-relaxed"
          />
          <p className="font-sans text-xs text-gray-400 mt-1">빈 줄(↵↵)로 단락을 구분하세요.</p>
        </div>

        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">작성자</label>
          <select
            name={`${p}_author`}
            defaultValue={article?.author ?? 'publisher'}
            className="border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
          >
            <option value="publisher">발행인</option>
            <option value="editor">편집인</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default async function AgendaEditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string; published?: string; error?: string }>
}) {
  const { id } = await params
  const sp = await searchParams
  const { agenda, articles } = await getAdminAgendaById(id)

  if (!agenda) notFound()

  const progressive = articles.find(a => a.perspective === 'progressive')
  const conservative = articles.find(a => a.perspective === 'conservative')
  const canPublish = !!progressive && !!conservative
  const isPublished = agenda.status === 'published'

  return (
    <div>
      {/* 토스트 */}
      {(sp.saved || sp.published) && (
        <div className="bg-green-50 border border-green-200 text-green-700 font-sans text-sm px-4 py-3 mb-6">
          {sp.published ? '게시되었습니다. 홈페이지에 반영되었습니다.' : '저장되었습니다.'}
        </div>
      )}
      {sp.error && (
        <div className="bg-red-50 border border-red-100 text-[#B22222] font-sans text-sm px-4 py-3 mb-6">
          오류가 발생했습니다. 다시 시도해주세요.
        </div>
      )}

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="font-sans text-sm text-gray-400 hover:text-gray-700">
            ← 대시보드
          </Link>
          <DeleteAgendaButton agendaId={agenda.id} agendaTitle={agenda.title} />
          <span className="text-gray-300">/</span>
          <h1 className="font-serif font-bold text-xl text-gray-900">{agenda.title}</h1>
          <span className={`font-sans text-xs px-2 py-0.5 ${isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
            {isPublished ? '게시됨' : '초안'}
          </span>
        </div>

        {isPublished ? (
          <form action={unpublishAgenda}>
            <input type="hidden" name="id" value={agenda.id} />
            <button type="submit" className="font-sans text-sm border border-gray-300 text-gray-700 px-4 py-2 hover:border-gray-500 transition-colors">
              게시 취소
            </button>
          </form>
        ) : (
          <form action={publishAgenda}>
            <input type="hidden" name="id" value={agenda.id} />
            <button
              type="submit"
              disabled={!canPublish}
              title={!canPublish ? '진보·보수 기사를 모두 저장해야 게시할 수 있습니다' : ''}
              className={`font-sans text-sm px-4 py-2 transition-colors ${canPublish ? 'bg-[#B22222] text-white hover:bg-[#8B0000]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              게시하기{!canPublish && ' (저장 먼저)'}
            </button>
          </form>
        )}
      </div>

      {/* 통합 저장 폼 */}
      <form action={saveAll}>
        <input type="hidden" name="agendaId" value={agenda.id} />

        {/* 아젠다 정보 */}
        <section className="bg-white border border-gray-200 p-6 mb-8">
          <h2 className="font-sans text-xs font-semibold text-gray-500 tracking-widest uppercase mb-5">아젠다 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
                제목 <span className="text-[#B22222]">*</span>
              </label>
              <input
                type="text"
                name="agendaTitle"
                required
                defaultValue={agenda.title}
                className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block font-sans text-xs font-medium text-gray-600 mb-1">카테고리</label>
              <select
                name="agendaCategory"
                defaultValue={agenda.category}
                className="border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-sans text-xs font-medium text-gray-600 mb-1">설명</label>
              <textarea
                name="agendaDescription"
                rows={2}
                defaultValue={agenda.description ?? ''}
                className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900 resize-none"
              />
            </div>
          </div>
        </section>

        {/* 기사 필드 */}
        <ArticleFields perspective="progressive" agendaId={agenda.id} agendaTitle={agenda.title} article={progressive} />
        <ArticleFields perspective="conservative" agendaId={agenda.id} agendaTitle={agenda.title} article={conservative} />

        {/* 통합 저장 버튼 */}
        <div className="sticky bottom-6 flex justify-end">
          <button
            type="submit"
            className="font-sans text-sm bg-gray-900 text-white px-8 py-3 hover:bg-[#B22222] transition-colors shadow-lg"
          >
            전체 저장
          </button>
        </div>
      </form>
    </div>
  )
}
