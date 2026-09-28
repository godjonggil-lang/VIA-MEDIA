'use client'

import { useActionState } from 'react'
import { login } from '../actions'

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null)
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block">
        <span className="text-sm font-medium">비밀번호</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1 block w-full rounded-md border border-navy/20 px-3 py-2.5 text-base outline-none focus:border-point focus:ring-2 focus:ring-point/30"
        />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-md bg-navy py-2.5 font-semibold text-white hover:bg-navy/90 disabled:opacity-60"
      >
        {pending ? '확인 중…' : '로그인'}
      </button>
    </form>
  )
}
