import { siteConfig } from '@/lib/data'

export const metadata = {
  title: '개인?�보처리방침 | VIA MEDIA News',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">개인?�보처리방침</h1>
        <p className="font-sans text-sm text-gray-400 mb-10">최종 ?�정?? 2025??11??1??/p>

        <div className="font-sans text-gray-700 space-y-10">
          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              1. ?�집?�는 개인?�보 ??��
            </h2>
            <p className="leading-relaxed">
              VIA MEDIA News???�비???�공???�해 ?�음�?같�? 개인?�보�??�집?�니??
            </p>
            <ul className="mt-3 space-y-1 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�수: ?�메??주소</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�택: ?�원 메시지</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              2. ?�집 목적
            </h2>
            <p className="leading-relaxed mb-3">?�집??개인?�보???�음 목적?�로�??�용?�니??</p>
            <ul className="space-y-1 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�스?�터 발송</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�비???�칭 ?�림</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�속 기사 ?�림 (?�의 ??</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>구독·?�원 처리 (?�비???�칭 ??</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              3. 보유 �??�용 기간
            </h2>
            <p className="leading-relaxed">
              개인?�보???�집 목적???�성?�거???�용?��? ?�퇴·??���??�청???�까지 보유?�니??
              ?�퇴 ?�는 ??�� ?�청 ??지�??�이 ?�기?�니?? ?? 관??법령???�해 보존???�요??              경우 ?�당 기간 ?�안 보�??�니??
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              4. ?????�공 ?��?
            </h2>
            <p className="leading-relaxed">
              VIA MEDIA News???�용?�의 개인?�보�????�에�??�공?��? ?�습?�다. ?�만, 법령???�한
              ?�구가 ?�는 경우???�외�??�니??
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              5. ?�보주체??권리
            </h2>
            <p className="leading-relaxed mb-3">
              ?�용?�는 ?�제?��? ?�음 권리�??�사?????�습?�다.
            </p>
            <ul className="space-y-1 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>개인?�보 ?�람 ?�청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>개인?�보 ?�정·?�정 ?�청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>개인?�보 ??�� ?�청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�신 ?�의 철회</span>
              </li>
            </ul>
            <p className="mt-3 leading-relaxed">
              권리 ?�사???�래 ?�당???�메?�로 ?�청?�주?�면 즉시 처리?�겠?�니??
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              6. ?�당???�락�?            </h2>
            <dl className="space-y-2">
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-32">개인?�보 ?�당??/dt>
                <dd>{siteConfig.editor.name} ({siteConfig.editor.role})</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-32">?�메??/dt>
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
