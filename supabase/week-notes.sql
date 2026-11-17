-- 주간 리포트 '에디터 노트' (선택). 주마다 2~3줄 요약.
-- Supabase 대시보드 → SQL Editor → New query 에 붙여넣고 Run. 여러 번 실행해도 안전합니다.

create table if not exists public.week_notes (
  week_id    text primary key check (week_id ~ '^\d{4}-W\d{2}$'),
  note       text not null,
  updated_at timestamptz not null default now()
);

alter table public.week_notes enable row level security;
drop policy if exists "public read" on public.week_notes;
create policy "public read" on public.week_notes for select using (true);
-- 쓰기는 서버(service role)만. service role 은 RLS 를 우회하므로 별도 정책 불필요.
