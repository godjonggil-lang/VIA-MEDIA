import Image from 'next/image'

type Props = {
  title: string
  url: string
  image: string | null // 이미 프록시 경로로 변환된 주소
  first?: boolean // 첫 섹션: 우선순위 높임
}

// 모바일: 가로형(썸네일 + 제목) — 6건이 한 화면에 들어오도록
// sm 이상: 세로형(사진 위, 제목 아래)
export default function ArticleCard({ title, url, image, first }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex sm:flex-col gap-3 sm:gap-0 rounded-lg border border-navy/10 bg-white shadow-[0_1px_3px_rgba(13,13,77,0.06)] overflow-hidden p-2 sm:p-0 transition-colors hover:border-point focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-point"
    >
      <div className="relative aspect-video w-28 shrink-0 sm:w-full overflow-hidden rounded sm:rounded-none bg-navy/5">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 112px"
            className="object-cover"
            loading="eager" // 6건 모두 첫 화면에 보이므로 지연 로딩하지 않음
            fetchPriority={first ? 'high' : 'auto'}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-navy text-[11px] font-semibold tracking-wide text-white/70">
            DEFENSE TODAY
          </div>
        )}
      </div>
      <h3 className="self-center sm:self-auto text-[15px] leading-[1.35] font-semibold text-navy line-clamp-3 sm:line-clamp-2 sm:px-3.5 sm:py-3 group-hover:underline decoration-point underline-offset-2">
        {title}
      </h3>
    </a>
  )
}
