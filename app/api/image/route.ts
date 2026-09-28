import { FetchError, safeFetch } from '@/lib/safe-fetch'

// 기사 이미지 프록시: 핫링크 차단·referrer 문제 회피 + 캐시
export async function GET(request: Request) {
  const src = new URL(request.url).searchParams.get('src')
  if (!src) return new Response('src 가 필요합니다', { status: 400 })

  try {
    const { headers, body } = await safeFetch(src, 'image/avif,image/webp,image/png,image/jpeg,image/*')
    const type = (headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase()
    // SVG 는 스크립트를 담을 수 있어 제외
    if (!type.startsWith('image/') || type === 'image/svg+xml') {
      return new Response('이미지가 아닙니다', { status: 415 })
    }
    return new Response(body as BodyInit, {
      headers: {
        'content-type': type,
        'cache-control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
        'x-content-type-options': 'nosniff',
        'content-security-policy': "default-src 'none'",
      },
    })
  } catch (e) {
    const status = e instanceof FetchError ? e.status : 500
    return new Response(e instanceof FetchError ? e.message : '오류', { status })
  }
}
