import { createAdminClient } from './supabase-admin'
import type { DbAgenda, DbArticle } from './database.types'

export async function getMaintenanceMode(): Promise<boolean> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'maintenance_mode')
    .maybeSingle()
  return (data as { value: string } | null)?.value === 'true'
}

export type AdminAgenda = DbAgenda & { articles: DbArticle[] }

export async function getAllAgendas(): Promise<AdminAgenda[]> {
  const supabase = createAdminClient()
  const { data: agendasRaw } = await supabase
    .from('agendas')
    .select('*')
    .order('created_at', { ascending: false })

  const agendas = (agendasRaw ?? []) as DbAgenda[]
  if (!agendas.length) return []

  const { data: articlesRaw } = await supabase
    .from('articles')
    .select('*')
    .in('agenda_id', agendas.map(a => a.id))

  const articles = (articlesRaw ?? []) as DbArticle[]

  return agendas.map(agenda => ({
    ...agenda,
    articles: articles.filter(a => a.agenda_id === agenda.id),
  }))
}

export async function getAdminAgendaById(id: string): Promise<{
  agenda: DbAgenda | null
  articles: DbArticle[]
}> {
  const supabase = createAdminClient()
  const [{ data: agendaRaw }, { data: articlesRaw }] = await Promise.all([
    supabase.from('agendas').select('*').eq('id', id).maybeSingle(),
    supabase.from('articles').select('*').eq('agenda_id', id),
  ])
  return {
    agenda: (agendaRaw as DbAgenda | null) ?? null,
    articles: (articlesRaw as DbArticle[] | null) ?? [],
  }
}
