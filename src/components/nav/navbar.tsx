import { cookies } from 'next/headers';
import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import LogoutButton from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

const Navbar = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
          <Button asChild variant="outline" className="bg-transparent/20">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
