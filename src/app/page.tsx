import { cookies } from 'next/headers';

import HeroSection from '@/components/hero-section';
import Navbar from '@/components/navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Home = async () => {
  const supabase = createServerComponentClient({ cookies });

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
