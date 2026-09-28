import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getWeek, listWeeks } from '@/lib/db'
import { isAdmin } from '@/lib/session'
import { currentWeekInfo } from '@/lib/week'
import { SITE_NAME } from '@/lib/config'
import { logout } from './actions'
import Editor, { type EditorInitial } from './Editor'
import DeleteButton from './DeleteButton'

export const metadata: Metadata = { title: '관리자', robots: { index: false } }

export default async function AdminPage(props: PageProps<'/admin'>) {
  if (!(await isAdmin())) redirect('/admin/login')

  const { edit, saved } = await props.searchParams
  const editId = typeof edit === 'string' ? edit : null
  const [weeks, editing] = await Promise.all([listWeeks(), editId ? getWeek(editId) : null])
  if (editId && !editing) redirect('/admin')

  let initial: EditorInitial
  if (editing) {
    initial = {
      originalWeekId: editing.week_id,
      weekId: editing.week_id,
      rangeLabel: editing.range_label,
      items: editing.items.map((i) => ({
        section: i.section,
        url: i.url,
        title: i.title,
        imageUrl: i.image_url ?? '',
      })),
    }
  } else {
    const w = currentWeekInfo()
    initial = { originalWeekId: null, weekId: w.weekId, rangeLabel: w.rangeLabel, items: [] }
  }

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
            {editing.week_no}주차를 저장했습니다. 사이트에 바로 반영됩니다.
          </p>
        )}

        <Editor key={editId ?? 'new'} initial={initial} />

        <section aria-labelledby="published">
          <h2 id="published" className="text-lg font-bold">발행한 주차</h2>
          {weeks.length === 0 ? (
            <p className="mt-3 text-sm text-body-dark">아직 없습니다.</p>
          ) : (
            <ul className="mt-3 divide-y divide-navy/10 rounded-lg border border-navy/10">
              {weeks.map((w) => (
                <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <span>
                    <span className="font-semibold">{w.week_id}</span>
                    <span className="ml-2 text-sm text-body-dark">{w.range_label}</span>
                    {w.is_current && (
                      <span className="ml-2 rounded bg-news px-1.5 py-0.5 text-xs font-semibold">이번 주</span>
                    )}
                  </span>
                  <span className="flex items-center gap-3 text-sm">
                    <Link href={`/admin?edit=${w.week_id}`} className="font-medium text-point-dark underline underline-offset-4">
                      수정
                    </Link>
                    <DeleteButton weekId={w.week_id} />
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
