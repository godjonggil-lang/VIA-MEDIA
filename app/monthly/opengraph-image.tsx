import { getMonthlyReport, listMonthlyReports } from '@/lib/report'
import { reportOgImage, OG_SIZE } from '@/lib/report-og'
import { MONTHLY_NAME, MONTHLY_NAME_EN } from '@/lib/config'

// '월간 리포트' 탭 주소(/monthly)를 공유할 때: 최신 달 리포트 이미지
export const alt = `${MONTHLY_NAME} (${MONTHLY_NAME_EN})`
export const size = OG_SIZE
export const contentType = 'image/png'
export const revalidate = 600

export default async function Image() {
  const latest = (await listMonthlyReports())[0]
  const r = latest ? await getMonthlyReport(latest.id) : null
  return reportOgImage({
    nameEn: MONTHLY_NAME_EN,
    name: MONTHLY_NAME,
    highlight: r ? `${r.month.month}월` : null,
    period: r ? `${r.month.year}년 ${r.month.month}월 · ${r.weeks.length}개 주차` : null,
    statsLine: r ? `게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건` : null,
    photo: r?.coverImage ?? null,
  })
}
