import React from 'react';

import { cookies } from 'next/headers';

import MobilePreview from '@/components/mobile-preview';
import ProductsSection from '@/components/products-section';
import { createClient } from '@/utils/supabase/server';

const ProductsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-row w-full items-start">
      <ProductsSection />
      <MobilePreview user={user} />
    </div>
  );
};

export default ProductsPage;
