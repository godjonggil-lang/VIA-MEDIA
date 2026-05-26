'use client'

import { useRef } from 'react'
import { deleteAgenda } from '@/lib/admin-actions'

export default function DeleteAgendaButton({
  agendaId,
  agendaTitle,
}: {
  agendaId: string
  agendaTitle: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`"${agendaTitle}" 아젠다와 관련 기사를 모두 삭제할까요?\n이 작업은 되돌릴 수 없습니다.`)) {
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form ref={formRef} action={deleteAgenda}>
      <input type="hidden" name="id" value={agendaId} />
      <button
        type="button"
        onClick={handleClick}
        className="font-sans text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1"
      >
        삭제
      </button>
    </form>
  )
}
