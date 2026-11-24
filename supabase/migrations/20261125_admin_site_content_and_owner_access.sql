-- Admin: editable site content (pricing overrides, offer banner) and owner-only access to sign-offs.
-- Public can read site_content; only the signed-in owner (email below) can write it or read/delete sign-offs.
create table public.site_content (
  key text primary key check (key in ('pricing', 'offer')),
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
revoke all on table public.site_content from anon, authenticated;
grant select on table public.site_content to anon, authenticated;
grant insert, update, delete on table public.site_content to authenticated;

create policy "public can read site content"
  on public.site_content for select to anon, authenticated using (true);

create policy "owner can insert site content"
  on public.site_content for insert to authenticated
  with check (lower((select auth.jwt() ->> 'email')) = 'md.riyazzen369@gmail.com');

create policy "owner can update site content"
  on public.site_content for update to authenticated
  using (lower((select auth.jwt() ->> 'email')) = 'md.riyazzen369@gmail.com')
  with check (lower((select auth.jwt() ->> 'email')) = 'md.riyazzen369@gmail.com');

create policy "owner can delete site content"
  on public.site_content for delete to authenticated
  using (lower((select auth.jwt() ->> 'email')) = 'md.riyazzen369@gmail.com');

grant select, delete on table public.client_signoffs to authenticated;

create policy "owner can read signoffs"
  on public.client_signoffs for select to authenticated
  using (lower((select auth.jwt() ->> 'email')) = 'md.riyazzen369@gmail.com');

create policy "owner can delete signoffs"
  on public.client_signoffs for delete to authenticated
  using (lower((select auth.jwt() ->> 'email')) = 'md.riyazzen369@gmail.com');
