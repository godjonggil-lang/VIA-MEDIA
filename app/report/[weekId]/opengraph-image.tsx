import { getWeeklyReport } from '@/lib/report'
import { reportOgImage, OG_SIZE } from '@/lib/report-og'
import { shortDateLabel } from '@/lib/week'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'

export const alt = `${REPORT_NAME} (${REPORT_NAME_EN})`
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ weekId: string }> }) {
  const r = await getWeeklyReport((await params).weekId)
  return reportOgImage({
    nameEn: REPORT_NAME_EN,
    name: REPORT_NAME,
    highlight: r ? `${r.week.weekNo}주차` : null,
    period: r ? `${r.week.weekId.slice(0, 4)}년 · ${shortDateLabel(r.week.from)} – ${shortDateLabel(r.week.to)}` : null,
    statsLine: r ? `게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건` : null,
    photo: r?.coverImage ?? null,
  })
}
