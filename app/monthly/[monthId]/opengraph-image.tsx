import { getMonthlyReport } from '@/lib/report'
import { reportOgImage, OG_SIZE } from '@/lib/report-og'
import { MONTHLY_NAME, MONTHLY_NAME_EN } from '@/lib/config'

export const alt = `${MONTHLY_NAME} (${MONTHLY_NAME_EN})`
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ monthId: string }> }) {
  const r = await getMonthlyReport((await params).monthId)
  return reportOgImage({
    nameEn: MONTHLY_NAME_EN,
    name: MONTHLY_NAME,
    highlight: r ? `${r.month.month}월` : null,
    period: r ? `${r.month.year}년 ${r.month.month}월 · ${r.weeks.length}개 주차` : null,
    statsLine: r ? `게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건` : null,
    photo: r?.coverImage ?? null,
  })
}
