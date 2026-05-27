import { siteConfig } from '@/lib/data'

export const metadata = {
  title: '?�개 | VIA MEDIA News',
  description: 'VIA MEDIA News??철학�??�영 방식???�개?�니??',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Philosophy */}
        <h1 className="font-serif font-black text-4xl text-gray-900 mb-6">
          VIA MEDIA News???�?�여
        </h1>

        <div className="border-l-4 border-[#B22222] pl-6 mb-12">
          <p className="font-sans text-lg text-gray-700 leading-relaxed mb-3">
            "?�리???�정 ?�장??강요?��? ?�습?�다."
          </p>
          <p className="font-sans text-lg text-gray-700 leading-relaxed mb-3">
            "?�만 ?��????�리�??�해????본인???�장??갖기�?권합?�다."
          </p>
          <p className="font-sans text-lg text-gray-700 leading-relaxed">
            "건강???�론???�이??곳에?????��? �??가 만들?�진?�고 믿습?�다."
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-5">
            ??VIA MEDIA News?��?
          </h2>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            'VIA MEDIA News'???�틴?�로 '중간 �????�합?�다. ?�리??진보??보수???�닌 중립??            지?�하??것이 ?�닙?�다. 진보?� 보수 ?�쪽???�리�?가?�한 ???�확?�게 ?�달?�는
            것을 목표�??�니??
          </p>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            ?�국??미디???�경?� ?�점 ???�극?�되�??�습?�다. 좌클�???번에 ?�쪽 ?�각�?            보이�? ?�클�???번에 반�? ?�각�?보이??구조 ?�에???�자?��? ?�신??모르??            ?�이???�향???�보만을 ?�비?�게 ?�니??
          </p>
          <p className="font-sans text-gray-700 leading-relaxed">
            VIA MEDIA News???�나???�제???�??진보?� 보수???�각???��???배치?�니?? ?�자가
            직접 ?�단?????�도�? ?�오가 ?�닌 ?�해�? 고함???�닌 ?�리�?
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-5">
            ??진보?� 보수�??�께 ?�는가
          </h2>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            진보?� 보수???�로 ?�른 가치�? 중시?�니?? 진보???�등�?변?��?, 보수???�유?�
            ?�정??중시?�는 경향???�습?�다. ?????�회�???좋게 만들?�는 진정???�는
            ?�도?�니?? ?�만 방법론이 ?��? 뿐입?�다.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed mb-4">
            ?�느 ?�쪽????�� ?�을 ?�는 ?�습?�다. ?�안마다, 맥락마다 ?�릅?�다. 그렇�??�문??            진보???�리가 맞는 ?�간???�고, 보수???�리가 맞는 ?�간???�습?�다. 중요??것�?
            ?�느 ?�이?��? ?�니?? ?�떤 ?�리�?가지�??�느?�입?�다.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed">
            VIA MEDIA News???�자가 ?�정 진영???�리??갇히지 ?�도�? �?기사마다 반�? ?�각??            ?�께 ?�공?�니?? ?�장??갖는 것�? 좋습?�다. 그러???�해?�고 ?�장??가?�야 ?�니??
          </p>
        </section>

        {/* People */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-6">?�자 ?�개</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[siteConfig.publisher, siteConfig.editor].map((person) => (
              <div key={person.role} className="border border-gray-200 p-6">
                <div className="w-12 h-12 bg-gray-100 border border-gray-200 mb-4 flex items-center justify-center">
                  <span className="font-serif text-xl text-gray-400">??/span>
                </div>
                <span className="font-sans text-xs text-gray-400 tracking-widest uppercase block mb-1">
                  {person.role}
                </span>
                <h3 className="font-serif font-bold text-lg text-gray-900">{person.name}</h3>
                <p className="font-sans text-sm text-gray-600 mt-2 leading-relaxed">
                  ?�립 ?�?�리?�트. 진보?� 보수 ?�쪽???�리�?건조?�게 기록?�니??
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency */}
        <section className="bg-gray-50 border border-gray-200 p-8">
          <h2 className="font-serif font-bold text-xl text-gray-900 mb-4">?�영 ?�명??/h2>
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-3">
            VIA MEDIA News???��? 광고 ?�이 ?�자??구독�??�원?�로 ?�영?�니?? ?�떤 ?�당, 기업,
            ?�체로�??�도 ?�정??지?�을 받�? ?�습?�다.
          </p>
          <p className="font-sans text-sm text-gray-700 leading-relaxed">
            ?�익 구조: ?�스?�터 구독�?+ ?�회?�·정�??�원
            <br />
            ?�영 주체: 개인?�업??(?�액공제 불�?)
          </p>
        </section>
      </div>
    </div>
  )
}
