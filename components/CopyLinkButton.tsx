'use client'

import { useState } from 'react'

// 리포트 고정 주소 복사. 인앱 브라우저처럼 클립보드가 막히면 주소를 보여줘 직접 복사하게 한다.
export default function CopyLinkButton({ path }: { path: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'manual'>('idle')
  const url = typeof window === 'undefined' ? path : new URL(path, window.location.origin).toString()

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setState('done')
    } catch {
      // 구형·인앱 브라우저 대비
      const ta = document.createElement('textarea')
      ta.value = url
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      setState(ok ? 'done' : 'manual')
    }
    setTimeout(() => setState((s) => (s === 'done' ? 'idle' : s)), 2000)
  }

  return (
    <span className="inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1 rounded-md border border-white/40 px-2.5 py-1.5 text-[13px] sm:text-sm font-semibold text-white hover:bg-white/10"
      >
        {state === 'done' ? '복사됨 Copied' : 'URL 복사 Copy link'}
      </button>
      {state === 'manual' && (
        <input
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          autoFocus
          aria-label="리포트 주소"
          className="w-full min-w-0 rounded border border-white/30 bg-white/10 px-2 py-1 text-xs text-white"
        />
      )}
    </span>
  )
}
