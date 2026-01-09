-- =========================================================
-- User Profiles
-- =========================================================
create table if not exists public.user_profiles (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    username text not null
        check (username ~ '^[a-zA-Z0-9_]{3,32}$'),

    first_name text not null check (char_length(first_name) <= 100),
    last_name  text not null check (char_length(last_name) <= 100),

    avatar text check (avatar is null or avatar ~* '^https?://'),
    bio text check (bio is null or char_length(bio) <= 1000),
    location text check (location is null or char_length(location) <= 255),

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    deleted_at timestamptz
);

-- =========================================================
-- Trigger
-- =========================================================
create trigger trg_user_profiles_updated_at
before update on public.user_profiles
for each row
execute function public.set_updated_at();

-- =========================================================
-- Indexes
-- =========================================================
create unique index if not exists idx_user_profiles_username_active
on public.user_profiles (username)
where deleted_at is null;

create index if not exists idx_user_profiles_active
on public.user_profiles (id)
where deleted_at is null;

-- =========================================================
-- RLS
-- =========================================================
alter table public.user_profiles enable row level security;

-- Owner read
create policy "read_own_profile"
on public.user_profiles
for select
using (auth.uid() = id and deleted_at is null);

-- Insert self
create policy "insert_own_profile"
on public.user_profiles
for insert
with check (auth.uid() = id);

-- Update self (includes soft delete)
create policy "update_own_profile"
on public.user_profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);
