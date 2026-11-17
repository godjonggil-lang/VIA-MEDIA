'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, DOMAIN_ERROR, parseAllowedUrl, type Category } from '@/lib/config'
import { dateLabel, isValidDate } from '@/lib/week'
import SiteHeader from '@/components/SiteHeader'
import PostList from '@/components/PostList'
import { savePost } from './actions'

export type EditorInitial = {
  postId: string | null
  date: string
  topic: string
  items: { category: Category; url: string; title: string; imageUrl: string }[]
}

type Slot = {
  id: number
  category: Category
  url: string
  title: string
  imageUrl: string
  status: 'idle' | 'loading' | 'error' | 'done'
  message?: string
  fetchedUrl?: string
}

const MAX_ITEMS = 10
let nextId = 1
const emptySlot = (): Slot => ({ id: nextId++, category: 'news', url: '', title: '', imageUrl: '', status: 'idle' })

const proxied = (src: string) => (parseAllowedUrl(src) ? `/api/image?src=${encodeURIComponent(src)}` : null)

export default function Editor({ initial }: { initial: EditorInitial }) {
  const router = useRouter()
  const isEdit = initial.postId !== null
  const [date, setDate] = useState(initial.date)
  const [topic, setTopic] = useState(initial.topic)
  const [slots, setSlots] = useState<Slot[]>(() =>
    initial.items.length > 0
      ? initial.items.map((i) => ({ ...emptySlot(), ...i, fetchedUrl: i.url }))
      : [emptySlot()],
  )
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({})

  useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach(clearTimeout)
  }, [])

  const update = (id: number, patch: Partial<Slot>) =>
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  async function fetchMeta(id: number, url: string) {
    update(id, { status: 'loading', message: undefined })
    try {
      const res = await fetch('/api/fetch-meta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) {
        update(id, { status: 'error', message: data.error ?? '가져오기 실패', fetchedUrl: url })
        return
      }
      update(id, {
        status: 'done',
        title: data.title ?? '',
        imageUrl: data.image ?? '',
        category: data.category ?? 'news',
        message: data.imageWarning ?? (data.image ? undefined : '대표 이미지를 찾지 못했습니다. 이미지 주소를 직접 넣어 주세요.'),
        fetchedUrl: url,
      })
    } catch {
      update(id, { status: 'error', message: '네트워크 오류로 가져오지 못했습니다', fetchedUrl: url })
    }
  }

  function onUrlChange(slot: Slot, value: string) {
    clearTimeout(timers.current[slot.id])
    const url = value.trim()
    if (!url) return update(slot.id, { url: value, status: 'idle', message: undefined })
    if (!parseAllowedUrl(url)) return update(slot.id, { url: value, status: 'error', message: DOMAIN_ERROR })
    update(slot.id, { url: value, status: 'idle', message: undefined })
    if (url !== slot.fetchedUrl) {
      timers.current[slot.id] = setTimeout(() => fetchMeta(slot.id, url), 500)
    }
  }

  function move(index: number, dir: -1 | 1) {
    setSlots((prev) => {
      const next = [...prev]
      const j = index + dir
      if (j < 0 || j >= next.length) return prev
      ;[next[index], next[j]] = [next[j], next[index]]
      return next
    })
  }

  const slotErrors = slots.map((s) => {
    if (!s.url.trim()) return '주소 없음'
    if (!parseAllowedUrl(s.url)) return DOMAIN_ERROR
    if (!s.title.trim()) return '제목 없음'
    if (s.imageUrl.trim() && !parseAllowedUrl(s.imageUrl)) return '이미지 주소가 허용 도메인이 아님'
    return null
  })
  const filled = slots.filter((s) => s.url.trim() && s.title.trim()).length
  const ready = isValidDate(date) && slotErrors.every((e) => e === null)
  const loading = slots.some((s) => s.status === 'loading')

  function submit() {
    setError(null)
    startTransition(async () => {
      const res = await savePost({
        postId: initial.postId,
        date,
        topic,
        items: slots.map((s) => ({ category: s.category, url: s.url.trim(), title: s.title, imageUrl: s.imageUrl })),
      })
      if (!res.ok) return setError(res.error)
      router.replace(`/admin?edit=${res.postId}&saved=1`)
      router.refresh()
    })
  }

  return (
    <section aria-labelledby="editor-title" className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 id="editor-title" className="text-xl font-bold">
          {isEdit ? `${dateLabel(initial.date)} 게시물 수정` : '새 게시물'}
        </h1>
        {isEdit && (
          <a href="/admin" className="text-sm text-point-dark underline underline-offset-4">
            + 새 게시물로
          </a>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-[12rem_1fr]">
        <label className="block">
          <span className="text-sm font-medium">날짜</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">머리글 <span className="font-normal text-body-dark">(선택 · 비우면 표시 안 함)</span></span>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} className="field mt-1" />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-2 font-bold">기사 ({slots.length}건)</legend>
        {slots.map((slot, i) => (
          <SlotEditor
            key={slot.id}
            n={i + 1}
            slot={slot}
            canRemove={slots.length > 1}
            onUrl={(v) => onUrlChange(slot, v)}
            onChange={(patch) => update(slot.id, patch)}
            onRefetch={() => fetchMeta(slot.id, slot.url.trim())}
            onRemove={() => setSlots((prev) => prev.filter((s) => s.id !== slot.id))}
            onMove={(dir) => move(i, dir)}
            first={i === 0}
            last={i === slots.length - 1}
          />
        ))}
        {slots.length < MAX_ITEMS && (
          <button
            type="button"
            onClick={() => setSlots((prev) => [...prev, emptySlot()])}
            className="w-full rounded-lg border-2 border-dashed border-navy/20 py-2.5 text-sm font-semibold text-point-dark hover:border-point"
          >
            + 기사 추가
          </button>
        )}
      </fieldset>

      <div className="space-y-2">
        <h2 className="font-bold">미리보기</h2>
        <div className="overflow-hidden rounded-lg border-2 border-dashed border-navy/20">
          <SiteHeader subtitle="인스타그램 카드뉴스 원문 · 최근 7일" />
          <div className="p-4">
            {filled > 0 && isValidDate(date) ? (
              <PostList
                markNewest
                posts={[
                  {
                    key: 'preview',
                    date,
                    topic: topic.trim() || null,
                    items: slots
                      .filter((s) => s.title.trim())
                      .map((s) => ({ category: s.category, title: s.title, url: s.url, image: proxied(s.imageUrl) })),
                  },
                ]}
              />
            ) : (
              <p className="py-8 text-center text-sm text-body-dark">기사 주소를 넣으면 여기에 보입니다.</p>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 border-t border-navy/10 bg-white/95 px-4 py-3 backdrop-blur">
        {error && <p role="alert" className="mb-2 text-sm text-red-700">{error}</p>}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-body-dark">
            {ready ? (isEdit ? '저장할 수 있습니다' : '발행하면 메인 맨 위에 걸립니다') : '기사 주소와 제목을 채워 주세요'}
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
  canRemove,
  first,
  last,
  onUrl,
  onChange,
  onRefetch,
  onRemove,
  onMove,
}: {
  n: number
  slot: Slot
  canRemove: boolean
  first: boolean
  last: boolean
  onUrl: (v: string) => void
  onChange: (patch: Partial<Slot>) => void
  onRefetch: () => void
  onRemove: () => void
  onMove: (dir: -1 | 1) => void
}) {
  const img = proxied(slot.imageUrl)
  const small = 'rounded px-2 py-1 text-xs text-body-dark hover:bg-navy/5 disabled:opacity-30'
  return (
    <div className="rounded-lg border border-navy/10 p-3 space-y-2">
      <div className="flex gap-3">
        <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded bg-navy/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {img && <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{n}. 기사 주소</span>
            <span className="flex items-center">
              <button type="button" className={small} disabled={first} onClick={() => onMove(-1)} aria-label="위로">↑</button>
              <button type="button" className={small} disabled={last} onClick={() => onMove(1)} aria-label="아래로">↓</button>
              {canRemove && (
                <button type="button" className={`${small} text-red-700`} onClick={onRemove}>삭제</button>
              )}
            </span>
          </div>
          <input
            type="url"
            inputMode="url"
            value={slot.url}
            onChange={(e) => onUrl(e.target.value)}
            placeholder="https://www.defensetoday.kr/news/articleView.html?idxno=…"
            className="field mt-1"
            aria-label={`${n}번 기사 주소`}
          />
        </div>
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
      <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
        <label className="block">
          <span className="text-xs text-body-dark">분류</span>
          <select
            value={slot.category}
            onChange={(e) => onChange({ category: e.target.value as Category })}
            className="field"
          >
            {(Object.keys(CATEGORIES) as Category[]).map((c) => (
              <option key={c} value={c}>{CATEGORIES[c].label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-body-dark">제목</span>
          <input value={slot.title} onChange={(e) => onChange({ title: e.target.value })} className="field" />
        </label>
      </div>
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
