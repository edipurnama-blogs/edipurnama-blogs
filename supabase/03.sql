alter table public.site_settings
add column if not exists primary_color_history text[] not null default array['#14B8A6']::text[];

update public.site_settings
set primary_color_history = array[primary_color]
where primary_color_history is null or cardinality(primary_color_history) = 0;
