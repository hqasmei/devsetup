import React from 'react';

import { cookies } from 'next/headers';

import MobilePreview from '@/components/mobile-preview';
import PhotosSection from '@/components/photos-section';
import { ImageProps } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';

export default async function SetupPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('images')
    .select('*')
    .eq('user_id', user?.id);

  return (
    <div className="flex flex-row w-full">
      <PhotosSection input={data as ImageProps[]} />
      <MobilePreview user={user} />
    </div>
  );
}
