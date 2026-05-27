export type Category = '?•ì¹˜' | 'ê²½ì œ' | '?¬íšŒ' | 'êµ? œ'
export type Perspective = 'progressive' | 'conservative' | 'analysis'
export type Author = 'publisher' | 'editor'
export type AgendaStatus = 'draft' | 'published'
export type ArticleStatus = 'draft' | 'published'

export interface DbAgenda {
  id: string
  title: string
  category: Category
  description: string | null
  status: AgendaStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface DbArticle {
  id: string
  agenda_id: string
  slug: string
  title: string
  summary: string | null
  content: string | null
  perspective: Perspective
  author: Author
  status: ArticleStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      agendas: {
        Row: DbAgenda
        Insert: Omit<DbAgenda, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DbAgenda, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      articles: {
        Row: DbArticle
        Insert: Omit<DbArticle, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DbArticle, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
