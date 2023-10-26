import React from 'react';

import { cookies } from 'next/headers';

import MobilePreview from '@/components/mobile-preview';
import Products from '@/components/products';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

export const revalidate = 0;

const ProductsPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-row w-full items-start">
      <Products />
      <MobilePreview user={user} />
    </div>
  );
};

export default ProductsPage;
