-- 주간 묶음 → 일별 게시물 방식으로 전환
-- Supabase 대시보드 → SQL Editor → New query 에 이 파일 전체를 붙여넣고 Run.
-- 여러 번 실행해도 안전합니다. 기존 weeks/items 표는 지우지 않고 그대로 둡니다.

-- 게시물: 하루 인스타 게시물 1개 = 1행
create table if not exists public.posts (
  id         text primary key default gen_random_uuid()::text,
  post_date  date not null,
  topic      text,                       -- 선택: 머리글. 비우면 표시 안 함
  created_at timestamptz not null default now()
);
create index if not exists posts_date_idx on public.posts (post_date desc, created_at desc);

-- 게시물에 걸린 기사 (1~10건)
create table if not exists public.post_items (
  id         text primary key default gen_random_uuid()::text,
  post_id    text not null references public.posts(id) on delete cascade,
  sort_order int  not null check (sort_order between 1 and 10),
  category   text not null check (category in ('news', 'column')),
  title      text not null,
  url        text not null,
  image_url  text,
  created_at timestamptz not null default now(),
  unique (post_id, sort_order)
);

alter table public.posts enable row level security;
alter table public.post_items enable row level security;
drop policy if exists "public read" on public.posts;
drop policy if exists "public read" on public.post_items;
create policy "public read" on public.posts for select using (true);
create policy "public read" on public.post_items for select using (true);

-- 저장(새로 만들기 / 수정). p_post_id 가 null 이면 새 게시물.
create or replace function public.save_post(
  p_post_date date,
  p_items jsonb,
  p_topic text default null,
  p_post_id text default null
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id text;
begin
  if jsonb_array_length(p_items) < 1 then
    raise exception 'NO_ITEMS';
  end if;
  if p_post_id is null then
    insert into posts (post_date, topic) values (p_post_date, nullif(trim(p_topic), ''))
    returning id into v_id;
  else
    update posts set post_date = p_post_date, topic = nullif(trim(p_topic), '')
    where id = p_post_id
    returning id into v_id;
    if v_id is null then
      raise exception 'POST_NOT_FOUND';
    end if;
    delete from post_items where post_id = v_id;
  end if;

  insert into post_items (post_id, sort_order, category, title, url, image_url)
  select v_id, x.sort_order, x.category, x.title, x.url, nullif(x.image_url, '')
  from jsonb_to_recordset(p_items) as x(sort_order int, category text, title text, url text, image_url text);

  return v_id;
end;
$$;

create or replace function public.delete_post(p_post_id text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from posts where id = p_post_id;
$$;

revoke execute on function public.save_post(date, jsonb, text, text) from public, anon, authenticated;
revoke execute on function public.delete_post(text) from public, anon, authenticated;
grant execute on function public.save_post(date, jsonb, text, text) to service_role;
grant execute on function public.delete_post(text) to service_role;

-- 기존 주간 데이터 옮기기: 주마다 '뉴스 게시물 1개 + 칼럼 게시물 1개', 날짜는 그 주 금요일
insert into public.posts (id, post_date, created_at)
select 'legacy-' || w.week_id || '-' || s.section,
       to_date(replace(w.week_id, 'W', ''), 'IYYY-IW') + 4,
       -- 같은 날짜 안에서 뉴스가 위로 오도록 뉴스를 1초 늦게
       w.published_at + case when s.section = 'news' then interval '1 second' else interval '0' end
from public.weeks w
cross join (values ('news'), ('column')) as s(section)
on conflict (id) do nothing;

insert into public.post_items (post_id, sort_order, category, title, url, image_url)
select 'legacy-' || w.week_id || '-' || i.section, i.sort_order, i.section, i.title, i.url, i.image_url
from public.items i
join public.weeks w on w.id = i.week_id
on conflict (post_id, sort_order) do nothing;

-- 결과 확인
select p.post_date, count(pi.*) as items
from public.posts p left join public.post_items pi on pi.post_id = p.id
group by p.id, p.post_date order by p.post_date desc, p.created_at desc;
