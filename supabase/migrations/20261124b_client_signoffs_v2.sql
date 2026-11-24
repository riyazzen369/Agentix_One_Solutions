-- Aligns client_signoffs with the sign-off handoff: receipt reference, DPA naming,
-- fourth acceptance ("I accept the terms and sign") and typed-name signature method.
alter table public.client_signoffs rename column accepted_data to accepted_dpa;
alter table public.client_signoffs add column ref text;
alter table public.client_signoffs add column accepted_terms boolean not null default true check (accepted_terms);
alter table public.client_signoffs add column method text not null default 'typed-name' check (method = 'typed-name');
create unique index client_signoffs_ref_key on public.client_signoffs (ref);
comment on column public.client_signoffs.ref is 'Receipt reference shown to the client, e.g. AGX-20261124-1A2B3C';
comment on column public.client_signoffs.address_or_place is 'Business address or place';
