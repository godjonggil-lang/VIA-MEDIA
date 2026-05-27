export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 p-10 w-full max-w-sm">
        <h1 className="font-serif font-bold text-2xl text-gray-900 mb-2 text-center">VIA MEDIA News</h1>
        <p className="font-sans text-xs text-gray-400 text-center mb-8 tracking-widest uppercase">
          Admin
        </p>

        {error && (
          <p className="font-sans text-sm text-[#B22222] bg-red-50 border border-red-100 px-4 py-3 mb-6 text-center">
            비밀번호가 올바르지 않습니다.
          </p>
        )}

        <form action="/api/admin/login" method="POST" className="space-y-4">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">비밀번호</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full border border-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-sans text-sm py-2.5 hover:bg-[#B22222] transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
