import React from 'react';

import { cookies } from 'next/headers';

import DesktopNav from '@/components/desktop-nav';
import MobileNav from '@/components/mobile-nav';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export const revalidate = 0;

const UserNavbar = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: users, error } = await supabase
    .from('users')
    .select('avatar_url, full_name, email')
    .eq('id', user?.id);

  return (
    <nav className="w-full flex flex-col justify-center items-center">
      <MobileNav user={user} users={users} />
      <DesktopNav user={user} users={users} />
    </nav>
  );
};

export default UserNavbar;
