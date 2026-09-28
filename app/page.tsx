import type { Metadata } from 'next'
import { getCurrentWeek } from '@/lib/db'
import WeekPage, { weekMetadata } from '@/components/WeekPage'

// 정적 생성 + 10분 주기 재검증. 발행 시에는 즉시 revalidatePath('/') 로 갱신된다.
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  return weekMetadata(await getCurrentWeek())
}

export default async function Home() {
  return <WeekPage week={await getCurrentWeek()} isMain />
}
