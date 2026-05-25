import { siteConfig } from '@/lib/data'

export const metadata = {
  title: '개인정보처리방침 | VIA MEDIA',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">개인정보처리방침</h1>
        <p className="font-sans text-sm text-gray-400 mb-10">최종 수정일: 2025년 11월 1일</p>

        <div className="font-sans text-gray-700 space-y-10">
          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              1. 수집하는 개인정보 항목
            </h2>
            <p className="leading-relaxed">
              VIA MEDIA는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
            </p>
            <ul className="mt-3 space-y-1 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>필수: 이메일 주소</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>선택: 응원 메시지</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              2. 수집 목적
            </h2>
            <p className="leading-relaxed mb-3">수집된 개인정보는 다음 목적으로만 사용됩니다.</p>
            <ul className="space-y-1 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>뉴스레터 발송</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>서비스 런칭 알림</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>후속 기사 알림 (동의 시)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>구독·후원 처리 (서비스 런칭 후)</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              3. 보유 및 이용 기간
            </h2>
            <p className="leading-relaxed">
              개인정보는 수집 목적이 달성되거나 이용자가 탈퇴·삭제를 요청할 때까지 보유합니다.
              탈퇴 또는 삭제 요청 시 지체 없이 파기합니다. 단, 관련 법령에 의해 보존이 필요한
              경우 해당 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              4. 제3자 제공 여부
            </h2>
            <p className="leading-relaxed">
              VIA MEDIA는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 의한
              요구가 있는 경우는 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              5. 정보주체의 권리
            </h2>
            <p className="leading-relaxed mb-3">
              이용자는 언제든지 다음 권리를 행사할 수 있습니다.
            </p>
            <ul className="space-y-1 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>개인정보 열람 요청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>개인정보 수정·정정 요청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>개인정보 삭제 요청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>수신 동의 철회</span>
              </li>
            </ul>
            <p className="mt-3 leading-relaxed">
              권리 행사는 아래 담당자 이메일로 요청해주시면 즉시 처리하겠습니다.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              6. 담당자 연락처
            </h2>
            <dl className="space-y-2">
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-32">개인정보 담당자</dt>
                <dd>{siteConfig.editor.name} ({siteConfig.editor.role})</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-32">이메일</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[#B22222] hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  )
}
