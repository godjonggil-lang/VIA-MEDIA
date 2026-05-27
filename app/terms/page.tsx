import { siteConfig } from '@/lib/data'

export const metadata = {
  title: '이용약관 | VIA MEDIA News',
}

export default function TermsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">이용약관</h1>
        <p className="font-sans text-sm text-gray-400 mb-10">최종 수정일: 2025년 11월 1일</p>

        <div className="font-sans text-gray-700 space-y-10">
          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              1. 서비스 목적 및 운영 주체
            </h2>
            <p className="leading-relaxed mb-3">
              VIA MEDIA News는 진보와 보수의 시각을 균형 있게 제공하는 독립 언론 서비스입니다.
              건강한 담론을 통해 더 나은 사회 형성에 기여하는 것을 목표로 합니다.
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-24">발행인</dt>
                <dd>{siteConfig.publisher.name}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-24">편집인</dt>
                <dd>{siteConfig.editor.name}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-400 shrink-0 w-24">연락처</dt>
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
              2. 구독 및 후원 조건
            </h2>
            <p className="leading-relaxed mb-3">
              구독 및 후원 서비스는 현재 준비 중이며, 런칭 후 다음 조건으로 제공됩니다.
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>구독 플랜은 월간 또는 연간 단위로 제공됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>후원은 일회성 및 정기 후원으로 구분됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>만 14세 미만은 이용할 수 없습니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>정확한 결제 정보를 제공해야 합니다.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              3. 콘텐츠 저작권
            </h2>
            <p className="leading-relaxed mb-3">
              VIA MEDIA News에 게재된 모든 기사, 분석, 이미지 등의 콘텐츠에 대한 저작권은 VIA MEDIA News
              및 해당 필자에게 있습니다.
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>무단 전재, 재배포, 복제를 금합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>출처를 밝힌 인용은 원칙적으로 허용됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>상업적 이용은 사전 서면 동의가 필요합니다.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              4. 면책 조항
            </h2>
            <p className="leading-relaxed mb-3">
              VIA MEDIA News의 콘텐츠는 특정 투자, 법률, 의료 등에 대한 전문적 조언이 아닙니다.
              모든 기사는 필자의 분석과 견해를 담고 있으며, VIA MEDIA News는 해당 내용의 정확성과
              완전성에 대해 무한한 책임을 지지 않습니다.
            </p>
            <p className="leading-relaxed">
              서비스 중단, 오류, 또는 데이터 손실로 인한 피해에 대해 VIA MEDIA News는 법적으로
              허용된 범위 내에서 책임을 제한합니다.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
              5. 환불 정책
            </h2>
            <ul className="space-y-3 pl-4">
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>
                  <strong>구독 취소:</strong> 구독 취소 시 당월 말까지 서비스가 제공됩니다.
                  당월 결제 금액은 환불되지 않습니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>
                  <strong>연간 구독:</strong> 결제 후 7일 이내 취소 시 전액 환불합니다.
                  7일 이후에는 잔여 개월 수에 비례하여 환불합니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B22222] shrink-0">—</span>
                <span>
                  <strong>후원:</strong> 일회성 및 정기 후원은 원칙적으로 환불되지 않습니다.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
