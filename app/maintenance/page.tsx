export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#B22222] mb-6">
          VIA MEDIA News
        </p>
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-4 leading-snug">
          ???��? ?�비?��? ?�해<br />준�?중입?�다
        </h1>
        <p className="font-sans text-sm text-gray-500 leading-relaxed mb-10">
          빠른 ?�일 ?�에 찾아뵙겠?�니??
        </p>
        <div className="w-12 h-px bg-[#B22222] mx-auto" />
      </div>

      {/* 관리자 비�? 링크 ???�체 ?�이지 ?�동?�로 미들?�어 ?�상 ?�과 */}
      <a
        href="/admin/login"
        className="fixed bottom-6 right-6 text-[10px] text-gray-300 hover:text-gray-500 transition-colors font-sans select-none"
      >
        ·
      </a>
    </div>
  )
}
