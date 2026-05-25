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
      router.push('/admin/login')
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
              VIA MEDIA
            </span>
            <p className="font-sans text-xs text-gray-500 mt-2 leading-relaxed">
              진보와 보수의 시각을 건조하게 기록합니다.
              <br />
              이해가 먼저, 입장은 그 다음입니다.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-sans text-xs font-semibold text-gray-800 tracking-widest uppercase mb-3">
              페이지
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/agenda', label: '아젠다' },
                { href: '/subscribe', label: '구독·후원' },
                { href: '/about', label: '소개' },
                { href: '/privacy', label: '개인정보처리방침' },
                { href: '/terms', label: '이용약관' },
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
              발행 정보
            </h4>
            <dl className="font-sans text-xs text-gray-500 space-y-1.5 leading-relaxed">
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">발행인</dt>
                <dd>{siteConfig.publisher.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">편집인</dt>
                <dd>{siteConfig.editor.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">청소년보호책임자</dt>
                <dd>
                  {siteConfig.editor.name} / {siteConfig.contact.email}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">사업자등록번호</dt>
                <dd>{siteConfig.registration.business}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400 shrink-0">등록번호</dt>
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
            <span onClick={handleSecretClick} className="cursor-default select-none">©</span> {new Date().getFullYear()} VIA MEDIA. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>무단 전재·재배포 금지.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="font-sans text-xs text-gray-400 hover:text-[#B22222] transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-gray-400 hover:text-[#B22222] transition-colors"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
