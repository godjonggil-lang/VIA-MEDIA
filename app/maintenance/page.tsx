import Link from 'next/link'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#B22222] mb-6">
          VIA MEDIA
        </p>
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-4 leading-snug">
          더 나은 서비스를 위해<br />준비 중입니다
        </h1>
        <p className="font-sans text-sm text-gray-500 leading-relaxed mb-10">
          빠른 시일 내에 찾아뵙겠습니다.
        </p>
        <div className="w-12 h-px bg-[#B22222] mx-auto" />
      </div>

      {/* 관리자 비밀 링크 */}
      <Link
        href="/admin/login"
        className="fixed bottom-6 right-6 text-[10px] text-gray-300 hover:text-gray-500 transition-colors font-sans select-none"
      >
        ·
      </Link>
    </div>
  )
}
