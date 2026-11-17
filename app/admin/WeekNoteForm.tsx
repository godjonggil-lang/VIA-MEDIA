'use client'

import { useState, useTransition } from 'react'
import { saveWeekNote } from './actions'

type Props = {
  weeks: { weekId: string; label: string }[] // 최신 주 먼저
  notes: Record<string, string>
}

// 주간 리포트 표지에 들어가는 2~3줄 요약 (선택)
export default function WeekNoteForm({ weeks, notes }: Props) {
  const [weekId, setWeekId] = useState(weeks[0]?.weekId ?? '')
  const [saved, setSaved] = useState(notes)
  const [text, setText] = useState(notes[weekId] ?? '')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, start] = useTransition()

  return (
    <section aria-labelledby="week-note" className="space-y-3">
      <div>
        <h2 id="week-note" className="text-lg font-bold">주간 리포트 에디터 노트 <span className="text-sm font-normal text-body-dark">(선택)</span></h2>
        <p className="text-sm text-body-dark">리포트 표지에 들어가는 2~3줄 요약입니다. 비워 두면 표시하지 않습니다.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={weekId}
          onChange={(e) => {
            setWeekId(e.target.value)
            setText(saved[e.target.value] ?? '')
            setMsg(null)
          }}
          className="field w-auto"
          aria-label="주차"
        >
          {weeks.map((w) => (
            <option key={w.weekId} value={w.weekId}>{w.label}</option>
          ))}
        </select>
        <a href={`/report/${weekId}`} target="_blank" className="text-sm text-point-dark underline underline-offset-4">
          리포트 보기
        </a>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        maxLength={600}
        placeholder="예) 이번 주는 원자력 잠수함 사업 의결과 미 국방 대형 계약이 이어졌습니다."
        className="field resize-y"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={pending || (saved[weekId] ?? '') === text.trim()}
          onClick={() =>
            start(async () => {
              const res = await saveWeekNote(weekId, text)
              if (res.ok) {
                setSaved((s) => ({ ...s, [weekId]: text.trim() }))
                setMsg({ ok: true, text: text.trim() ? '저장했습니다' : '노트를 지웠습니다' })
              } else setMsg({ ok: false, text: res.error })
            })
          }
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 disabled:opacity-40"
        >
          {pending ? '저장 중…' : '노트 저장'}
        </button>
        {msg && <p role="status" className={`text-sm ${msg.ok ? 'text-body-dark' : 'text-red-700'}`}>{msg.text}</p>}
      </div>
    </section>
  )
}
