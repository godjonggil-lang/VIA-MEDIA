-- 디펜스투데이 카드뉴스 HUB — DB 스키마
-- Supabase 대시보드 → SQL Editor → New query 에 이 파일 전체를 붙여넣고 Run.
-- 여러 번 실행해도 안전합니다.

create table if not exists public.weeks (
  id           text primary key default gen_random_uuid()::text,
  week_id      text not null unique check (week_id ~ '^\d{4}-W\d{2}$'),
  range_label  text not null,
  week_no      int  not null check (week_no between 1 and 53),
  is_current   boolean not null default false,
  published_at timestamptz not null default now()
);

-- '이번 주'는 전체에서 한 행만
create unique index if not exists weeks_single_current on public.weeks (is_current) where is_current;

create table if not exists public.items (
  id         text primary key default gen_random_uuid()::text,
  week_id    text not null references public.weeks(id) on delete cascade,
  section    text not null check (section in ('news', 'column')),
  sort_order int  not null check (sort_order between 1 and 3),
  title      text not null,
  url        text not null,
  image_url  text,
  created_at timestamptz not null default now(),
  unique (week_id, section, sort_order)
);

-- 공개 읽기만 허용. 쓰기는 서버(service role)만.
alter table public.weeks enable row level security;
alter table public.items enable row level security;
drop policy if exists "public read" on public.weeks;
drop policy if exists "public read" on public.items;
create policy "public read" on public.weeks for select using (true);
create policy "public read" on public.items for select using (true);

-- 발행/수정을 한 트랜잭션으로 처리.
-- p_original_week_id 가 null 이면 새 발행(이번 주로 지정), 아니면 기존 주차 수정.
create or replace function public.publish_week(
  p_week_id text,
  p_range_label text,
  p_week_no int,
  p_items jsonb,
  p_original_week_id text default null
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id text;
begin
  if p_original_week_id is null then
    if exists (select 1 from weeks where week_id = p_week_id) then
      raise exception 'WEEK_EXISTS';
    end if;
    update weeks set is_current = false where is_current;
    insert into weeks (week_id, range_label, week_no, is_current)
    values (p_week_id, p_range_label, p_week_no, true)
    returning id into v_id;
  else
    select id into v_id from weeks where week_id = p_original_week_id;
    if v_id is null then
      raise exception 'WEEK_NOT_FOUND';
    end if;
    if p_week_id <> p_original_week_id and exists (select 1 from weeks where week_id = p_week_id) then
      raise exception 'WEEK_EXISTS';
    end if;
    update weeks set week_id = p_week_id, range_label = p_range_label, week_no = p_week_no
    where id = v_id;
    delete from items where week_id = v_id;
  end if;

  insert into items (week_id, section, sort_order, title, url, image_url)
  select v_id, x.section, x.sort_order, x.title, x.url, nullif(x.image_url, '')
  from jsonb_to_recordset(p_items) as x(section text, sort_order int, title text, url text, image_url text);

  return v_id;
end;
$$;

-- 삭제. 지운 게 '이번 주'였다면 남은 것 중 가장 최신 주차를 '이번 주'로 올림.
create or replace function public.delete_week(p_week_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_was_current boolean;
begin
  delete from weeks where week_id = p_week_id returning is_current into v_was_current;
  if coalesce(v_was_current, false) then
    update weeks set is_current = true
    where id = (select id from weeks order by week_id desc limit 1);
  end if;
end;
$$;

-- 함수는 서버(service role)만 호출 가능
revoke execute on function public.publish_week(text, text, int, jsonb, text) from public, anon, authenticated;
revoke execute on function public.delete_week(text) from public, anon, authenticated;
grant execute on function public.publish_week(text, text, int, jsonb, text) to service_role;
grant execute on function public.delete_week(text) to service_role;
