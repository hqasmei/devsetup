'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import ImageSlider from '@/components/image-slider';
import { useShareSetupModal } from '@/components/modals/share-setup-modal';
import { Product } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';

const MobilePreview = ({ user }: { user: any }) => {
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

  const { setShowShareSetupModal, ShareSetupModal } = useShareSetupModal();

  useEffect(() => {
    const getProducts = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user?.id);

      if (data) {
        data.sort((a, b) => a.position - b.position);
        setProducts(data);
      }
    };

    const getImages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from('images')
        .select('*')
        .eq('user_id', user?.id);

      if (data) {
        data.sort((a, b) => a.position - b.position);
        setImages(data);
      }
    };

    const productChanges = supabase
      .channel('preview products channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newProduct = [payload.new];
            setProducts((prevProducts) => [...prevProducts, ...newProduct]);
          } else if (payload.eventType === 'DELETE') {
            // Handle delete event here
            const deletedId = payload.old.product_id; // Use the correct column name
            setProducts((prevProducts) =>
              prevProducts.filter((item) => item.product_id !== deletedId),
            );
          } else if (payload.eventType === 'UPDATE') {
            // Handle update event here
            const updatedProduct = payload.new;
            setProducts((prevProducts) =>
              prevProducts.map((item) =>
                item.product_id === updatedProduct.product_id
                  ? updatedProduct
                  : item,
              ),
            );
          }
        },
      )
      .subscribe();

    getProducts();
    getImages();
    return () => {
      supabase.removeChannel(productChanges);
    };
  }, [products, setProducts, setImages]);

  // Use reduce to group products by category
  const productsByCategory: { [key: string]: Product[] } = products.reduce(
    (result, product) => {
      const { product_category } = product;
      if (!result[product_category]) {
        result[product_category] = [];
      }
      result[product_category].push(product);
      return result;
    },
    {},
  );

  return (
    <div className="hidden md:flex md:w-1/2 items-start justify-center h-screen py-12">
      <div className="relative  border-[14px] border-zinc-800 rounded-[2.5rem] lg:rounded-[3rem] w-auto aspect-[9/19] overflow-hidden  max-w-[20rem] min-w-[20rem] mx-auto">
        <ShareSetupModal />
        <div className="flex flex-col space-y-2">
          <span className="flex justify-end  pr-4 pt-4">
            <button onClick={() => setShowShareSetupModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6l-4-4l-4 4m4-4v13"
                />
              </svg>
            </button>
          </span>
          {images.length != 0 ? (
            <div className="text-white flex flex-col w-full   sm:px-0 items-start">
              <div className="flex  w-full">
                <ImageSlider isRounded={false} images={images} height="170px" />
              </div>
            </div>
          ) : (
            <div className="h-48 w-full bg-zinc-900 mt-6 items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </g>
              </svg>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 px-4">
            <div className="flex flex-row items-center space-x-2">
              <Image
                src={user.user_metadata.avatar_url}
                alt="User profile"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-sm ">{user.user_metadata.full_name}</span>
            </div>
          </div>

          <div className="px-4 flex flex-col space-y-2">
            {Object.entries(productsByCategory).map(
              ([category, categoryProducts]) => (
                <div key={category}>
                  <span className="font-bold text-sm">{category}</span>
                  <ul className="font-thin text-sm list-inside list-disc">
                    {categoryProducts.map((product) => (
                      <li key={product.product_id}>{product.product_name}</li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
