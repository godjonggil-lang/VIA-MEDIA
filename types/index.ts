export type Perspective = 'progressive' | 'conservative' | 'analysis'
export type Author = 'publisher' | 'editor'
export type Category = '정치' | '경제' | '사회' | '국제'

export type Article = {
  slug: string
  title: string
  summary: string
  content: string
  agenda: string
  agendaId: string
  perspective: Perspective
  author: Author
  publishedAt: string
  relatedSlug?: string
}

export type Agenda = {
  id: string
  title: string
  category: Category
  description: string
  publishedAt: string
  articleCount: {
    progressive: number
    conservative: number
    analysis: number
  }
}
