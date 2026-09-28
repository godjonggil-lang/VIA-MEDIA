-- 옛 VIA MEDIA 테이블 삭제 (되돌릴 수 없음)
-- 대상: agendas(1행), articles(2행), site_settings(1행)
drop table if exists public.articles cascade;
drop table if exists public.agendas cascade;
drop table if exists public.site_settings cascade;
