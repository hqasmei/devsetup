/**
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  email text
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'email');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
* SETUPS
* This table contains information about setups created by users.
*/
create table setups (
  setup_id uuid default gen_random_uuid() primary key,
  name text not null,  -- Name of the setup
  user_id uuid references users(id) not null  -- User who created the setup
);

/**
* SETUP_ITEMS
* This table links items to setups.
*/
create table setup_items (
  setup_item_id uuid default gen_random_uuid() primary key,
  setup_id uuid references setups(setup_id) not null,
  category text,
  type text,
  brand text,
  model text,
  owner_id uuid references users(id) not null -- Establish a foreign key relationship with users
);

/**
* Allow users to add items to their setups.
* This policy allows users to insert items into setups that they own.
*/
create policy "Can add items to own setups" on setup_items for insert with check (auth.uid() = (select user_id from setups where setup_id = setup_items.setup_id));

/**
* SETUP_IMAGES
* This table links images to setups.
*/
create table setup_images (
  setup_image_id uuid default gen_random_uuid() primary key,
  setup_id uuid references setups(setup_id) not null,
  image_url text -- URL of the setup image (string)
);

 