'use client'

import { useState } from 'react'
import { useWaitlist } from '@/context/WaitlistContext'

const PLANS = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ['주 1회 무료 뉴스레터', '최신 아젠다 요약', '공개 기사 열람'],
    cta: '무료 구독',
    highlight: false,
  },
  {
    name: 'Standard',
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    features: ['주 3회 뉴스레터', '아젠다 심층 분석', '진보·보수 비교 기사'],
    cta: '구독하기',
    highlight: false,
  },
  {
    name: 'Premium',
    monthlyPrice: 12000,
    yearlyPrice: 120000,
    features: ['매일 뉴스레터', '전체 아카이브 열람', '심층 리포트 다운로드', '월 1회 독자 Q&A'],
    cta: '프리미엄 구독',
    highlight: true,
  },
]

const ONE_TIME_AMOUNTS = [1000, 3000, 5000]
const RECURRING_AMOUNTS = [3000, 5000, 10000]

export default function SubscribePage() {
  const { openModal } = useWaitlist()
  const [isYearly, setIsYearly] = useState(false)
  const [oneTimeAmount, setOneTimeAmount] = useState<number | 'custom'>(3000)
  const [oneTimeCustom, setOneTimeCustom] = useState('')
  const [recurringAmount, setRecurringAmount] = useState<number>(3000)
  const [donorMessage, setDonorMessage] = useState('')

  const handlePlan = (plan: (typeof PLANS)[0]) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
    openModal({
      amount: price,
      type: 'subscription',
      plan: `${plan.name} ${isYearly ? '연간' : '월간'}`,
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Top Message */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-6">구독 & 후원</h1>
        <p className="font-sans text-gray-600 leading-relaxed mb-2">
          VIA MEDIA를 후원하는 것은 특정 편을 드는 것이 아닙니다.
        </p>
        <p className="font-sans text-gray-600 leading-relaxed mb-2">
          건강한 담론 자체를 지지하는 일입니다.
        </p>
        <p className="font-sans text-gray-600 leading-relaxed mb-2">
          후원금은 독립 저널리즘 운영에 사용됩니다.
        </p>
        <p className="font-sans text-sm text-gray-400 mt-4">
          현재 개인사업자로 운영되며 세액공제는 제공되지 않습니다.
        </p>
      </div>

      {/* Subscription Plans */}
      <section className="mb-20">
        <h2 className="font-serif font-bold text-2xl text-gray-900 text-center mb-8">
          구독 플랜
        </h2>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className={`font-sans text-sm ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-400'}`}
          >
            월간
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isYearly ? 'bg-gray-900' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : ''}`}
            />
          </button>
          <span
            className={`font-sans text-sm ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-400'}`}
          >
            연간
            <span className="ml-1 text-xs text-[#B22222]">2개월 무료</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
            return (
              <div
                key={plan.name}
                className={`border p-8 flex flex-col ${plan.highlight ? 'border-gray-900' : 'border-gray-200'}`}
              >
                {plan.highlight && (
                  <span className="font-sans text-xs tracking-widest uppercase text-[#B22222] mb-4">
                    추천
                  </span>
                )}
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  {price === 0 ? (
                    <span className="font-serif text-3xl font-black text-gray-900">무료</span>
                  ) : (
                    <>
                      <span className="font-serif text-3xl font-black text-gray-900">
                        ₩{price.toLocaleString()}
                      </span>
                      <span className="font-sans text-sm text-gray-500 ml-1">
                        /{isYearly ? '년' : '월'}
                      </span>
                    </>
                  )}
                </div>
                <ul className="font-sans text-sm text-gray-600 space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-[#B22222] mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlan(plan)}
                  className={`font-sans text-sm py-3 border transition-colors ${
                    plan.highlight
                      ? 'bg-gray-900 text-white border-gray-900 hover:bg-[#B22222] hover:border-[#B22222]'
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* One-time Donation */}
      <section className="mb-20 max-w-lg mx-auto text-center">
        <h2 className="font-serif font-bold text-2xl text-gray-900 mb-2">일회성 후원</h2>
        <p className="font-sans text-sm text-gray-600 mb-8">부담 없이 한 번만 응원해주세요.</p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {ONE_TIME_AMOUNTS.map((amount) => (
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
            onChange={(e) => setOneTimeCustom(e.target.value)}
            className="border border-gray-300 px-4 py-2 font-sans text-sm w-48 focus:outline-none focus:border-gray-800 text-center mb-4 block mx-auto"
          />
        )}

        <div className="mb-4">
          <label className="block font-sans text-sm text-gray-700 mb-1 text-left">
            응원 메시지 (선택)
          </label>
          <textarea
            value={donorMessage}
            onChange={(e) => setDonorMessage(e.target.value)}
            placeholder="독립 저널리즘을 응원합니다!"
            rows={3}
            className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-800 resize-none"
          />
        </div>

        <button
          onClick={handleOneTime}
          className="w-full font-sans text-sm py-3 bg-[#B22222] text-white hover:bg-[#8B0000] transition-colors"
        >
          후원하기
        </button>
      </section>

      {/* Recurring Donation */}
      <section className="max-w-lg mx-auto text-center border-t border-gray-200 pt-16 mb-12">
        <h2 className="font-serif font-bold text-2xl text-gray-900 mb-2">정기 후원</h2>
        <p className="font-sans text-sm text-gray-600 mb-8">
          매월 정기적으로 독립 저널리즘을 지지해주세요.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {RECURRING_AMOUNTS.map((amount) => (
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
