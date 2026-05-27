import { siteConfig } from '@/lib/data'

export const metadata = {
  title: '소개 | VIA MEDIA News',
  description: 'VIA MEDIA News의 철학과 운영 방식을 소개합니다.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Philosophy */}
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-6">
          VIA MEDIA News에 대하여
        </h1>

        <div className="border-l-4 border-[#B22222] pl-6 mb-12">
          <p className="font-sans text-lg text-gray-700 leading-relaxed mb-3">
            "우리는 특정 입장을 강요하지 않습니다."
          </p>
          <p className="font-sans text-lg text-gray-700 leading-relaxed mb-3">
            "다만 상대의 논리를 이해한 뒤 본인의 입장을 갖기를 권합니다."
          </p>
          <p className="font-sans text-lg text-gray-700 leading-relaxed">
            "건강한 담론이 쌓이는 곳에서 더 나은 국가가 만들어진다고 믿습니다."
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-5">
            왜 VIA MEDIA News인가
          </h2>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            'Via Media'는 라틴어로 '중간 길'을 뜻합니다. 우리는 진보도 보수도 아닌 중립을
            지향하는 것이 아닙니다. 진보와 보수 양쪽의 논리를 가능한 한 정확하게 전달하는
            것을 목표로 합니다.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            한국의 미디어 환경은 점점 더 양극화되고 있습니다. 좌클릭 한 번에 한쪽 시각만
            보이고, 우클릭 한 번에 반대 시각만 보이는 구조 속에서 독자들은 자신도 모르는
            사이에 편향된 정보만을 소비하게 됩니다.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed">
            VIA MEDIA News는 하나의 의제에 대해 진보와 보수의 시각을 나란히 배치합니다. 독자가
            직접 판단할 수 있도록. 혐오가 아닌 이해로, 고함이 아닌 논리로.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-5">
            왜 진보와 보수를 함께 쓰는가
          </h2>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            진보와 보수는 서로 다른 가치를 중시합니다. 진보는 평등과 변화를, 보수는 자유와
            안정을 중시하는 경향이 있습니다. 둘 다 사회를 더 좋게 만들려는 진정성 있는
            시도입니다. 다만 방법론이 다를 뿐입니다.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            어느 한쪽이 항상 옳을 수는 없습니다. 사안마다, 맥락마다 다릅니다. 그렇기 때문에
            진보의 논리가 맞는 순간도 있고, 보수의 논리가 맞는 순간도 있습니다. 중요한 것은
            어느 편이냐가 아니라, 어떤 논리를 가지고 있느냐입니다.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed">
            VIA MEDIA News는 독자가 특정 진영의 논리에 갇히지 않도록, 매 기사마다 반대 시각을
            함께 제공합니다. 입장을 갖는 것은 좋습니다. 그러나 이해하고 입장을 가져야 합니다.
          </p>
        </section>

        {/* People */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-6">필자 소개</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[siteConfig.publisher, siteConfig.editor].map((person) => (
              <div key={person.role} className="border border-gray-200 p-6">
                <div className="w-12 h-12 bg-gray-100 border border-gray-200 mb-4 flex items-center justify-center">
                  <span className="font-serif text-xl text-gray-400">필</span>
                </div>
                <span className="font-sans text-xs text-gray-400 tracking-widest uppercase block mb-1">
                  {person.role}
                </span>
                <h3 className="font-serif font-bold text-lg text-gray-900">{person.name}</h3>
                <p className="font-sans text-sm text-gray-600 mt-2 leading-relaxed">
                  독립 저널리스트. 진보와 보수 양쪽의 논리를 건조하게 기록합니다.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency */}
        <section className="bg-gray-50 border border-gray-200 p-8">
          <h2 className="font-serif font-bold text-xl text-gray-900 mb-4">운영 투명성</h2>
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-3">
            VIA MEDIA News는 외부 광고 없이 독자의 구독과 후원으로 운영됩니다. 어떤 정당, 기업,
            단체로부터도 재정적 지원을 받지 않습니다.
          </p>
          <p className="font-sans text-sm text-gray-700 leading-relaxed">
            수익 구조: 뉴스레터 구독료 + 일회성·정기 후원
            <br />
            운영 주체: 개인사업자 (세액공제 불가)
          </p>
        </section>
      </div>
    </div>
  )
}
