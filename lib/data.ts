import { Article, Agenda } from '@/types'

export const agendas: Agenda[] = [
  {
    id: 'medical-school',
    title: '의대 증원 문제',
    category: '사회',
    description: '정부의 의대 정원 확대 정책을 둘러싼 찬반 논쟁. 의료 접근성과 의료 질 사이의 균형점은 어디인가.',
    articleCount: { progressive: 1, conservative: 1, analysis: 0 },
  },
  {
    id: 'nuclear-energy',
    title: '탈원전 vs 원전 확대',
    category: '경제',
    description: '기후위기와 에너지 안보 사이에서 원자력 에너지의 역할을 어떻게 정의할 것인가.',
    articleCount: { progressive: 1, conservative: 1, analysis: 0 },
  },
  {
    id: 'immigration',
    title: '이민자 정책',
    category: '사회',
    description: '저출산·고령화 시대, 이민 수용은 해법인가 새로운 문제의 시작인가.',
    articleCount: { progressive: 1, conservative: 1, analysis: 0 },
  },
  {
    id: 'minimum-wage',
    title: '최저임금 인상',
    category: '경제',
    description: '최저임금 인상이 노동자를 보호하는가, 아니면 일자리를 줄이는가. 숫자 뒤에 숨겨진 논리를 읽는다.',
    articleCount: { progressive: 1, conservative: 1, analysis: 0 },
  },
]

export const articles: Article[] = [
  {
    slug: 'medical-school-progressive',
    title: '의대 증원, 의료 불평등 해소를 위한 구조적 선택',
    summary: 'OECD 최하위 수준의 의사 수와 수도권 집중 문제를 해결하기 위해 의대 증원은 더 이상 선택이 아닌 필수다.',
    agenda: '의대 증원 문제',
    agendaId: 'medical-school',
    perspective: 'progressive',
    author: 'publisher',
    publishedAt: '2025-11-01',
    relatedSlug: 'medical-school-conservative',
    content: `한국의 인구 1,000명당 의사 수는 2.6명으로 OECD 평균 3.7명을 크게 밑돈다. 이 수치는 단순한 통계가 아니라, 지방 응급실의 폐업과 야간 진료 공백이라는 현실로 이어진다. 의대 증원은 이 구조적 불균형을 해소하기 위한 최소한의 조치다.

특히 지역 의료 불균형은 심각한 수준이다. 수도권과 대도시에 의사가 집중되면서 지방 주민은 기본적인 의료 서비스조차 접근하기 어려운 상황이다. 의대 지역 인재 전형 확대와 맞물린 증원 정책은 이 문제를 직접 겨냥한다. 의사가 없는 지역에서 아프면 어디로 가야 하는지, 그것이 지금 우리가 직면한 현실이다.

의료계는 증원이 의료 질 하락을 초래한다고 주장한다. 그러나 많은 OECD 국가들이 한국보다 더 많은 의사를 보유하면서도 높은 의료 수준을 유지하고 있다. 의사 수가 많다고 의료 질이 낮아진다는 주장은 데이터로 뒷받침되지 않는다. 의료 질은 의사 수가 아니라 시스템과 교육 수준에 의해 결정된다.

고령화 사회가 급속도로 진행되는 상황에서 의료 수요는 더욱 증가할 것이다. 지금 증원을 시작해도 실제 의사 배출까지 10년이 걸린다. 결정을 미룰 시간이 없다. 의대 증원은 미래 세대가 더 나은 의료 서비스를 받을 수 있도록 지금 당장 내려야 할 선택이다.`,
  },
  {
    slug: 'medical-school-conservative',
    title: '의대 증원보다 의료 시스템 혁신이 먼저다',
    summary: '단순한 의사 수 증가는 의료의 질을 보장하지 않는다. 수련 인프라 없는 증원은 오히려 독이 될 수 있다.',
    agenda: '의대 증원 문제',
    agendaId: 'medical-school',
    perspective: 'conservative',
    author: 'editor',
    publishedAt: '2025-11-03',
    relatedSlug: 'medical-school-progressive',
    content: `의대 증원의 취지에는 공감한다. 그러나 방법론에 대한 신중한 검토가 필요하다. 현재 우리나라의 수련 병원 인프라가 대규모 증원을 감당할 수 있는지부터 따져봐야 한다. 인프라 없는 증원은 의료의 질을 담보하지 못한다.

의사 수가 부족하다는 주장은 지역별 불균형 문제를 절대 부족의 문제로 오인한 결과라는 분석도 있다. 서울과 수도권에는 의사가 넘쳐나는 반면 지방에는 부족한 상황이다. 이는 증원이 아닌 의사 분포와 인센티브 구조의 문제다. 의사를 더 뽑는다고 그들이 지방에 가지는 않는다.

급격한 의대 증원은 의대 지원 열풍을 더욱 가속화시킬 수 있다. 우수한 인재들이 모두 의대로 쏠리는 현상은 이공계와 다른 분야의 인재 부족으로 이어진다. 사회 전체적으로 보면 의대 쏠림 현상의 심화는 바람직하지 않으며, 국가 산업 경쟁력에도 악영향을 미친다.

진정한 해법은 공공 의료 인프라 강화와 의료 수가 현실화에 있다. 지방에서 일하는 의사에게 충분한 보상이 주어지는 환경을 먼저 만들어야 한다. 구조적 개혁 없는 단순 증원은 문제의 본질을 비켜가는 임시방편에 불과하다.`,
  },
  {
    slug: 'nuclear-energy-progressive',
    title: '탈원전은 미래 세대를 위한 책임 있는 선택',
    summary: '방사성 폐기물 처리 문제와 사고 위험을 고려할 때, 재생에너지로의 전환은 필연적이다.',
    agenda: '탈원전 vs 원전 확대',
    agendaId: 'nuclear-energy',
    perspective: 'progressive',
    author: 'editor',
    publishedAt: '2025-11-05',
    relatedSlug: 'nuclear-energy-conservative',
    content: `후쿠시마 사고 이후 10년이 지났지만 방사성 오염수 문제는 아직 해결되지 않았다. 체르노빌의 흔적은 수십 년이 지난 지금도 살아있다. 원전은 단순한 에너지원이 아니다. 잘못됐을 때 그 피해는 세대를 넘어 지속된다.

핵폐기물 처리 문제는 원전의 근본적인 아킬레스건이다. 수만 년간 방사능을 방출하는 고준위 폐기물의 처리 방법은 아직 전 세계 어느 나라도 완전한 해법을 찾지 못했다. 비용을 포함한 이 부담은 고스란히 미래 세대에게 전가된다.

반면 태양광과 풍력 발전 비용은 최근 10년 사이 80% 이상 하락했다. 재생에너지의 경제성은 이미 원전을 앞서기 시작했다. 배터리 기술과 전력망 스마트화가 병행된다면 재생에너지만으로도 안정적인 전력 공급이 충분히 가능하다.

탈원전은 경제적 손실이 아니라 새로운 산업 기회다. 독일은 에너지 전환 과정에서 수십만 개의 재생에너지 관련 일자리를 창출했다. 한국도 반도체처럼 재생에너지 산업을 미래 먹거리로 키울 수 있는 기술력을 갖추고 있다.`,
  },
  {
    slug: 'nuclear-energy-conservative',
    title: '원전 없는 탄소중립은 환상이다',
    summary: '재생에너지만으로는 안정적 기저부하를 확보할 수 없다. 원전은 현실적인 기후위기 해법이다.',
    agenda: '탈원전 vs 원전 확대',
    agendaId: 'nuclear-energy',
    perspective: 'conservative',
    author: 'publisher',
    publishedAt: '2025-11-07',
    relatedSlug: 'nuclear-energy-progressive',
    content: `태양광은 밤에 발전하지 않고, 풍력은 바람이 없으면 멈춘다. 재생에너지의 간헐성 문제는 아직 현실적으로 극복되지 않았다. 기저부하를 안정적으로 공급하려면 원전 또는 화석연료 중 하나를 선택해야 한다. 그 선택지에서 원전을 배제하는 것은 무책임하다.

독일의 탈원전 사례를 성공 모델로 보기 어렵다. 독일은 원전을 줄이면서 석탄 발전을 늘렸고, 탄소 배출이 오히려 증가했다. 전기요금은 유럽에서 가장 비싼 수준으로 올랐다. 이것이 우리가 추구할 방향인지 냉정하게 물어야 한다.

IPCC(기후변화에 관한 정부 간 협의체)도 탄소중립 시나리오에서 원전의 역할을 인정한다. 기후위기를 막으려면 탄소를 배출하지 않는 모든 에너지원을 활용해야 한다. 원전은 탄소를 거의 배출하지 않으면서도 안정적으로 대규모 전력을 공급할 수 있는 유일한 에너지원이다.

에너지 안보 차원에서도 원전은 중요하다. 러시아-우크라이나 전쟁이 보여주듯, 에너지 의존은 곧 안보 취약성으로 이어진다. 국내에서 연료를 수년 치 비축할 수 있는 원전은 에너지 자립의 핵심 수단이다.`,
  },
  {
    slug: 'immigration-progressive',
    title: '이민자 수용, 저출산 시대의 현실적 해법',
    summary: '인구 감소와 노동력 부족 문제를 해결하기 위해 체계적인 이민 정책 수립이 시급하다.',
    agenda: '이민자 정책',
    agendaId: 'immigration',
    perspective: 'progressive',
    author: 'publisher',
    publishedAt: '2025-11-10',
    relatedSlug: 'immigration-conservative',
    content: `한국의 합계출산율은 0.72명(2023년)으로 전 세계에서 가장 낮다. 이 추세가 계속되면 2100년 한국 인구는 현재의 절반 이하로 줄어든다. 생산가능인구 감소는 경제 성장 둔화, 연금 재정 위기, 군 병력 부족 등 복합적인 문제로 이어진다. 이 구조적 위기를 해결할 수 있는 현실적 방법 중 하나가 이민이다.

많은 선진국들이 이민을 통해 인구 문제를 완화하고 있다. 캐나다, 호주, 독일 등은 체계적인 이민 포인트제를 도입해 필요한 인재를 선별적으로 수용한다. 한국도 단순 노동력 보충이 아닌, 기술인력과 투자이민을 중심으로 한 전략적 이민 정책을 수립할 수 있다.

문화적 다양성은 단순히 '수용해야 할 불편함'이 아니다. 다양한 배경의 사람들이 모이는 곳에서 혁신이 일어난다. 미국 실리콘밸리의 성공 뒤에는 전 세계 이민자들의 기여가 있다. 단일 문화의 균질성보다 다양성이 경쟁력이 되는 시대가 이미 왔다.

핵심은 '이민을 받느냐 마느냐'가 아니라 '어떻게 받느냐'다. 사회 통합 프로그램, 언어 교육, 노동 시장 안착 지원을 함께 설계해야 한다. 두려움보다 준비가 먼저다.`,
  },
  {
    slug: 'immigration-conservative',
    title: '이민 확대 전에 사회 통합 역량을 먼저 갖춰야',
    summary: '이민자 수용은 단순한 숫자 채우기가 아니다. 문화적 통합 없는 이민 확대는 사회 갈등을 키운다.',
    agenda: '이민자 정책',
    agendaId: 'immigration',
    perspective: 'conservative',
    author: 'editor',
    publishedAt: '2025-11-12',
    relatedSlug: 'immigration-progressive',
    content: `이민이 인구 문제의 해법이 될 수 있다는 주장을 무조건 부정하지 않는다. 그러나 이민 확대에 따르는 현실적 문제들을 직시해야 한다. 서유럽 여러 나라들이 이미 이민 통합 실패의 대가를 치르고 있다. 그 경험을 한국이 반복할 이유는 없다.

사회 통합 비용은 결코 작지 않다. 언어 교육, 주거 지원, 직업 훈련, 자녀 교육 등 이민자 정착을 지원하는 데 드는 비용은 상당하다. 이 비용을 충분히 지불하지 않은 채 이민자만 늘리는 것은 게토화와 사회 갈등을 초래할 수 있다.

내국인 노동자, 특히 저임금 일자리에 종사하는 취약계층과의 경쟁 문제도 있다. 이민자 유입이 저숙련 노동 임금을 낮춘다는 연구 결과들이 있다. 가장 도움이 필요한 사람들이 가장 큰 피해를 볼 수 있는 구조다.

문화적 정체성의 문제도 가볍게 볼 수 없다. 한국 사회가 다문화 사회로 전환되는 속도와 방식에 대해 사회적 합의가 먼저 이루어져야 한다. 이민 확대는 충분한 사회적 논의와 제도적 준비를 갖춘 후에 단계적으로 추진해야 한다.`,
  },
  {
    slug: 'minimum-wage-progressive',
    title: '최저임금 인상은 불평등 해소의 첫 단추',
    summary: '실질임금 정체와 소득 양극화 심화 속에서 최저임금 인상은 내수 경제 활성화의 핵심 수단이다.',
    agenda: '최저임금 인상',
    agendaId: 'minimum-wage',
    perspective: 'progressive',
    author: 'editor',
    publishedAt: '2025-11-15',
    relatedSlug: 'minimum-wage-conservative',
    content: `한국의 상위 10% 소득이 하위 10% 소득의 약 10배에 달한다. 소득 양극화는 단순한 불평등의 문제가 아니다. 내수 시장의 위축, 사회적 이동성 저하, 계층 고착화로 이어지는 경제 전반의 문제다. 최저임금 인상은 이 악순환에 제동을 걸 수 있는 직접적인 정책 수단이다.

최저임금 인상이 고용을 줄인다는 주장은 단순화된 논리다. 실증 연구들은 최저임금 인상이 고용에 미치는 영향이 생각보다 미미하다는 것을 보여준다. 오히려 저소득 노동자의 가처분소득이 늘면서 소비가 증가하고, 이것이 지역 상권을 살리는 선순환으로 이어질 수 있다.

생활임금의 개념이 중요하다. 최저임금은 단순히 '일한 대가'가 아니라, 노동자가 최소한의 인간다운 삶을 영위할 수 있는 기준이어야 한다. 현재 최저임금으로는 서울에서 방 한 칸을 구하고 기본 생활을 유지하기도 어렵다.

물론 소상공인의 부담을 고려해야 한다. 그러나 그 해법은 최저임금 인상을 막는 것이 아니라, 임대료 규제, 카드 수수료 인하, 소상공인 지원 등 다른 정책 수단을 함께 동원하는 것이다.`,
  },
  {
    slug: 'minimum-wage-conservative',
    title: '최저임금 급등이 소상공인을 벼랑으로 몬다',
    summary: '급격한 최저임금 인상은 고용 감소와 가격 인상으로 이어진다. 피해는 결국 취약계층에게 돌아온다.',
    agenda: '최저임금 인상',
    agendaId: 'minimum-wage',
    perspective: 'conservative',
    author: 'publisher',
    publishedAt: '2025-11-17',
    relatedSlug: 'minimum-wage-progressive',
    content: `편의점, 식당, 카페를 운영하는 소상공인들의 이야기를 들어야 한다. 최저임금이 빠르게 오르면서 인건비가 매출의 절반을 넘는 곳이 늘고 있다. 결과는 두 가지다. 직원을 줄이거나, 문을 닫거나. 2018~2019년 급격한 최저임금 인상 시기에 자영업 폐업이 급증했다는 통계는 이 현실을 보여준다.

아이러니하게도 최저임금 인상의 피해자 중 하나가 저임금 노동자다. 고용주가 비용을 줄이기 위해 근로시간을 단축하거나, 키오스크로 대체하거나, 고용 자체를 줄인다. 일자리를 잃은 최저임금 노동자는 아무런 보호도 받지 못한다.

지역별, 업종별 차이를 무시한 단일 최저임금도 문제다. 서울과 농촌 지역의 생활비 차이는 크다. 서울 기준으로 설정된 최저임금이 지방 소상공인에게는 감당하기 어려운 부담이 된다. 일부 선진국처럼 지역별 최저임금 차등 적용을 검토할 필요가 있다.

최저임금 인상이 노동자를 돕는다는 선한 의도는 이해한다. 그러나 의도와 결과는 다를 수 있다. 시장의 작동 원리를 존중하면서 취약계층을 실질적으로 돕는 방법을 더 세밀하게 설계해야 한다.`,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getAgendaById(id: string): Agenda | undefined {
  return agendas.find(a => a.id === id)
}

export function getArticlesByAgenda(agendaId: string): Article[] {
  return articles.filter(a => a.agendaId === agendaId)
}

export function getArticlesByPerspective(perspective: string): Article[] {
  return articles.filter(a => a.perspective === perspective)
}

export const siteConfig = {
  name: 'VIA MEDIA',
  slogan: 'Understand Before You Take a Side',
  subSlogan: '다양한 시각이 공존할 때, 더 나은 사회가 만들어집니다',
  publisher: {
    name: '[발행인 이름]',
    role: '발행인',
  },
  editor: {
    name: '[편집인 이름]',
    role: '편집인',
  },
  contact: {
    email: 'editor@viamedia.kr',
    address: '서울특별시',
  },
  registration: {
    business: '[추후 입력]',
    media: '[추후 입력]',
  },
}
