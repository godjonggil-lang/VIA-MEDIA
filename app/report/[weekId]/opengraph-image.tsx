import { ImageResponse } from 'next/og'
import { getWeeklyReport } from '@/lib/report'
import { shortDateLabel } from '@/lib/week'
import { REPORT_NAME, REPORT_NAME_EN } from '@/lib/config'

// 카톡·메일 등으로 리포트 링크를 보낼 때 뜨는 미리보기 이미지
export const alt = `${REPORT_NAME} (${REPORT_NAME_EN})`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// 한글 글꼴 (Pretendard 상용 한글 2,350자 세트, ~350KB)
const FONT_URL = 'https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff-subset/Pretendard-Bold.subset.woff'

export default async function Image({ params }: { params: Promise<{ weekId: string }> }) {
  const { weekId } = await params
  const [r, font] = await Promise.all([
    getWeeklyReport(weekId),
    fetch(FONT_URL, { cache: 'force-cache' }).then((res) => res.arrayBuffer()),
  ])
  const photo = r?.coverImage ?? null

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#0D0D4D', fontFamily: 'Pretendard' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: photo ? 640 : 1200, padding: '0 64px' }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: '#FEFFAA' }}>{REPORT_NAME_EN.toUpperCase()}</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18, fontSize: 64, color: '#FFFFFF', lineHeight: 1.15 }}>
            {/* '디펜스투데이' / '주간 리포트 46주차' 로 끊어 읽히게 */}
            <span>{REPORT_NAME.split(' ')[0]}</span>
            <span style={{ display: 'flex' }}>
              {REPORT_NAME.split(' ').slice(1).join(' ')}
              {r && <span style={{ marginLeft: 18, color: '#FEFFAA' }}>{`${r.week.weekNo}주차`}</span>}
            </span>
          </div>
          {r && (
            <div style={{ marginTop: 18, fontSize: 30, color: 'rgba(255,255,255,0.8)' }}>
              {`${r.week.weekId.slice(0, 4)}년 · ${shortDateLabel(r.week.from)} – ${shortDateLabel(r.week.to)}`}
            </div>
          )}
          {r && (
            <div style={{ marginTop: 34, fontSize: 28, color: '#FFFFFF' }}>
              {`게시물 ${r.stats.posts}개 · 기사 ${r.stats.items}건`}
            </div>
          )}
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={photo} width={560} height={630} style={{ objectFit: 'cover' }} />
        )}
      </div>
    ),
    { ...size, fonts: [{ name: 'Pretendard', data: font, weight: 700, style: 'normal' }] },
  )
}
