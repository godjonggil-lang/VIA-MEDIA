import type { Metadata } from 'next'
import Link from 'next/link'
import type { Post } from '@/lib/db'
import { proxiedImage } from '@/lib/db'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/config'
import SiteHeader, { SiteFooter, type Tab } from './SiteHeader'
import PostList, { type ViewPost } from './PostList'

export function toViewPosts(posts: Post[]): ViewPost[] {
  return posts.map((p) => ({
    key: p.id,
    date: p.post_date,
    topic: p.topic,
    items: p.items.map((i) => ({ category: i.category, title: i.title, url: i.url, image: proxiedImage(i.image_url) })),
  }))
}

export function postsMetadata(posts: Post[], title?: string, description = SITE_DESCRIPTION): Metadata {
  const first = posts.flatMap((p) => p.items).find((i) => i.image_url)
  const image = first ? proxiedImage(first.image_url) : null
  return {
    ...(title ? { title } : {}),
    description,
    openGraph: {
      title: title ? `${title} · ${SITE_NAME}` : SITE_NAME,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  }
}

type Props = {
  posts: Post[]
  subtitle?: string
  active: Tab
  markNewest?: boolean
  emptyText: string
}

export default function PostsPage({ posts, subtitle, active, markNewest, emptyText }: Props) {
  return (
    <>
      <SiteHeader subtitle={subtitle} active={active} />
      <main className="mx-auto w-full max-w-5xl px-4 py-3 sm:py-8">
        {posts.length > 0 ? (
          <PostList posts={toViewPosts(posts)} markNewest={markNewest} />
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg font-bold">{emptyText}</p>
            <Link
              href="/monthly"
              className="mt-4 inline-block rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              월간 리포트 보기
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
