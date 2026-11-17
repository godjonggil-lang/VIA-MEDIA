import { permanentRedirect } from 'next/navigation'

// 예전 주간 주소(/week/2026-W40) → 주간 리포트(/report/2026-W40)
export default async function Page(props: PageProps<'/week/[weekId]'>) {
  const { weekId } = await props.params
  permanentRedirect(`/report/${encodeURIComponent(decodeURIComponent(weekId))}`)
}
