import { NextResponse } from 'next/server'
import { listWeeks } from '@/lib/db'

// Vercel Cron 이 3일마다 호출 — Supabase 무료 플랜 자동 일시중지 방지 (vercel.json)
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await listWeeks()
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error('[keepalive] Supabase ping failed:', message)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() })
}
