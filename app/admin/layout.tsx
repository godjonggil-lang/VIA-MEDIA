import type { ReactNode } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-serif font-bold text-base text-gray-900">
          VIA MEDIA News <span className="font-sans text-xs text-gray-400 font-normal ml-1">?¥ÎìúÎØ?/span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-sans text-xs text-gray-400 hover:text-gray-700" target="_blank">
            ?¨Ïù¥??Î≥¥Í∏∞ ??          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="font-sans text-xs text-gray-500 hover:text-[#B22222] transition-colors"
            >
              Î°úÍ∑∏?ÑÏõÉ
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
    </div>
  )
}
