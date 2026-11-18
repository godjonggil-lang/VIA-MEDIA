import { ImageResponse } from 'next/og'

// 카톡·메일 등으로 리포트 링크를 보낼 때 뜨는 미리보기 이미지 (주간·월간 공용)
export const OG_SIZE = { width: 1200, height: 630 }

// 한글 글꼴 (Pretendard 상용 한글 2,350자 세트, ~350KB)
const FONT_URL = 'https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff-subset/Pretendard-Bold.subset.woff'

type Props = {
  nameEn: string
  name: string // '디펜스투데이 주간 리포트' → '디펜스투데이' / '주간 리포트 46주차' 두 줄로 끊는다
  highlight: string | null
  period: string | null
  statsLine: string | null
  photo: string | null
}

export async function reportOgImage({ nameEn, name, highlight, period, statsLine, photo }: Props) {
  const font = await fetch(FONT_URL, { cache: 'force-cache' }).then((res) => res.arrayBuffer())
  const [first, ...rest] = name.split(' ')
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#0D0D4D', fontFamily: 'Pretendard' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: photo ? 640 : 1200, padding: '0 64px' }}>
          <div style={{ fontSize: 22, letterSpacing: 3, color: '#FEFFAA' }}>{nameEn.toUpperCase()}</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18, fontSize: 64, color: '#FFFFFF', lineHeight: 1.15 }}>
            <span>{first}</span>
            <span style={{ display: 'flex' }}>
              {rest.join(' ')}
              {highlight && <span style={{ marginLeft: 18, color: '#FEFFAA' }}>{highlight}</span>}
            </span>
          </div>
          {period && <div style={{ marginTop: 18, fontSize: 30, color: 'rgba(255,255,255,0.8)' }}>{period}</div>}
          {statsLine && <div style={{ marginTop: 34, fontSize: 28, color: '#FFFFFF' }}>{statsLine}</div>}
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={photo} width={560} height={630} style={{ objectFit: 'cover' }} />
        )}
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: 'Pretendard', data: font, weight: 700, style: 'normal' }] },
  )
}
