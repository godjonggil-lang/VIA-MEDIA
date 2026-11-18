import Link from 'next/link'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'

export default function NotFound() {
  return (
    <>
      <SiteHeader active="home" />
      <main className="mx-auto w-full max-w-5xl px-4 py-20 text-center">
        <p className="text-lg font-bold">페이지를 찾을 수 없습니다</p>
        <p className="text-sm text-body-dark">Page not found</p>
        <Link href="/" className="mt-4 inline-block text-point-dark underline underline-offset-4">
          최신 카드뉴스로 가기 · Go to latest
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
