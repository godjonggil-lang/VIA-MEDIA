import Image from 'next/image'
import type { Category } from '@/lib/config'
import CategoryTag from './CategoryTag'

type Props = {
  title: string
  url: string
  image: string | null // 이미 프록시 경로로 변환된 주소
  tag?: Category // 한 게시물 안에 뉴스·칼럼이 섞일 때만 카드마다 표시
  first?: boolean // 맨 위 게시물: 우선순위 높임
}

// 모바일: 가로형(썸네일 + 제목) — 여러 건이 한 화면에 들어오도록
// sm 이상: 세로형(사진 위, 제목 아래)
export default function ArticleCard({ title, url, image, tag, first }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex sm:flex-col gap-3 sm:gap-0 p-2 sm:p-0 h-full rounded-lg border border-navy/10 bg-white shadow-[0_1px_3px_rgba(13,13,77,0.06)] overflow-hidden transition-colors hover:border-point focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-point`}
    >
      <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded bg-navy/5 sm:w-full sm:rounded-none">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 112px"
            className="object-cover"
            loading="eager" // 상단 게시물은 첫 화면에 보이므로 지연 로딩하지 않음
            fetchPriority={first ? 'high' : 'auto'}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-navy text-[11px] font-semibold tracking-wide text-white/70">
            DEFENSE TODAY
          </div>
        )}
      </div>
      <div className="self-center sm:self-auto sm:px-3.5 sm:py-3">
        {tag && <CategoryTag category={tag} className="mb-1" />}
        <h3 className="text-[15px] leading-[1.35] font-semibold text-navy line-clamp-3 sm:line-clamp-2 group-hover:underline decoration-point underline-offset-2">
          {title}
        </h3>
      </div>
    </a>
  )
}
