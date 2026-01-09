-- =========================================================
-- Enums
-- =========================================================
create type notification_type as enum (
    'Alerts',
    'Marketing',
    'Newsletter'
);

-- =========================================================
-- User Notifications
-- =========================================================
create table if not exists public.user_notifications (
    id uuid
        references public.user_profiles(id)
        on delete cascade,

    type notification_type not null,

    created_at timestamptz not null default now(),

    primary key (id, type)
);

-- =========================================================
-- Index
-- =========================================================
create index if not exists idx_user_notifications_user
on public.user_notifications (id);

-- =========================================================
-- RLS
-- =========================================================
alter table public.user_notifications enable row level security;

create policy "manage_own_notifications"
on public.user_notifications
for all
using (auth.uid() = id)
with check (auth.uid() = id);
