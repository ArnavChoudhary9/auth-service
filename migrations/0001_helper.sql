-- =========================================================
-- Auto-update updated_at
-- =========================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- =========================================================
-- Safe UPSERT for user profile
-- =========================================================
create or replace function public.upsert_user_profile(
    p_username text,
    p_first_name text,
    p_last_name text,
    p_avatar text,
    p_bio text,
    p_location text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.user_profiles (
        id,
        username,
        first_name,
        last_name,
        avatar,
        bio,
        location
    )
    values (
        auth.uid(),
        p_username,
        p_first_name,
        p_last_name,
        p_avatar,
        p_bio,
        p_location
    )
    on conflict (id)
    do update set
        username   = excluded.username,
        first_name = excluded.first_name,
        last_name  = excluded.last_name,
        avatar     = excluded.avatar,
        bio        = excluded.bio,
        location   = excluded.location;
end;
$$;

revoke all on function public.upsert_user_profile from public;
grant execute on function public.upsert_user_profile to authenticated;
