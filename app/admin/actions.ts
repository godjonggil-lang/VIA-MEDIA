'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { DOMAIN_ERROR, parseAllowedUrl, SECTIONS, type Section } from '@/lib/config'
import { adminDb } from '@/lib/db'
import { checkPassword, getSession, isAdmin } from '@/lib/session'
import { parseWeekId } from '@/lib/week'

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

export type PublishInput = {
  originalWeekId: string | null // null = 새 발행
  weekId: string
  rangeLabel: string
  items: { section: Section; title: string; url: string; imageUrl: string }[]
}

export type ActionResult = { ok: true; weekId: string } | { ok: false; error: string }

export async function publishWeek(input: PublishInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: '로그인이 만료되었습니다. 다시 로그인해 주세요.' }

  const info = parseWeekId(input.weekId)
  if (!info) return { ok: false, error: '주차 ID 형식이 올바르지 않습니다 (예: 2026-W39)' }
  const rangeLabel = input.rangeLabel.trim()
  if (!rangeLabel) return { ok: false, error: '기간 표기를 입력해 주세요' }

  const items = []
  for (const s of SECTIONS) {
    const list = input.items.filter((i) => i.section === s.key)
    if (list.length !== 3) return { ok: false, error: `${s.label} 3건을 모두 채워 주세요` }
    for (const [idx, it] of list.entries()) {
      const n = `${s.label} ${idx + 1}번`
      const url = parseAllowedUrl(it.url)
      if (!url) return { ok: false, error: `${n}: ${DOMAIN_ERROR}` }
      const title = it.title.trim()
      if (!title) return { ok: false, error: `${n}: 제목이 비어 있습니다` }
      const imageUrl = it.imageUrl.trim()
      if (imageUrl && !parseAllowedUrl(imageUrl)) {
        return { ok: false, error: `${n}: 이미지도 디펜스투데이 주소만 쓸 수 있습니다` }
      }
      items.push({ section: s.key, sort_order: idx + 1, title, url: url.toString(), image_url: imageUrl })
    }
  }

  const { error } = await adminDb().rpc('publish_week', {
    p_week_id: info.weekId,
    p_range_label: rangeLabel,
    p_week_no: info.weekNo,
    p_items: items,
    p_original_week_id: input.originalWeekId,
  })
  if (error) {
    if (error.message.includes('WEEK_EXISTS'))
      return { ok: false, error: `${info.weekId} 는 이미 발행되었습니다. 아래 목록에서 '수정'을 눌러 주세요.` }
    return { ok: false, error: `저장 실패: ${error.message}` }
  }

  revalidateAll([info.weekId, input.originalWeekId])
  return { ok: true, weekId: info.weekId }
}

export async function deleteWeek(weekId: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: '로그인이 만료되었습니다. 다시 로그인해 주세요.' }
  const { error } = await adminDb().rpc('delete_week', { p_week_id: weekId })
  if (error) return { ok: false, error: `삭제 실패: ${error.message}` }
  revalidateAll([weekId])
  return { ok: true, weekId }
}

function revalidateAll(weekIds: (string | null)[]) {
  revalidatePath('/')
  revalidatePath('/archive')
  for (const id of weekIds) if (id) revalidatePath(`/week/${id}`)
  revalidatePath('/admin')
}
