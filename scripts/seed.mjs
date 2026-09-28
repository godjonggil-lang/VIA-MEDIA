// 샘플 데이터(2026-W38) 넣기:  npm run seed
// 이미 있으면 내용을 덮어씁니다.
import { createClient } from '@supabase/supabase-js'

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const article = (idx) => `https://www.defensetoday.kr/news/articleView.html?idxno=${idx}`
const photo = (path) => `https://cdn.defensetoday.kr/news/photo/202609/${path}`

const items = [
  ['news', 1, '한-폴란드 육군, 군사분야 교류 확대', 10645, '10645_32295_1621.png'],
  ['news', 2, '공군, KF-21 전투기 인도식 9월 22일로 연기', 10634, '10634_32279_4758.jpg'],
  ['news', 3, "한화-EDGE 합작, UAE '통합대공망' 구축", 10643, '10643_32292_3449.jpg'],
  ['column', 1, '[밀리터리룩] 멀티캠, 군복 얼룩무늬에도 저작권이 있다', 10635, '10635_32280_515.jpg'],
  ['column', 2, "[글로벌 방산] 칠레 독립기념일: '구리법' 폐지로 예산 깐깐해진 칠레 군(軍), 가성비로 뚫은 韓 기아·한화", 10654, '10654_32339_3845.jpg'],
  ['column', 3, "[방산 프론티어] 삼양컴텍 김종일 대표, '60년 축적한 방탄·방호 기술로 장비와 장병의 생존성을 지키다'", 10655, '10655_32340_4133.jpg'],
].map(([section, sort_order, title, idx, img]) => ({
  section,
  sort_order,
  title,
  url: article(idx),
  image_url: photo(img),
}))

const WEEK = '2026-W38'
const { data: existing } = await db.from('weeks').select('id').eq('week_id', WEEK).maybeSingle()

const { error } = await db.rpc('publish_week', {
  p_week_id: WEEK,
  p_range_label: '2026. 09. 14 - 09. 18',
  p_week_no: 38,
  p_items: items,
  p_original_week_id: existing ? WEEK : null,
})

if (error) {
  console.error('seed 실패:', error.message)
  process.exit(1)
}
console.log(`seed 완료: ${WEEK} (${existing ? '덮어씀' : '새로 발행'})`)
