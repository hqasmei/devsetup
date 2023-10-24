import Reac from 'react';

import { cookies } from 'next/headers';
import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import LogoutButton from '../components/logout-button';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Navbar = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="w-full flex justify-center h-16">
      <div className="w-full  flex justify-between items-center text-sm text-foreground">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <DevSetupLogo />
          <span className="font-medium text-lg">DevSetup</span>
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
            className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
              Login
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
