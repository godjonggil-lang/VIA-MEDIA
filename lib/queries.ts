import { supabase } from './supabase'
import type { Agenda, Article } from '@/types'
import type { DbArticle, DbAgenda } from './database.types'

function toAgenda(
  db: DbAgenda,
  articles: Pick<DbArticle, 'agenda_id' | 'perspective'>[]
): Agenda {
  const mine = articles.filter(a => a.agenda_id === db.id)
  return {
    id: db.id,
    title: db.title,
    category: db.category,
    description: db.description ?? '',
    publishedAt: db.published_at ?? db.created_at,
    articleCount: {
      progressive: mine.filter(a => a.perspective === 'progressive').length,
      conservative: mine.filter(a => a.perspective === 'conservative').length,
      analysis: mine.filter(a => a.perspective === 'analysis').length,
    },
  }
}

function toArticle(db: DbArticle, agendaTitle: string, relatedSlug?: string): Article {
  return {
    slug: db.slug,
    title: db.title,
    summary: db.summary ?? '',
    content: db.content ?? '',
    agenda: agendaTitle,
    agendaId: db.agenda_id,
    perspective: db.perspective,
    author: db.author,
    publishedAt: db.published_at ?? db.created_at,
    relatedSlug,
  }
}

export async function getPublishedAgendas(): Promise<Agenda[]> {
  const { data: agendasRaw } = await supabase
    .from('agendas')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const agendas = (agendasRaw ?? []) as DbAgenda[]
  if (!agendas.length) return []

  const { data: articlesRaw } = await supabase
    .from('articles')
    .select('agenda_id, perspective')
    .in('agenda_id', agendas.map(a => a.id))
    .eq('status', 'published')

  const articles = (articlesRaw ?? []) as Pick<DbArticle, 'agenda_id' | 'perspective'>[]
  return agendas.map(a => toAgenda(a, articles))
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { data: articlesRaw } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const articles = (articlesRaw ?? []) as DbArticle[]
  if (!articles.length) return []

  const agendaIds = [...new Set(articles.map(a => a.agenda_id))]
  const { data: agendasRaw } = await supabase
    .from('agendas')
    .select('id, title')
    .in('id', agendaIds)

  const agendaMap = new Map(
    ((agendasRaw ?? []) as Pick<DbAgenda, 'id' | 'title'>[]).map(a => [a.id, a.title])
  )

  return articles.map(article => {
    const title = agendaMap.get(article.agenda_id) ?? ''
    const peers = articles.filter(a => a.agenda_id === article.agenda_id)
    const relatedSlug =
      article.perspective === 'progressive'
        ? peers.find(a => a.perspective === 'conservative')?.slug
        : article.perspective === 'conservative'
          ? peers.find(a => a.perspective === 'progressive')?.slug
          : undefined
    return toArticle(article, title, relatedSlug)
  })
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data: articleRaw } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  const article = articleRaw as DbArticle | null
  if (!article) return null

  const [{ data: agendaRaw }, { data: peersRaw }] = await Promise.all([
    supabase.from('agendas').select('title').eq('id', article.agenda_id).maybeSingle(),
    supabase
      .from('articles')
      .select('slug, perspective')
      .eq('agenda_id', article.agenda_id)
      .eq('status', 'published'),
  ])

  const peers = (peersRaw ?? []) as Pick<DbArticle, 'slug' | 'perspective'>[]
  const agendaTitle = (agendaRaw as Pick<DbAgenda, 'title'> | null)?.title ?? ''

  const relatedSlug =
    article.perspective === 'progressive'
      ? peers.find(a => a.perspective === 'conservative')?.slug
      : article.perspective === 'conservative'
        ? peers.find(a => a.perspective === 'progressive')?.slug
        : undefined

  return toArticle(article, agendaTitle, relatedSlug)
}

export async function getPublishedArticleSlugs(): Promise<string[]> {
  const { data } = await supabase.from('articles').select('slug').eq('status', 'published')
  return ((data ?? []) as Pick<DbArticle, 'slug'>[]).map(a => a.slug)
}
