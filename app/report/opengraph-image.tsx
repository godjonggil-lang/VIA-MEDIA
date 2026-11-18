import { getWeeklyReport, listWeeklyReports } from '@/lib/report'
import { reportOgImage, OG_SIZE } from '@/lib/report-og'
import { shortDateLabel } from '@/lib/week'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'

// '주간 리포트' 탭 주소(/report)를 공유할 때: 최신 주 리포트 이미지
export const alt = `${REPORT_NAME} (${REPORT_NAME_EN})`
export const size = OG_SIZE
export const contentType = 'image/png'
export const revalidate = 600

export default async function Image() {
  const latest = (await listWeeklyReports())[0]
  const r = latest ? await getWeeklyReport(latest.id) : null
  return reportOgImage({
    nameEn: REPORT_NAME_EN,
    name: REPORT_NAME,
    highlight: r ? `${r.week.weekNo}주차` : null,
    period: r ? `${r.week.weekId.slice(0, 4)}년 · ${shortDateLabel(r.week.from)} – ${shortDateLabel(r.week.to)}` : null,
    statsLine: r ? `게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건` : null,
    photo: r?.coverImage ?? null,
  })
}
