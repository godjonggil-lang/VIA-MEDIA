import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Section } from './config'

export type Item = {
  section: Section
  sort_order: number
  title: string
  url: string
  image_url: string | null
}

export type Week = {
  id: string
  week_id: string
  range_label: string
  week_no: number
  is_current: boolean
  published_at: string
  items: Item[]
}

export type WeekSummary = Omit<Week, 'items'>

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

const WEEK_WITH_ITEMS = 'id, week_id, range_label, week_no, is_current, published_at, items(section, sort_order, title, url, image_url)'

function sortItems(week: Week): Week {
  week.items.sort((a, b) =>
    a.section === b.section ? a.sort_order - b.sort_order : a.section === 'news' ? -1 : 1,
  )
  return week
}

export async function getCurrentWeek(): Promise<Week | null> {
  const { data, error } = await publicDb
    .from('weeks')
    .select(WEEK_WITH_ITEMS)
    .eq('is_current', true)
    .maybeSingle<Week>()
  if (error) throw error
  return data ? sortItems(data) : null
}

export async function getWeek(weekId: string): Promise<Week | null> {
  const { data, error } = await publicDb
    .from('weeks')
    .select(WEEK_WITH_ITEMS)
    .eq('week_id', weekId)
    .maybeSingle<Week>()
  if (error) throw error
  return data ? sortItems(data) : null
}

export async function listWeeks(): Promise<WeekSummary[]> {
  const { data, error } = await publicDb
    .from('weeks')
    .select('id, week_id, range_label, week_no, is_current, published_at')
    .order('week_id', { ascending: false })
  if (error) throw error
  return data ?? []
}

/** 원본 이미지 URL → 우리 이미지 프록시 경로 */
export function proxiedImage(src: string | null): string | null {
  return src ? `/api/image?src=${encodeURIComponent(src)}` : null
}
