
-- Fix search_path warnings
create or replace function public.touch_updated_at()
returns trigger language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Restrict EXECUTE on SECURITY DEFINER functions
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.bootstrap_first_admin() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;
