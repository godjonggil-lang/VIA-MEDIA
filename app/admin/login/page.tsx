import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/session'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: '관리자 로그인', robots: { index: false } }

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin')
  return (
    <main className="mx-auto w-full max-w-sm px-4 py-20">
      <h1 className="text-xl font-bold">관리자 로그인</h1>
      <LoginForm />
    </main>
  )
}
