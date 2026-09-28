'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { DOMAIN_ERROR, parseAllowedUrl, SECTIONS, type Section } from '@/lib/config'
import { parseWeekId } from '@/lib/week'
import SiteHeader, { weekSubtitle } from '@/components/SiteHeader'
import WeekView from '@/components/WeekView'
import { publishWeek } from './actions'

export type EditorInitial = {
  originalWeekId: string | null
  weekId: string
  rangeLabel: string
  items: { section: Section; url: string; title: string; imageUrl: string }[]
}

type Slot = {
  section: Section
  url: string
  title: string
  imageUrl: string
  status: 'idle' | 'loading' | 'error' | 'done'
  message?: string
  fetchedUrl?: string
}

function initialSlots(items: EditorInitial['items']): Slot[] {
  return SECTIONS.flatMap((s) => {
    const list = items.filter((i) => i.section === s.key)
    return [0, 1, 2].map((n) => ({
      section: s.key,
      url: list[n]?.url ?? '',
      title: list[n]?.title ?? '',
      imageUrl: list[n]?.imageUrl ?? '',
      status: 'idle' as const,
      fetchedUrl: list[n]?.url,
    }))
  })
}

const proxied = (src: string) => (parseAllowedUrl(src) ? `/api/image?src=${encodeURIComponent(src)}` : null)

export default function Editor({ initial }: { initial: EditorInitial }) {
  const router = useRouter()
  const isEdit = initial.originalWeekId !== null
  const [weekId, setWeekId] = useState(initial.weekId)
  const [rangeLabel, setRangeLabel] = useState(initial.rangeLabel)
  const [slots, setSlots] = useState<Slot[]>(() => initialSlots(initial.items))
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({})

  useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach(clearTimeout)
  }, [])

  const weekInfo = parseWeekId(weekId)
  const update = (i: number, patch: Partial<Slot>) =>
    setSlots((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)))

  async function fetchMeta(i: number, url: string) {
    update(i, { status: 'loading', message: undefined })
    try {
      const res = await fetch('/api/fetch-meta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) {
        update(i, { status: 'error', message: data.error ?? '가져오기 실패', fetchedUrl: url })
        return
      }
      update(i, {
        status: 'done',
        title: data.title ?? '',
        imageUrl: data.image ?? '',
        message: data.imageWarning ?? (data.image ? undefined : '대표 이미지를 찾지 못했습니다. 이미지 주소를 직접 넣어 주세요.'),
        fetchedUrl: url,
      })
    } catch {
      update(i, { status: 'error', message: '네트워크 오류로 가져오지 못했습니다', fetchedUrl: url })
    }
  }

  function onUrlChange(i: number, value: string) {
    clearTimeout(timers.current[i])
    const url = value.trim()
    if (!url) return update(i, { url: value, status: 'idle', message: undefined })
    if (!parseAllowedUrl(url)) return update(i, { url: value, status: 'error', message: DOMAIN_ERROR })
    update(i, { url: value, status: 'idle', message: undefined })
    if (url !== slots[i].fetchedUrl) {
      timers.current[i] = setTimeout(() => fetchMeta(i, url), 500)
    }
  }

  function onWeekIdChange(value: string) {
    setWeekId(value)
    const info = parseWeekId(value)
    if (info) setRangeLabel(info.rangeLabel)
  }

  const slotErrors = slots.map((s) => {
    if (!s.url.trim()) return '주소 없음'
    if (!parseAllowedUrl(s.url)) return DOMAIN_ERROR
    if (!s.title.trim()) return '제목 없음'
    if (s.imageUrl.trim() && !parseAllowedUrl(s.imageUrl)) return '이미지 주소가 허용 도메인이 아님'
    return null
  })
  const filled = slots.filter((s) => s.url.trim() && s.title.trim()).length
  const ready = weekInfo && rangeLabel.trim() && slotErrors.every((e) => e === null)
  const loading = slots.some((s) => s.status === 'loading')

  function submit() {
    setError(null)
    startTransition(async () => {
      const res = await publishWeek({
        originalWeekId: initial.originalWeekId,
        weekId: weekId.trim(),
        rangeLabel,
        items: slots.map((s) => ({ section: s.section, url: s.url.trim(), title: s.title, imageUrl: s.imageUrl })),
      })
      if (!res.ok) return setError(res.error)
      router.replace(`/admin?edit=${res.weekId}&saved=1`)
      router.refresh()
    })
  }

  return (
    <section aria-labelledby="editor-title" className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 id="editor-title" className="text-xl font-bold">
          {isEdit ? `${initial.originalWeekId} 수정` : '새 주차 발행'}
        </h1>
        {isEdit && (
          <a href="/admin" className="text-sm text-point-dark underline underline-offset-4">
            + 새 주차 발행으로
          </a>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">주차 ID</span>
          <input
            value={weekId}
            onChange={(e) => onWeekIdChange(e.target.value)}
            placeholder="2026-W39"
            className="field mt-1"
          />
          {!weekInfo && <span className="mt-1 block text-sm text-red-700">형식: 2026-W39</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium">기간 표기</span>
          <input value={rangeLabel} onChange={(e) => setRangeLabel(e.target.value)} className="field mt-1" />
        </label>
      </div>

      {SECTIONS.map((s) => (
        <fieldset key={s.key} className="space-y-3">
          <legend className="mb-2">
            <span className={`${s.accent} px-1.5 font-bold`}>{s.label}</span>
          </legend>
          {slots.map((slot, i) =>
            slot.section !== s.key ? null : (
              <SlotEditor
                key={i}
                n={slots.slice(0, i + 1).filter((x) => x.section === s.key).length}
                slot={slot}
                onUrl={(v) => onUrlChange(i, v)}
                onChange={(patch) => update(i, patch)}
                onRefetch={() => fetchMeta(i, slot.url.trim())}
              />
            ),
          )}
        </fieldset>
      ))}

      <div className="space-y-2">
        <h2 className="font-bold">미리보기 <span className="text-sm font-normal text-body-dark">({filled}/6)</span></h2>
        <div className="overflow-hidden rounded-lg border-2 border-dashed border-navy/20">
          <SiteHeader subtitle={weekInfo ? weekSubtitle(rangeLabel, weekInfo.weekNo) : rangeLabel} />
          <div className="p-4">
            <WeekView
              items={slots
                .filter((s) => s.title.trim())
                .map((s) => ({ section: s.section, title: s.title, url: s.url, image: proxied(s.imageUrl) }))}
            />
            {filled === 0 && <p className="py-8 text-center text-sm text-body-dark">기사 주소를 넣으면 여기에 보입니다.</p>}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 border-t border-navy/10 bg-white/95 px-4 py-3 backdrop-blur">
        {error && <p role="alert" className="mb-2 text-sm text-red-700">{error}</p>}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-body-dark">
            {ready ? (isEdit ? '저장할 수 있습니다' : '발행하면 이 주차가 메인에 걸립니다') : `6건을 모두 채워 주세요 (${filled}/6)`}
          </p>
          <button
            type="button"
            onClick={submit}
            disabled={!ready || pending || loading}
            className="shrink-0 rounded-md bg-navy px-5 py-2.5 font-semibold text-white hover:bg-navy/90 disabled:opacity-40"
          >
            {pending ? '저장 중…' : isEdit ? '수정 저장' : '발행'}
          </button>
        </div>
      </div>
    </section>
  )
}

function SlotEditor({
  n,
  slot,
  onUrl,
  onChange,
  onRefetch,
}: {
  n: number
  slot: Slot
  onUrl: (v: string) => void
  onChange: (patch: Partial<Slot>) => void
  onRefetch: () => void
}) {
  const img = proxied(slot.imageUrl)
  return (
    <div className="rounded-lg border border-navy/10 p-3 space-y-2">
      <div className="flex gap-3">
        <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded bg-navy/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {img && <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        </div>
        <label className="block flex-1 min-w-0">
          <span className="text-sm font-medium">{n}. 기사 주소</span>
          <input
            type="url"
            inputMode="url"
            value={slot.url}
            onChange={(e) => onUrl(e.target.value)}
            placeholder="https://www.defensetoday.kr/news/articleView.html?idxno=…"
            className="field mt-1"
          />
        </label>
      </div>
      {slot.status === 'loading' && <p className="text-sm text-body-dark">제목·사진 가져오는 중…</p>}
      {slot.message && (
        <p className={`text-sm ${slot.status === 'error' ? 'text-red-700' : 'text-amber-800'}`}>
          {slot.message}
          {slot.status === 'error' && slot.message !== DOMAIN_ERROR && (
            <button type="button" onClick={onRefetch} className="ml-2 underline">다시 시도</button>
          )}
        </p>
      )}
      <label className="block">
        <span className="text-xs text-body-dark">제목</span>
        <input value={slot.title} onChange={(e) => onChange({ title: e.target.value })} className="field" />
      </label>
      <label className="block">
        <span className="text-xs text-body-dark">이미지 주소</span>
        <input
          type="url"
          value={slot.imageUrl}
          onChange={(e) => onChange({ imageUrl: e.target.value })}
          placeholder="https://cdn.defensetoday.kr/…"
          className="field text-sm"
        />
      </label>
    </div>
  )
}
