'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CATEGORIES, DOMAIN_ERROR, parseAllowedUrl, type Category } from '@/lib/config'
import { adminDb, getPost } from '@/lib/db'
import { revalidatePostPages, revalidateReport } from '@/lib/revalidate'
import { checkPassword, getSession, isAdmin } from '@/lib/session'
import { isValidDate, parseWeekId } from '@/lib/week'

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = String(formData.get('password') ?? '')
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)) // 무차별 대입 속도 늦추기
    return '비밀번호가 올바르지 않습니다'
  }
  const session = await getSession()
  session.admin = true
  await session.save()
  redirect('/admin')
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect('/admin/login')
}

export type SaveInput = {
  postId: string | null // null = 새 게시물
  date: string // 'YYYY-MM-DD'
  topic: string
  items: { category: Category; title: string; url: string; imageUrl: string }[]
}

export type ActionResult = { ok: true; postId: string } | { ok: false; error: string }

const MAX_ITEMS = 10
const EXPIRED = '로그인이 만료되었습니다. 다시 로그인해 주세요.'

export async function savePost(input: SaveInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: EXPIRED }
  if (!isValidDate(input.date)) return { ok: false, error: '날짜를 확인해 주세요' }
  if (input.items.length < 1) return { ok: false, error: '기사를 1건 이상 넣어 주세요' }
  if (input.items.length > MAX_ITEMS) return { ok: false, error: `기사는 ${MAX_ITEMS}건까지 넣을 수 있습니다` }

  const items = []
  for (const [idx, it] of input.items.entries()) {
    const n = `${idx + 1}번 기사`
    const url = parseAllowedUrl(it.url)
    if (!url) return { ok: false, error: `${n}: ${DOMAIN_ERROR}` }
    const title = it.title.trim()
    if (!title) return { ok: false, error: `${n}: 제목이 비어 있습니다` }
    const imageUrl = it.imageUrl.trim()
    if (imageUrl && !parseAllowedUrl(imageUrl)) {
      return { ok: false, error: `${n}: 이미지도 디펜스투데이 주소만 쓸 수 있습니다` }
    }
    if (!(it.category in CATEGORIES)) return { ok: false, error: `${n}: 분류가 올바르지 않습니다` }
    items.push({ sort_order: idx + 1, category: it.category, title, url: url.toString(), image_url: imageUrl })
  }

  // 날짜를 바꾼 수정이면 예전 날짜의 주간 페이지도 갱신해야 한다
  const before = input.postId ? await getPost(input.postId) : null

  const { data, error } = await adminDb().rpc('save_post', {
    p_post_date: input.date,
    p_items: items,
    p_topic: input.topic.trim() || null,
    p_post_id: input.postId,
  })
  if (error) return { ok: false, error: `저장 실패: ${error.message}` }

  revalidatePostPages([input.date, ...(before ? [before.post_date] : [])])
  revalidatePath('/admin')
  return { ok: true, postId: data as string }
}

export async function deletePost(postId: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: EXPIRED }
  const before = await getPost(postId)
  const { error } = await adminDb().rpc('delete_post', { p_post_id: postId })
  if (error) return { ok: false, error: `삭제 실패: ${error.message}` }
  revalidatePostPages(before ? [before.post_date] : [])
  revalidatePath('/admin')
  return { ok: true, postId }
}

/** 주간 리포트 에디터 노트 저장. 비우면 삭제 */
export async function saveWeekNote(weekId: string, note: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isAdmin())) return { ok: false, error: EXPIRED }
  const week = parseWeekId(weekId)
  if (!week) return { ok: false, error: '주차 형식이 올바르지 않습니다 (예: 2026-W47)' }
  const text = note.trim()
  if (text.length > 600) return { ok: false, error: '노트는 600자까지 쓸 수 있습니다' }
  const db = adminDb()
  const { error } = text
    ? await db.from('week_notes').upsert({ week_id: week.weekId, note: text, updated_at: new Date().toISOString() })
    : await db.from('week_notes').delete().eq('week_id', week.weekId)
  if (error) {
    if (error.code === '42P01' || error.message.includes('week_notes'))
      return { ok: false, error: '노트 표가 아직 없습니다. supabase/week-notes.sql 을 먼저 실행해 주세요.' }
    return { ok: false, error: `저장 실패: ${error.message}` }
  }
  revalidateReport(week.weekId)
  revalidatePath('/admin')
  return { ok: true }
}
