import React from 'react';

import { cookies } from 'next/headers';
import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import LogoutButton from '../components/logout-button';

export const dynamic = 'force-dynamic';

const Navbar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <DevSetupLogo />
          <span>devsetup</span>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
