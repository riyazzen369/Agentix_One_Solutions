-- Client sign-offs (MSA, SOW terms, Data & Platform Compliance Acknowledgement).
-- The public (publishable/anon) key may only INSERT. Read rows in the Supabase dashboard.
create table public.client_signoffs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 10 and 20),
  address_or_place text not null check (char_length(address_or_place) between 2 and 300),
  accepted_msa boolean not null check (accepted_msa),
  accepted_sow boolean not null check (accepted_sow),
  accepted_data boolean not null check (accepted_data),
  agreement_version text not null check (char_length(agreement_version) <= 40),
  agreement_hash text not null check (char_length(agreement_hash) = 64),
  user_agent text check (char_length(user_agent) <= 400)
);

comment on table public.client_signoffs is 'Client acceptances of MSA, SOW and Data & Platform Compliance Acknowledgement. Insert-only for the public key; read in the Supabase dashboard.';

alter table public.client_signoffs enable row level security;

revoke all on table public.client_signoffs from anon, authenticated;
grant insert on table public.client_signoffs to anon;

create policy "anon can insert signoffs"
  on public.client_signoffs
  for insert
  to anon
  with check (true);
