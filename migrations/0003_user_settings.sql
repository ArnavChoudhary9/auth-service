-- =========================================================
-- Enums
-- =========================================================
create type user_status as enum ('active', 'inactive');

-- =========================================================
-- User Settings
-- =========================================================
create table if not exists public.user_settings (
    id uuid primary key
        references public.user_profiles(id)
        on delete cascade,

    status user_status not null default 'active',
    visibility boolean not null default false,
    notifications_allowed boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================================
-- Trigger
-- =========================================================
create trigger trg_user_settings_updated_at
before update on public.user_settings
for each row
execute function public.set_updated_at();

-- =========================================================
-- RLS
-- =========================================================
alter table public.user_settings enable row level security;

create policy "manage_own_settings"
on public.user_settings
for all
using (auth.uid() = id)
with check (auth.uid() = id);

-- Public read (visibility controlled)
create policy "public_read_visible_profiles"
on public.user_profiles
for select
using (
    deleted_at is null
    and exists (
        select 1
        from public.user_settings us
        where us.id = user_profiles.id
          and us.visibility = true
    )
);
