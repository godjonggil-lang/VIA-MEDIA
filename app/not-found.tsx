import Link from 'next/link'
import SiteHeader, { SiteFooter } from '@/components/SiteHeader'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-20 text-center">
        <p className="text-lg font-bold">페이지를 찾을 수 없습니다</p>
        <Link href="/" className="mt-4 inline-block text-point-dark underline underline-offset-4">
          이번 주 카드뉴스로 가기
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
