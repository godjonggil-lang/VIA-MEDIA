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
    if (confirm(`"${agendaTitle}" ?„ì  ?¤ì? ê´€??ê¸°ì‚¬ë¥?ëª¨ë‘ ?? œ? ê¹Œ??\n???‘ì—…?€ ?˜ëŒë¦????†ìŠµ?ˆë‹¤.`)) {
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
        ?? œ
      </button>
    </form>
  )
}
