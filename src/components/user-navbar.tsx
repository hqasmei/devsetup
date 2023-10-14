import React from 'react';

import { cookies } from 'next/headers';
import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import UserButton from './user-button';

export const dynamic = 'force-dynamic';

const UserNavbar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: users, error } = await supabase
    .from('users')
    .select('avatar_url, full_name, email')
    .eq('id', user?.id);

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <Link
          href="/admin"
          className="flex flex-row space-x-2 items-center justify-center"
        >
          <DevSetupLogo />
          <span>devsetup</span>
        </Link>

        {user && (
          <div className="flex flex-row items-center gap-4">
            {users && <UserButton props={users[0]} />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
