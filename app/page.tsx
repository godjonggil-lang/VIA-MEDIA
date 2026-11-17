import type { Metadata } from 'next'
import { getRecentPosts } from '@/lib/db'
import PostsPage, { postsMetadata } from '@/components/PostsPage'

// 정적 생성 + 10분 주기 재검증. 발행 시에는 즉시 갱신된다 (revalidatePath / /api/revalidate)
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  return postsMetadata(await getRecentPosts())
}

export default async function Home() {
  return (
    <PostsPage
      posts={await getRecentPosts()}
      subtitle="인스타그램 카드뉴스 원문 · 최근 7일"
      active="home"
      markNewest
      emptyText="카드뉴스를 준비 중입니다"
    />
  )
}
