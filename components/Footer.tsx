'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { siteConfig } from '@/lib/data'

export default function Footer() {
  const router = useRouter()
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSecretClick() {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    if (clickCount.current >= 5) {
      clickCount.current = 0
      window.location.href = '/admin/login'
    } else {
      clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 2000)
    }
  }
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <span className="font-serif font-black text-xl tracking-widest text-gray-900">
              VIA MEDIA <span className="text-[#B22222]">News</span>
            </span>
            <p className="font-sans text-xs text-gray-500 mt-2 leading-relaxed">
              진보?� 보수???�각??건조?�게 기록?�니??
              <br />
              ?�해가 먼�?, ?�장?� �??�음?�니??
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-sans text-xs font-semibold text-gray-800 tracking-widest uppercase mb-3">
              ?�이지
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/agenda', label: '?�젠?? },
                { href: '/subscribe', label: '구독·?�원' },
                { href: '/about', label: '?�개' },
                { href: '/privacy', label: '개인?�보처리방침' },
                { href: '/terms', label: '?�용?��?' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs text-gray-500 hover:text-[#B22222] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal info */}
          <div>
            <h4 className="font-sans text-xs font-semibold text-gray-800 tracking-widest uppercase mb-3">
              발행 ?�보
            </h4>
            <dl className="font-sans text-xs text-gray-500 space-y-1.5 leading-relaxed">
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">발행??/dt>
                <dd>{siteConfig.publisher.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">?�집??/dt>
                <dd>{siteConfig.editor.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">�?��?�보?�책?�자</dt>
                <dd>
                  {siteConfig.editor.name} / {siteConfig.contact.email}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">?�업?�등록번??/dt>
                <dd>{siteConfig.registration.business}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">?�록번호</dt>
                <dd>{siteConfig.registration.media}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">문의</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-[#B22222] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-xs text-gray-400">
            <span onClick={handleSecretClick} className="cursor-default select-none">©</span> {new Date().getFullYear()} VIA MEDIA News. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>무단 ?�재·?�배??금�?.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="font-sans text-xs text-gray-400 hover:text-[#B22222] transition-colors"
            >
              개인?�보처리방침
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-gray-400 hover:text-[#B22222] transition-colors"
            >
              ?�용?��?
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
