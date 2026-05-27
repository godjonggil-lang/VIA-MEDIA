'use client'

import { useState, useEffect } from 'react'

export default function ShareButtons({
  title,
  slug,
}: {
  title: string
  slug: string
}) {
  const [copied, setCopied] = useState(false)
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    setPageUrl(`${window.location.origin}/article/${slug}`)
  }, [slug])

  const shareText = `${title} ??진보?� 보수???�각?�로 ?�기 | VIA MEDIA News`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl || `/article/${slug}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">공유</span>

      <a
        href={twitterUrl}
        suppressHydrationWarning
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-xs border border-gray-300 px-3 py-1.5 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
      >
        X (?�위??
      </a>

      <button
        onClick={() => alert('카카??공유???�칭 ??지???�정?�니??')}
        className="font-sans text-xs border border-gray-300 px-3 py-1.5 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
      >
        카카??      </button>

      <button
        onClick={handleCopy}
        className="font-sans text-xs border border-gray-300 px-3 py-1.5 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
      >
        {copied ? '복사???? : '링크 복사'}
      </button>
    </div>
  )
}
