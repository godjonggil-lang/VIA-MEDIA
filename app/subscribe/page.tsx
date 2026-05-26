'use client'

import { useState } from 'react'
import { useWaitlist } from '@/context/WaitlistContext'

const ONE_TIME_AMOUNTS = [3000, 5000, 10000]
const RECURRING_AMOUNTS = [3000, 5000, 10000]

const PREMIUM_FEATURES = [
  {
    title: '주간 심층 분석 보고서',
    desc: '그 주의 핵심 아젠다를 진보·보수 시각으로 분석한 리포트를 매주 발송합니다.',
  },
  {
    title: '이주의 기사 정리',
    desc: 'VIA MEDIA가 이번 주 다룬 모든 기사를 한눈에 볼 수 있는 요약본을 함께 제공합니다.',
  },
  {
    title: '아카이브 무제한 열람',
    desc: '발행된 모든 아젠다·기사를 시기별로 자유롭게 탐색할 수 있습니다.',
  },
  {
    title: '광고 없는 독립 저널리즘 지지',
    desc: '구독료는 100% 콘텐츠 제작에 사용됩니다.',
  },
]

export default function SubscribePage() {
  const { openModal } = useWaitlist()
  const [isYearly, setIsYearly] = useState(false)
  const [oneTimeAmount, setOneTimeAmount] = useState<number | 'custom'>(5000)
  const [oneTimeCustom, setOneTimeCustom] = useState('')
  const [recurringAmount, setRecurringAmount] = useState<number>(5000)

  const monthlyPrice = 9900
  const yearlyPrice = 99000 // 2달 무료

  const price = isYearly ? yearlyPrice : monthlyPrice

  const handleSubscribe = () => {
    openModal({
      amount: price,
      type: 'subscription',
      plan: `프리미엄 ${isYearly ? '연간' : '월간'}`,
    })
  }

  const handleOneTime = () => {
    const amount =
      oneTimeAmount === 'custom'
        ? parseInt(oneTimeCustom.replace(/[^0-9]/g, ''), 10) || 0
        : oneTimeAmount
    openModal({ amount, type: 'donation' })
  }

  const handleRecurring = () => {
    openModal({ amount: recurringAmount, type: 'recurring' })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">

      {/* 헤더 */}
      <div className="text-center mb-16">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">구독 & 후원</h1>
        <p className="font-sans text-gray-500 leading-relaxed max-w-xl mx-auto">
          VIA MEDIA는 광고 없이 독자의 구독료로만 운영됩니다.
          <br />
          건강한 담론을 지지하는 일이 곧 독립 저널리즘을 지키는 일입니다.
        </p>
      </div>

      {/* 프리미엄 구독 */}
      <section className="mb-20">
        <div className="border border-gray-900 p-10 max-w-2xl mx-auto">

          {/* 배지 */}
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#B22222] mb-6 block">
            Premium
          </span>

          {/* 제목 & 설명 */}
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-2">
            주간 심층 리포트 구독
          </h2>
          <p className="font-sans text-sm text-gray-500 mb-8 leading-relaxed">
            매주 핵심 아젠다 분석 보고서와 이주의 기사 정리를 이메일로 받아보세요.
          </p>

          {/* 혜택 목록 */}
          <ul className="space-y-5 mb-10">
            {PREMIUM_FEATURES.map(f => (
              <li key={f.title} className="flex gap-4">
                <span className="text-[#B22222] font-sans font-bold mt-0.5 flex-shrink-0">—</span>
                <div>
                  <p className="font-sans text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="font-sans text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* 가격 + 토글 */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-serif text-4xl font-black text-gray-900">
                  ₩{price.toLocaleString()}
                </span>
                <span className="font-sans text-sm text-gray-400 ml-2">
                  /{isYearly ? '년' : '월'}
                </span>
                {isYearly && (
                  <span className="ml-2 font-sans text-xs text-[#B22222]">2개월 무료</span>
                )}
              </div>

              {/* 월간/연간 토글 */}
              <div className="flex items-center gap-2">
                <span className={`font-sans text-xs ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  월간
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${isYearly ? 'bg-gray-900' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-5' : ''}`} />
                </button>
                <span className={`font-sans text-xs ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  연간
                </span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full font-sans text-sm py-4 bg-gray-900 text-white hover:bg-[#B22222] transition-colors"
            >
              프리미엄 구독 시작하기
            </button>

            <p className="font-sans text-xs text-gray-400 text-center mt-3">
              현재 개인사업자로 운영되며 세액공제는 제공되지 않습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div className="flex items-center gap-4 mb-16">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">후원</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* 일회성 후원 */}
      <section className="mb-16 max-w-lg mx-auto text-center">
        <h2 className="font-serif font-bold text-xl text-gray-900 mb-1">일회성 후원</h2>
        <p className="font-sans text-sm text-gray-500 mb-6">부담 없이 한 번만 응원해주세요.</p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {ONE_TIME_AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => setOneTimeAmount(amount)}
              className={`font-sans text-sm px-5 py-2.5 border transition-colors ${
                oneTimeAmount === amount
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-900'
              }`}
            >
              ₩{amount.toLocaleString()}
            </button>
          ))}
          <button
            onClick={() => setOneTimeAmount('custom')}
            className={`font-sans text-sm px-5 py-2.5 border transition-colors ${
              oneTimeAmount === 'custom'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-900'
            }`}
          >
            직접입력
          </button>
        </div>

        {oneTimeAmount === 'custom' && (
          <input
            type="text"
            placeholder="금액 입력 (원)"
            value={oneTimeCustom}
            onChange={e => setOneTimeCustom(e.target.value)}
            className="border border-gray-300 px-4 py-2 font-sans text-sm w-48 focus:outline-none focus:border-gray-800 text-center mb-4 block mx-auto"
          />
        )}

        <button
          onClick={handleOneTime}
          className="w-full font-sans text-sm py-3 bg-[#B22222] text-white hover:bg-[#8B0000] transition-colors"
        >
          후원하기
        </button>
      </section>

      {/* 정기 후원 */}
      <section className="max-w-lg mx-auto text-center">
        <h2 className="font-serif font-bold text-xl text-gray-900 mb-1">정기 후원</h2>
        <p className="font-sans text-sm text-gray-500 mb-6">
          매월 정기적으로 독립 저널리즘을 지지해주세요.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {RECURRING_AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => setRecurringAmount(amount)}
              className={`font-sans text-sm px-5 py-2.5 border transition-colors ${
                recurringAmount === amount
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-900'
              }`}
            >
              월 ₩{amount.toLocaleString()}
            </button>
          ))}
        </div>

        <button
          onClick={handleRecurring}
          className="w-full font-sans text-sm py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        >
          정기 후원 신청
        </button>
      </section>
    </div>
  )
}
