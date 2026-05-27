'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from './supabase-admin'
import type { Category, Perspective, Author } from '@/types'

async function verifyAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login')
  }
}

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin-token', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    redirect('/admin/dashboard')
  }
  redirect('/admin/login?error=1')
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-token')
  redirect('/admin/login')
}

export async function createAgenda(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('agendas')
    .insert({
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: (formData.get('description') as string) || null,
      status: 'draft',
    } as object)
    .select()
    .single()

  if (error || !data) redirect('/admin/dashboard?error=1')

  revalidatePath('/admin/dashboard')
  redirect(`/admin/agenda/${(data as { id: string }).id}`)
}

export async function updateAgenda(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const id = formData.get('id') as string

  await supabase
    .from('agendas')
    .update({
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: (formData.get('description') as string) || null,
    } as object)
    .eq('id', id)

  revalidatePath('/admin/dashboard')
  redirect(`/admin/agenda/${id}?saved=1`)
}

export async function saveAll(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const agendaId = formData.get('agendaId') as string

  // 1. 아젠다 정보 저장
  const { error: agendaError } = await supabase
    .from('agendas')
    .update({
      title: formData.get('agendaTitle') as string,
      category: formData.get('agendaCategory') as Category,
      description: (formData.get('agendaDescription') as string) || null,
    } as object)
    .eq('id', agendaId)

  if (agendaError) {
    console.error('[saveAll] agenda update error:', agendaError)
    redirect(`/admin/agenda/${agendaId}?error=1`)
  }

  // 2. 진보·보수 기사 저장 (있으면 update, 없으면 insert)
  for (const perspective of ['progressive', 'conservative'] as Perspective[]) {
    const articleId = formData.get(`${perspective}_articleId`) as string | null
    const slug = formData.get(`${perspective}_slug`) as string
    const title = formData.get(`${perspective}_title`) as string
    if (!slug || !title) continue

    if (articleId) {
      // 기존 기사 수정 — status는 변경하지 않음 (게시 상태 유지)
      const updatePayload = {
        slug,
        title,
        summary: (formData.get(`${perspective}_summary`) as string) || null,
        content: (formData.get(`${perspective}_content`) as string) || null,
        author: (formData.get(`${perspective}_author`) as Author) || 'publisher',
      } as object

      const { error } = await supabase.from('articles').update(updatePayload).eq('id', articleId)
      if (error) {
        console.error(`[saveAll] article update error (${perspective}):`, error)
        redirect(`/admin/agenda/${agendaId}?error=1`)
      }
    } else {
      // 새 기사 생성
      const insertPayload = {
        agenda_id: agendaId,
        slug,
        title,
        summary: (formData.get(`${perspective}_summary`) as string) || null,
        content: (formData.get(`${perspective}_content`) as string) || null,
        perspective,
        author: (formData.get(`${perspective}_author`) as Author) || 'publisher',
        status: 'draft',
        published_at: null,
      } as object

      const { error } = await supabase.from('articles').insert(insertPayload)
      if (error) {
        console.error(`[saveAll] article insert error (${perspective}):`, error)
        redirect(`/admin/agenda/${agendaId}?error=1`)
      }
    }
  }

  revalidatePath(`/admin/agenda/${agendaId}`)
  revalidatePath('/')
  revalidatePath('/agenda')
  redirect(`/admin/agenda/${agendaId}?saved=1`)
}

export async function saveArticle(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const articleId = formData.get('articleId') as string
  const agendaId = formData.get('agendaId') as string

  const payload = {
    agenda_id: agendaId,
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    summary: (formData.get('summary') as string) || null,
    content: (formData.get('content') as string) || null,
    perspective: formData.get('perspective') as Perspective,
    author: formData.get('author') as Author,
    status: 'draft',
  } as object

  if (articleId) {
    const { error } = await supabase.from('articles').update(payload).eq('id', articleId)
    if (error) redirect(`/admin/agenda/${agendaId}?error=1`)
  } else {
    const { error } = await supabase.from('articles').insert(payload)
    if (error) redirect(`/admin/agenda/${agendaId}?error=1`)
  }

  revalidatePath(`/admin/agenda/${agendaId}`)
  revalidatePath('/')
  revalidatePath('/agenda')
  redirect(`/admin/agenda/${agendaId}?saved=1`)
}

export async function publishAgenda(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const id = formData.get('id') as string
  const now = new Date().toISOString()

  await Promise.all([
    supabase
      .from('agendas')
      .update({ status: 'published', published_at: now } as object)
      .eq('id', id),
    supabase
      .from('articles')
      .update({ status: 'published', published_at: now } as object)
      .eq('agenda_id', id),
  ])

  revalidatePath('/')
  revalidatePath('/agenda')
  revalidatePath('/admin/dashboard')
  redirect(`/admin/agenda/${id}?published=1`)
}

export async function unpublishAgenda(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const id = formData.get('id') as string

  await Promise.all([
    supabase
      .from('agendas')
      .update({ status: 'draft', published_at: null } as object)
      .eq('id', id),
    supabase
      .from('articles')
      .update({ status: 'draft', published_at: null } as object)
      .eq('agenda_id', id),
  ])

  revalidatePath('/')
  revalidatePath('/agenda')
  revalidatePath('/admin/dashboard')
  redirect(`/admin/agenda/${id}`)
}

export async function setMaintenanceMode(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const enabled = formData.get('enabled') === 'true'

  await supabase
    .from('site_settings')
    .upsert(
      { key: 'maintenance_mode', value: enabled ? 'true' : 'false', updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    )

  revalidatePath('/', 'layout')
  revalidatePath('/agenda')
  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}

export async function deleteAgenda(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const id = formData.get('id') as string

  // 기사 먼저 삭제 후 아젠다 삭제
  await supabase.from('articles').delete().eq('agenda_id', id)
  await supabase.from('agendas').delete().eq('id', id)

  revalidatePath('/admin/dashboard')
  revalidatePath('/')
  revalidatePath('/agenda')
  redirect('/admin/dashboard')
}

export async function deleteArticle(formData: FormData) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const articleId = formData.get('articleId') as string
  const agendaId = formData.get('agendaId') as string

  await supabase.from('articles').delete().eq('id', articleId)

  revalidatePath(`/admin/agenda/${agendaId}`)
  redirect(`/admin/agenda/${agendaId}`)
}
