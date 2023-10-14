import { cache } from 'react';

import { cookies } from 'next/headers';

import HeroSection from '@/components/hero-section';
import Navbar from '@/components/navbar';
import { createServerComponentClient as _createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient({ cookies: () => cookieStore });
});

const Home = async () => {
  const supabase = createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
