'use client'

import { useState } from 'react'
import { useWaitlist } from '@/context/WaitlistContext'

const PRESET_AMOUNTS = [1000, 3000, 5000]

export default function SupportWidget({ articleSlug }: { articleSlug: string }) {
  const { openModal } = useWaitlist()
  const [selected, setSelected] = useState<number | 'custom'>(3000)
  const [customAmount, setCustomAmount] = useState('')

  const finalAmount =
    selected === 'custom' ? parseInt(customAmount.replace(/[^0-9]/g, ''), 10) || 0 : selected

  const handleSupport = () => {
    openModal({ articleSlug, amount: finalAmount, type: 'donation' })
  }

  return (
    <div className="border-t border-b border-gray-200 py-8 my-10">
      <p className="font-sans text-sm text-gray-600 leading-relaxed text-center mb-1">
        이 기사가 균형 잡힌 시각에 도움이 됐나요?
      </p>
      <p className="font-sans text-sm text-gray-600 leading-relaxed text-center mb-6">
        VIA MEDIA News의 독립 저널리즘을 응원해주세요. 건강한 담론을 지지하는 일입니다.
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {PRESET_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelected(amount)}
            className={`font-sans text-sm px-5 py-2.5 border transition-colors ${
              selected === amount
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-900'
            }`}
          >
            ₩{amount.toLocaleString()}
          </button>
        ))}
        <button
          onClick={() => setSelected('custom')}
          className={`font-sans text-sm px-5 py-2.5 border transition-colors ${
            selected === 'custom'
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-300 text-gray-700 hover:border-gray-900'
          }`}
        >
          직접입력
        </button>
      </div>

      {selected === 'custom' && (
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="금액 입력 (원)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="border border-gray-300 px-4 py-2 font-sans text-sm w-48 focus:outline-none focus:border-gray-800 text-center"
          />
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleSupport}
          className="font-sans text-sm px-10 py-3 bg-[#B22222] text-white hover:bg-[#8B0000] transition-colors"
        >
          응원하기
        </button>
      </div>
    </div>
  )
}
