import { siteConfig } from '@/lib/data'

export const metadata = {
  title: '?�용?��? | VIA MEDIA News',
}

export default function TermsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">?�용?��?</h1>
        <p className="font-sans text-sm text-gray-400 mb-10">최종 ?�정?? 2025??11??1??/p>

        <div className="font-sans text-gray-700 space-y-10">
          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              1. ?�비??목적 �??�영 주체
            </h2>
            <p className="leading-relaxed mb-3">
              VIA MEDIA News??진보?� 보수???�각??균형 ?�게 ?�공?�는 ?�립 ?�론 ?�비?�입?�다.
              건강???�론???�해 ???��? ?�회 ?�성??기여?�는 것을 목표�??�니??
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-24">발행??/dt>
                <dd>{siteConfig.publisher.name}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-24">?�집??/dt>
                <dd>{siteConfig.editor.name}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-24">?�락�?/dt>
                <dd>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-[#B22222] hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              2. 구독 �??�원 조건
            </h2>
            <p className="leading-relaxed mb-3">
              구독 �??�원 ?�비?�는 ?�재 준�?중이�? ?�칭 ???�음 조건?�로 ?�공?�니??
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>구독 ?�랜?� ?�간 ?�는 ?�간 ?�위�??�공?�니??</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�원?� ?�회??�??�기 ?�원?�로 구분?�니??</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>�?14??미만?� ?�용?????�습?�다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�확??결제 ?�보�??�공?�야 ?�니??</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              3. 콘텐�??�?�권
            </h2>
            <p className="leading-relaxed mb-3">
              VIA MEDIA News??게재??모든 기사, 분석, ?��?지 ?�의 콘텐츠에 ?�???�?�권?� VIA MEDIA News
              �??�당 ?�자?�게 ?�습?�다.
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>무단 ?�재, ?�배?? 복제�?금합?�다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>출처�?밝힌 ?�용?� ?�칙?�으�??�용?�니??</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>?�업???�용?� ?�전 ?�면 ?�의가 ?�요?�니??</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              4. 면책 조항
            </h2>
            <p className="leading-relaxed mb-3">
              VIA MEDIA News??콘텐츠는 ?�정 ?�자, 법률, ?�료 ?�에 ?�???�문??조언???�닙?�다.
              모든 기사???�자??분석�?견해�??�고 ?�으�? VIA MEDIA News???�당 ?�용???�확?�과
              ?�전?�에 ?�??무한??책임??지지 ?�습?�다.
            </p>
            <p className="leading-relaxed">
              ?�비??중단, ?�류, ?�는 ?�이???�실�??�한 ?�해???�??VIA MEDIA News??법적?�로
              ?�용??범위 ?�에??책임???�한?�니??
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              5. ?�불 ?�책
            </h2>
            <ul className="space-y-3 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>
                  <strong>구독 취소:</strong> 구독 취소 ???�월 말까지 ?�비?��? ?�공?�니??
                  ?�월 결제 금액?� ?�불?��? ?�습?�다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>
                  <strong>?�간 구독:</strong> 결제 ??7???�내 취소 ???�액 ?�불?�니??
                  7???�후?�는 ?�여 개월 ?�에 비�??�여 ?�불?�니??
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">??/span>
                <span>
                  <strong>?�원:</strong> ?�회??�??�기 ?�원?� ?�칙?�으�??�불?��? ?�습?�다.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
