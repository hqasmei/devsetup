import React from 'react';

import { cookies } from 'next/headers';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import MobilePreview from '@/components/mobile-preview';
import PhotoSection from '@/components/photo-section';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

export const revalidate = 0;

const SetupPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: setups } = await supabase
    .from('setups')
    .select('*')
    .eq('user_id', user?.id);

  return (
    <div className="flex flex-row w-full">
      <PhotoSection />
      <MobilePreview user={user} />
    </div>
  );
};

export default SetupPage;
