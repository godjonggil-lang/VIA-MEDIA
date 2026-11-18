import { permanentRedirect } from 'next/navigation'

// 예전 '이전 카드뉴스'(월별 목록) 주소 → 월간 리포트
export default function Archive() {
  permanentRedirect('/monthly')
}
