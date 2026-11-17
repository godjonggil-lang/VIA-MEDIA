import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAllPosts, getAllWeekNotes, getPost } from '@/lib/db'
import { listWeeklyReports } from '@/lib/report'
import { isAdmin } from '@/lib/session'
import { dateLabel, todaySeoul, weekOfDate } from '@/lib/week'
import { SITE_NAME } from '@/lib/config'
import CategoryTag from '@/components/CategoryTag'
import { logout } from './actions'
import Editor, { type EditorInitial } from './Editor'
import DeleteButton from './DeleteButton'
import WeekNoteForm from './WeekNoteForm'

export const metadata: Metadata = { title: '관리자', robots: { index: false } }

export default async function AdminPage(props: PageProps<'/admin'>) {
  if (!(await isAdmin())) redirect('/admin/login')

  const { edit, saved } = await props.searchParams
  const editId = typeof edit === 'string' ? edit : null
  const [posts, editing, reports, notes] = await Promise.all([
    getAllPosts(),
    editId ? getPost(editId) : null,
    listWeeklyReports(),
    getAllWeekNotes(),
  ])
  // 노트를 쓸 수 있는 주: 이번 주 + 게시물이 있는 주
  const thisWeek = weekOfDate(todaySeoul())
  const noteWeeks = [thisWeek, ...reports.map((r) => r.week).filter((w) => w.weekId !== thisWeek.weekId)].map((w) => ({
    weekId: w.weekId,
    label: `${w.weekId.slice(0, 4)}년 ${w.weekNo}주차 (${w.rangeLabel})${w.weekId === thisWeek.weekId ? ' · 이번 주' : ''}`,
  }))
  if (editId && !editing) redirect('/admin')

  const initial: EditorInitial = editing
    ? {
        postId: editing.id,
        date: editing.post_date,
        topic: editing.topic ?? '',
        items: editing.items.map((i) => ({
          category: i.category,
          url: i.url,
          title: i.title,
          imageUrl: i.image_url ?? '',
        })),
      }
    : { postId: null, date: todaySeoul(), topic: '', items: [] }

  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-bold">
            {SITE_NAME} <span className="font-normal text-white/70">관리자</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" target="_blank" className="text-white/80 underline underline-offset-4 hover:text-white">
              사이트 보기
            </Link>
            <form action={logout}>
              <button className="text-white/80 hover:text-white">로그아웃</button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 space-y-10">
        {saved === '1' && editing && (
          <p role="status" className="rounded-md bg-news px-4 py-3 font-medium">
            {dateLabel(editing.post_date)} 게시물을 저장했습니다. 사이트에 바로 반영됩니다.
          </p>
        )}

        <Editor key={editId ?? 'new'} initial={initial} />

        <WeekNoteForm weeks={noteWeeks} notes={notes} />

        <section aria-labelledby="published">
          <h2 id="published" className="text-lg font-bold">발행한 게시물</h2>
          {posts.length === 0 ? (
            <p className="mt-3 text-sm text-body-dark">아직 없습니다.</p>
          ) : (
            <ul className="mt-3 divide-y divide-navy/10 rounded-lg border border-navy/10">
              {posts.map((p) => (
                <li key={p.id} className="flex flex-wrap items-start justify-between gap-2 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold tabular-nums">{p.post_date}</span>
                    {[...new Set(p.items.map((i) => i.category))].map((c) => (
                      <CategoryTag key={c} category={c} className="ml-2" />
                    ))}
                    <p className="mt-0.5 truncate text-sm text-body-dark">
                      {p.topic ? `${p.topic} · ` : ''}
                      {p.items[0]?.title}
                      {p.items.length > 1 && ` 외 ${p.items.length - 1}건`}
                    </p>
                  </div>
                  <span className="flex items-center gap-3 text-sm">
                    <Link href={`/admin?edit=${p.id}`} className="font-medium text-point-dark underline underline-offset-4">
                      수정
                    </Link>
                    <DeleteButton postId={p.id} label={`${p.post_date} 게시물`} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
