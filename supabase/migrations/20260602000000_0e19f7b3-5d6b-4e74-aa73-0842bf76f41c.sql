-- Storage access policies for the Portfolio bucket
-- Drop any existing policy definitions first so this script can be re-run safely.
drop policy if exists "Admins can upload portfolio images" on "storage"."objects";
drop policy if exists "Admins can delete portfolio images" on "storage"."objects";
drop policy if exists "Admins can update portfolio images" on "storage"."objects";
drop policy if exists "Anyone can read portfolio images" on "storage"."objects";

create policy "Admins can upload portfolio images"
on "storage"."objects" for insert
to authenticated
with check (
  bucket_id = 'Portfolio'
  and public.has_role(auth.uid(), 'admin')
);

create policy "Admins can delete portfolio images"
on "storage"."objects" for delete
to authenticated
using (
  bucket_id = 'Portfolio'
  and public.has_role(auth.uid(), 'admin')
);

create policy "Admins can update portfolio images"
on "storage"."objects" for update
to authenticated
using (
  bucket_id = 'Portfolio'
  and public.has_role(auth.uid(), 'admin')
)
with check (
  bucket_id = 'Portfolio'
  and public.has_role(auth.uid(), 'admin')
);

create policy "Anyone can read portfolio images"
on "storage"."objects" for select
to anon, authenticated
using (
  bucket_id = 'Portfolio'
);
