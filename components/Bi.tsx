// 한글 + 영어 병기. 영어는 조금 작고 옅게.
export default function Bi({ ko, en, stack }: { ko: string; en: string; stack?: boolean }) {
  return stack ? (
    <span className="inline-flex flex-col leading-tight">
      <span>{ko}</span>
      <span className="text-[0.72em] font-medium opacity-70">{en}</span>
    </span>
  ) : (
    <>
      {ko}
      <span className="ml-1.5 text-[0.78em] font-medium opacity-70">{en}</span>
    </>
  )
}
