import React, { cache } from 'react';

import { cookies } from 'next/headers';
import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import { createServerComponentClient as _createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import LogoutButton from '../components/logout-button';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient({ cookies: () => cookieStore });
});

const Navbar = async () => {
  const supabase = createServerComponentClient();
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
          <div className="flex flex-row items-center gap-4">
            <Link href="/admin" className="hover:text-white/70 duration-300">
              Admin
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="py-2 px-3 flex rounded no-underline bg-secondary/50 hover:bg-secondary/80 duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
