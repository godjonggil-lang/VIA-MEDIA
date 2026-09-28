import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWeek } from '@/lib/db'
import WeekPage, { weekMetadata } from '@/components/WeekPage'

export const revalidate = 3600

// 빌드 때는 만들지 않고, 첫 방문 시 생성 후 캐시
export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: PageProps<'/week/[weekId]'>): Promise<Metadata> {
  const { weekId } = await props.params
  const week = await getWeek(decodeURIComponent(weekId))
  return weekMetadata(week, week ? `${week.week_no}주차 (${week.range_label})` : undefined)
}

export default async function Page(props: PageProps<'/week/[weekId]'>) {
  const { weekId } = await props.params
  const week = await getWeek(decodeURIComponent(weekId))
  if (!week) notFound()
  return <WeekPage week={week} />
}
