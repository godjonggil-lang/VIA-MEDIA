'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: '?? },
  { href: '/agenda', label: '?�젠?? },
  { href: '/agenda?view=progressive', label: '진보???�각' },
  { href: '/agenda?view=conservative', label: '보수???�각' },
  { href: '/subscribe', label: '구독·?�원' },
  { href: '/about', label: '?�개' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif font-black text-2xl sm:text-3xl tracking-widest text-gray-900 group-hover:text-[#B22222] transition-colors">
              VIA MEDIA <span className="text-[#B22222]">News</span>
            </span>
            <span className="font-sans text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block">
              Understand Before You Take a Side
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-sm px-3 py-2 transition-colors ${
                    isActive
                      ? 'text-[#B22222] font-medium'
                      : 'text-gray-700 hover:text-[#B22222]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/subscribe"
              className="ml-3 font-sans text-sm px-4 py-2 bg-gray-900 text-white hover:bg-[#B22222] transition-colors"
            >
              구독
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 ?�기' : '메뉴 ?�기'}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-transform origin-center ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-transform origin-center ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-2 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-sans text-sm px-2 py-3 border-b border-gray-50 transition-colors ${
                    isActive ? 'text-[#B22222] font-medium' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
