import 'server-only'
import { parseAllowedUrl } from './config'

const TIMEOUT_MS = 8_000
const MAX_BYTES = 5 * 1024 * 1024
const MAX_REDIRECTS = 3

export class FetchError extends Error {
  constructor(message: string, public status = 400) {
    super(message)
  }
}

/**
 * 허용 도메인만 여는 fetch. 리다이렉트는 직접 따라가며 매 단계 주소를 다시 검사한다(SSRF 방지).
 * 반환: 최종 URL, 응답 헤더, 본문(최대 5MB)
 */
export async function safeFetch(input: string, accept: string) {
  let url = parseAllowedUrl(input)
  if (!url) throw new FetchError('허용되지 않은 주소입니다')

  const signal = AbortSignal.timeout(TIMEOUT_MS)
  for (let hop = 0; ; hop++) {
    let res: Response
    try {
      res = await fetch(url, {
        redirect: 'manual',
        signal,
        headers: {
          accept,
          'user-agent': 'Mozilla/5.0 (compatible; DefenseTodayCardnewsHub/1.0)',
        },
        cache: 'no-store',
      })
    } catch {
      throw new FetchError('페이지를 불러오지 못했습니다 (시간 초과 또는 연결 실패)', 502)
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location')
      if (!location || hop >= MAX_REDIRECTS) throw new FetchError('리다이렉트가 너무 많습니다', 502)
      const next = parseAllowedUrl(new URL(location, url).toString())
      if (!next) throw new FetchError('허용되지 않은 주소로 이동합니다')
      url = next
      continue
    }
    if (!res.ok) throw new FetchError(`원격 서버 응답 오류 (${res.status})`, 502)

    const declared = Number(res.headers.get('content-length') ?? 0)
    if (declared > MAX_BYTES) throw new FetchError('응답이 너무 큽니다', 413)
    const body = await readLimited(res)
    return { url, headers: res.headers, body }
  }
}

async function readLimited(res: Response): Promise<Uint8Array> {
  if (!res.body) return new Uint8Array()
  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_BYTES) {
      await reader.cancel()
      throw new FetchError('응답이 너무 큽니다', 413)
    }
    chunks.push(value)
  }
  const out = new Uint8Array(total)
  let offset = 0
  for (const c of chunks) {
    out.set(c, offset)
    offset += c.byteLength
  }
  return out
}
