'use client'

import { useState } from 'react'
import { useWaitlist } from '@/context/WaitlistContext'

const ONE_TIME_AMOUNTS = [3000, 5000, 10000]
const RECURRING_AMOUNTS = [3000, 5000, 10000]

const PREMIUM_FEATURES = [
  {
    title: 'ì£¼ê°„ ?¬ì¸µ ë¶„ì„ ë³´ê³ ??,
    desc: 'ê·?ì£¼ì˜ ?µì‹¬ ?„ì  ?¤ë? ì§„ë³´Â·ë³´ìˆ˜ ?œê°?¼ë¡œ ë¶„ì„??ë¦¬í¬?¸ë? ë§¤ì£¼ ë°œì†¡?©ë‹ˆ??',
  },
  {
    title: '?´ì£¼??ê¸°ì‚¬ ?•ë¦¬',
    desc: 'VIA MEDIA Newsê°€ ?´ë²ˆ ì£??¤ë£¬ ëª¨ë“  ê¸°ì‚¬ë¥??œëˆˆ??ë³????ˆëŠ” ?”ì•½ë³¸ì„ ?¨ê»˜ ?œê³µ?©ë‹ˆ??',
  },
  {
    title: '?„ì¹´?´ë¸Œ ë¬´ì œ???´ëŒ',
    desc: 'ë°œí–‰??ëª¨ë“  ?„ì  ?¤Â·ê¸°?¬ë? ?œê¸°ë³„ë¡œ ?ìœ ë¡?²Œ ?ìƒ‰?????ˆìŠµ?ˆë‹¤.',
  },
  {
    title: 'ê´‘ê³  ?†ëŠ” ?…ë¦½ ?€?ë¦¬ì¦?ì§€ì§€',
    desc: 'êµ¬ë…ë£ŒëŠ” 100% ì½˜í…ì¸??œì‘???¬ìš©?©ë‹ˆ??',
  },
]

export default function SubscribePage() {
  const { openModal } = useWaitlist()
  const [isYearly, setIsYearly] = useState(false)
  const [oneTimeAmount, setOneTimeAmount] = useState<number | 'custom'>(5000)
  const [oneTimeCustom, setOneTimeCustom] = useState('')
  const [recurringAmount, setRecurringAmount] = useState<number>(5000)

  const monthlyPrice = 9900
  const yearlyPrice = 99000 // 2??ë¬´ë£Œ

  const price = isYearly ? yearlyPrice : monthlyPrice

  const handleSubscribe = () => {
    openModal({
      amount: price,
      type: 'subscription',
      plan: `?„ë¦¬ë¯¸ì—„ ${isYearly ? '?°ê°„' : '?”ê°„'}`,
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

      {/* ?¤ë” */}
      <div className="text-center mb-16">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">êµ¬ë… & ?„ì›</h1>
        <p className="font-sans text-gray-500 leading-relaxed max-w-xl mx-auto">
          VIA MEDIA News??ê´‘ê³  ?†ì´ ?…ì??êµ¬ë…ë£Œë¡œë§??´ì˜?©ë‹ˆ??
          <br />
          ê±´ê°•???´ë¡ ??ì§€ì§€?˜ëŠ” ?¼ì´ ê³??…ë¦½ ?€?ë¦¬ì¦˜ì„ ì§€?¤ëŠ” ?¼ì…?ˆë‹¤.
        </p>
      </div>

      {/* ?„ë¦¬ë¯¸ì—„ êµ¬ë… */}
      <section className="mb-20">
        <div className="border border-gray-900 p-10 max-w-2xl mx-auto">

          {/* ë°°ì? */}
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#B22222] mb-6 block">
            Premium
          </span>

          {/* ?œëª© & ?¤ëª… */}
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-2">
            ì£¼ê°„ ?¬ì¸µ ë¦¬í¬??êµ¬ë…
          </h2>
          <p className="font-sans text-sm text-gray-500 mb-8 leading-relaxed">
            ë§¤ì£¼ ?µì‹¬ ?„ì  ??ë¶„ì„ ë³´ê³ ?œì? ?´ì£¼??ê¸°ì‚¬ ?•ë¦¬ë¥??´ë©”?¼ë¡œ ë°›ì•„ë³´ì„¸??
          </p>

          {/* ?œíƒ ëª©ë¡ */}
          <ul className="space-y-5 mb-10">
            {PREMIUM_FEATURES.map(f => (
              <li key={f.title} className="flex gap-4">
                <span className="text-[#B22222] font-sans font-bold mt-0.5 flex-shrink-0">??/span>
                <div>
                  <p className="font-sans text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="font-sans text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* ê°€ê²?+ ? ê? */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-serif text-4xl font-black text-gray-900">
                  ??price.toLocaleString()}
                </span>
                <span className="font-sans text-sm text-gray-400 ml-2">
                  /{isYearly ? '?? : '??}
                </span>
                {isYearly && (
                  <span className="ml-2 font-sans text-xs text-[#B22222]">2ê°œì›” ë¬´ë£Œ</span>
                )}
              </div>

              {/* ?”ê°„/?°ê°„ ? ê? */}
              <div className="flex items-center gap-2">
                <span className={`font-sans text-xs ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  ?”ê°„
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${isYearly ? 'bg-gray-900' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-5' : ''}`} />
                </button>
                <span className={`font-sans text-xs ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  ?°ê°„
                </span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full font-sans text-sm py-4 bg-gray-900 text-white hover:bg-[#B22222] transition-colors"
            >
              ?„ë¦¬ë¯¸ì—„ êµ¬ë… ?œì‘?˜ê¸°
            </button>

            <p className="font-sans text-xs text-gray-400 text-center mt-3">
              ?„ì¬ ê°œì¸?¬ì—…?ë¡œ ?´ì˜?˜ë©° ?¸ì•¡ê³µì œ???œê³µ?˜ì? ?ŠìŠµ?ˆë‹¤.
            </p>
          </div>
        </div>
      </section>

      {/* êµ¬ë¶„??*/}
      <div className="flex items-center gap-4 mb-16">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">?„ì›</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* ?¼íšŒ???„ì› */}
      <section className="mb-16 max-w-lg mx-auto text-center">
        <h2 className="font-serif font-bold text-xl text-gray-900 mb-1">?¼íšŒ???„ì›</h2>
        <p className="font-sans text-sm text-gray-500 mb-6">ë¶€???†ì´ ??ë²ˆë§Œ ?‘ì›?´ì£¼?¸ìš”.</p>

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
              ??amount.toLocaleString()}
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
            ì§ì ‘?…ë ¥
          </button>
        </div>

        {oneTimeAmount === 'custom' && (
          <input
            type="text"
            placeholder="ê¸ˆì•¡ ?…ë ¥ (??"
            value={oneTimeCustom}
            onChange={e => setOneTimeCustom(e.target.value)}
            className="border border-gray-300 px-4 py-2 font-sans text-sm w-48 focus:outline-none focus:border-gray-800 text-center mb-4 block mx-auto"
          />
        )}

        <button
          onClick={handleOneTime}
          className="w-full font-sans text-sm py-3 bg-[#B22222] text-white hover:bg-[#8B0000] transition-colors"
        >
          ?„ì›?˜ê¸°
        </button>
      </section>

      {/* ?•ê¸° ?„ì› */}
      <section className="max-w-lg mx-auto text-center">
        <h2 className="font-serif font-bold text-xl text-gray-900 mb-1">?•ê¸° ?„ì›</h2>
        <p className="font-sans text-sm text-gray-500 mb-6">
          ë§¤ì›” ?•ê¸°?ìœ¼ë¡??…ë¦½ ?€?ë¦¬ì¦˜ì„ ì§€ì§€?´ì£¼?¸ìš”.
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
              ????amount.toLocaleString()}
            </button>
          ))}
        </div>

        <button
          onClick={handleRecurring}
          className="w-full font-sans text-sm py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        >
          ?•ê¸° ?„ì› ? ì²­
        </button>
      </section>
    </div>
  )
}
