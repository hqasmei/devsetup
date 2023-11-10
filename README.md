# devsetup

npx supabase start
psql -h localhost -U postgres -p 54322
npx supabase db dump --data-only -f supabase/seed.sql
psql -h localhost -U postgres -p 54322 -f supabase/seed.sql

UX Updates
[] Loading skeletons for images and products
[] Updated Settings Page
[]
[]
[] 