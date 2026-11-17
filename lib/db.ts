import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { RECENT_DAYS, type Category } from './config'
import { addDays, todaySeoul } from './week'

export type PostItem = {
  sort_order: number
  category: Category
  title: string
  url: string
  image_url: string | null
}

export type Post = {
  id: string
  post_date: string // 'YYYY-MM-DD'
  topic: string | null
  created_at: string
  items: PostItem[]
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!

// 공개 읽기 (RLS: select 만 허용)
const publicDb = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
  auth: { persistSession: false },
})

// 쓰기 전용 — 관리자 서버 액션에서만 사용
export function adminDb() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

const POST_WITH_ITEMS = 'id, post_date, topic, created_at, post_items(sort_order, category, title, url, image_url)'

type Row = Omit<Post, 'items'> & { post_items: PostItem[] }

function toPost({ post_items, ...rest }: Row): Post {
  return { ...rest, items: [...post_items].sort((a, b) => a.sort_order - b.sort_order) }
}

function selectPosts() {
  return publicDb
    .from('posts')
    .select(POST_WITH_ITEMS)
    .order('post_date', { ascending: false })
    .order('created_at', { ascending: false })
}

function unwrap({ data, error }: { data: unknown; error: unknown }): Post[] {
  if (error) throw error
  return ((data as Row[] | null) ?? []).map(toPost)
}

/** 메인: 최근 7일치. 그 사이 게시물이 없으면 가장 최근 게시물 1개라도 보여준다 */
export async function getRecentPosts(): Promise<Post[]> {
  const since = addDays(todaySeoul(), -(RECENT_DAYS - 1))
  const recent = unwrap(await selectPosts().gte('post_date', since))
  if (recent.length > 0) return recent
  return unwrap(await selectPosts().limit(1))
}

export async function getAllPosts(): Promise<Post[]> {
  return unwrap(await selectPosts())
}

export async function getPostsBetween(from: string, to: string): Promise<Post[]> {
  return unwrap(await selectPosts().gte('post_date', from).lte('post_date', to))
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await publicDb.from('posts').select(POST_WITH_ITEMS).eq('id', id).maybeSingle<Row>()
  if (error) throw error
  return data ? toPost(data) : null
}

/** 게시물 날짜·기사 수만 (리포트 목록용) */
export async function getPostDates(): Promise<{ post_date: string; items: number }[]> {
  const { data, error } = await publicDb
    .from('posts')
    .select('post_date, post_items(count)')
    .order('post_date', { ascending: false })
  if (error) throw error
  return (data ?? []).map((p) => ({
    post_date: p.post_date as string,
    items: (p.post_items as unknown as { count: number }[])[0]?.count ?? 0,
  }))
}

/** 주간 리포트 에디터 노트. 표가 아직 없거나 노트가 없으면 null */
export async function getWeekNote(weekId: string): Promise<string | null> {
  const { data, error } = await publicDb.from('week_notes').select('note').eq('week_id', weekId).maybeSingle()
  if (error) return null
  return (data?.note as string | undefined)?.trim() || null
}

export async function getAllWeekNotes(): Promise<Record<string, string>> {
  const { data, error } = await publicDb.from('week_notes').select('week_id, note')
  if (error) return {}
  return Object.fromEntries((data ?? []).map((r) => [r.week_id as string, r.note as string]))
}

/** keepalive 용 가벼운 조회 */
export async function pingDb(): Promise<void> {
  const { error } = await publicDb.from('posts').select('id').limit(1)
  if (error) throw error
}

/** 원본 이미지 URL → 우리 이미지 프록시 경로 */
export function proxiedImage(src: string | null): string | null {
  return src ? `/api/image?src=${encodeURIComponent(src)}` : null
}
