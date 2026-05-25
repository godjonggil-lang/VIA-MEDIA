'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useWaitlist } from '@/context/WaitlistContext'

export default function WaitlistModal() {
  const { isOpen, options, closeModal } = useWaitlist()
  const [email, setEmail] = useState('')
  const [notifyLaunch, setNotifyLaunch] = useState(true)
  const [notifyArticles, setNotifyArticles] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      setError('')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreePrivacy) {
      setError('개인정보처리방침에 동의해주세요.')
      return
    }
    if (!email) {
      setError('이메일을 입력해주세요.')
      return
    }
    const entry = {
      email,
      notifyLaunch,
      notifyArticles,
      articleSlug: options.articleSlug,
      amount: options.amount,
      type: options.type,
      plan: options.plan,
      timestamp: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('via-media-waitlist') || '[]')
    existing.push(entry)
    localStorage.setItem('via-media-waitlist', JSON.stringify(existing))
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
    >
      <div className="bg-white w-full max-w-md p-8 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl leading-none"
          aria-label="닫기"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 border-2 border-[#B22222] mx-auto mb-4 flex items-center justify-center">
              <span className="text-[#B22222] text-xl">✓</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">등록되었습니다</h3>
            <p className="font-sans text-sm text-gray-600">
              런칭 시 가장 먼저 알려드리겠습니다.
              <br />
              독립 저널리즘을 응원해주셔서 감사합니다.
            </p>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-gray-900 text-white font-sans text-sm py-3 hover:bg-[#B22222] transition-colors"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-serif font-bold text-xl text-gray-900 mb-1">
              서비스 준비 중입니다
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-6">
              결제 시스템을 준비 중입니다. 이메일을 남겨주시면 런칭 시 알려드리겠습니다.
            </p>

            {options.amount && (
              <div className="bg-gray-50 border border-gray-200 p-3 mb-5 text-sm font-sans text-gray-700">
                선택하신 금액:{' '}
                <strong className="text-[#B22222]">₩{options.amount.toLocaleString()}</strong>
                {options.plan && <span className="ml-2 text-gray-500">({options.plan})</span>}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyLaunch}
                    onChange={(e) => setNotifyLaunch(e.target.checked)}
                    className="accent-[#B22222]"
                  />
                  <span className="font-sans text-sm text-gray-700">런칭 알림 받기</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyArticles}
                    onChange={(e) => setNotifyArticles(e.target.checked)}
                    className="accent-[#B22222]"
                  />
                  <span className="font-sans text-sm text-gray-700">관련 후속 기사 알림 받기</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="accent-[#B22222]"
                    required
                  />
                  <span className="font-sans text-sm text-gray-700">
                    <Link href="/privacy" className="underline hover:text-[#B22222]" onClick={closeModal}>
                      개인정보처리방침
                    </Link>
                    에 동의합니다 <span className="text-[#B22222]">*</span>
                  </span>
                </label>
              </div>

              {error && (
                <p className="font-sans text-sm text-[#B22222]">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-sans text-sm py-3 hover:bg-[#B22222] transition-colors"
              >
                등록하기
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
