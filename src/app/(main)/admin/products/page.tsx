import React from 'react';

import { cookies } from 'next/headers';

import MobilePreview from '@/components/mobile-preview';
import ProductsSection from '@/components/products-section';
import { createClient } from '@/utils/supabase/server';
import { ProductProps } from '@/lib/types';

const ProductsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user?.id);

  return (
    <div className="flex flex-row w-full items-start">
      <ProductsSection input={data as ProductProps[]} />
      <MobilePreview user={user} />
    </div>
  );
};

export default ProductsPage;
