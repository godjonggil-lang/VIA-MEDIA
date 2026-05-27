import { createAgenda } from '@/lib/admin-actions'
import Link from 'next/link'

const CATEGORIES = ['?ïÏπò', 'Í≤ΩÏ†ú', '?¨Ìöå', 'Íµ?†ú'] as const

export default function NewAgendaPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/dashboard" className="font-sans text-sm text-gray-400 hover:text-gray-700">
          ???Ä?úÎ≥¥??        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif font-bold text-2xl text-gray-900">???ÑÏ††??/h1>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <form action={createAgenda} className="space-y-5">
          <div>
            <label className="block font-sans text-xs font-medium text-gray-600 mb-1.5">
              ?úÎ™© <span className="text-[#B22222]">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="?? ?òÎ? Ï¶ùÏõê Î¨∏Ï†ú"
              className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-gray-600 mb-1.5">
              Ïπ¥ÌÖåÍ≥†Î¶¨ <span className="text-[#B22222]">*</span>
            </label>
            <select
              name="category"
              className="border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-gray-600 mb-1.5">
              ?§Î™Ö
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="???ÑÏ††?§Ïóê ?Ä??Í∞ÑÎûµ???§Î™Ö"
              className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="font-sans text-sm bg-gray-900 text-white px-6 py-2.5 hover:bg-[#B22222] transition-colors"
            >
              ?ÑÏ††???ùÏÑ± ??            </button>
            <Link
              href="/admin/dashboard"
              className="font-sans text-sm border border-gray-300 text-gray-600 px-6 py-2.5 hover:border-gray-500 transition-colors"
            >
              Ï∑®ÏÜå
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
