-- =========================================================
-- User Metadata
-- =========================================================
create table if not exists public.user_metadata (
    id uuid primary key
        references public.user_profiles(id)
        on delete cascade,

    joined_date timestamptz not null default now(),
    last_password_update_date timestamptz
);

-- =========================================================
-- RLS
-- =========================================================
alter table public.user_metadata enable row level security;

create policy "manage_own_metadata"
on public.user_metadata
for all
using (auth.uid() = id)
with check (auth.uid() = id);
