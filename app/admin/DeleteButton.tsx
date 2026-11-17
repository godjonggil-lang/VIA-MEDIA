'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deletePost } from './actions'

export default function DeleteButton({ postId, label }: { postId: string; label: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()

  return (
    <button
      type="button"
      disabled={pending}
      className="text-red-700 hover:underline underline-offset-4 disabled:opacity-50"
      onClick={() => {
        if (!confirm(`${label}을 삭제할까요?\n삭제하면 되돌릴 수 없습니다.`)) return
        start(async () => {
          const res = await deletePost(postId)
          if (!res.ok) alert(res.error)
          router.replace('/admin')
          router.refresh()
        })
      }}
    >
      {pending ? '삭제 중…' : '삭제'}
    </button>
  )
}
