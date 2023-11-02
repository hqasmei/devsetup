'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import UserPreviewPage from '@/components/user-preview-page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const PreviewButton = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>();
  const [images, setImages] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const togglePreview = () => {
    setIsPreviewActive(!isPreviewActive);
  };
  const containerClassName = isPreviewActive ? 'fixed' : 'hidden';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data: userData, error: userError } =
  //       await supabase.auth.getUser();

  //     if (userData) {
  //       const { data: productsData, error: productsError } = await supabase
  //         .from('products')
  //         .select()
  //         .eq('user_id', userData.user?.id);
  //       const { data: imagesData, error: imagesError } = await supabase
  //         .from('images')
  //         .select('*')
  //         .eq('user_id', userData.user?.id);

  //       if (userData) {
  //         setUser(userData);
  //       }

  //       if (productsData) {
  //         productsData.sort((a, b) => a.position - b.position);
  //         setProducts(productsData);
  //       }

  //       if (imagesData) {
  //         setImages(imagesData);
  //       }
  //     }
  //   };

  //   const productChanges = supabase
  //     .channel('user data channel')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: '*',
  //         schema: 'public',
  //         table: 'products',
  //       },
  //       (payload) => {
  //         if (payload.eventType === 'INSERT') {
  //           const newProduct = [payload.new];
  //           setProducts((prevProducts) => [...prevProducts, ...newProduct]);
  //         } else if (payload.eventType === 'DELETE') {
  //           // Handle delete event here
  //           const deletedId = payload.old.product_id; // Use the correct column name
  //           setProducts((prevProducts) =>
  //             prevProducts.filter((item) => item.product_id !== deletedId),
  //           );
  //         } else if (payload.eventType === 'UPDATE') {
  //           // Handle update event here
  //           const updatedProduct = payload.new;
  //           setProducts((prevProducts) =>
  //             prevProducts.map((item) =>
  //               item.product_id === updatedProduct.product_id
  //                 ? updatedProduct
  //                 : item,
  //             ),
  //           );
  //         }
  //       },
  //     )
  //     .subscribe();

  //   fetchData();
  //   return () => {
  //     supabase.removeChannel(productChanges);
  //   };
  // }, []);

  return (
    <>
      <div className={containerClassName + ' left-0 top-0 z-20 h-full w-full'}>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 ">
          <UserPreviewPage user={user} images={images} products={products} />
        </div>
      </div>
      <div
        className={`fixed bottom-10 z-20 ${isPreviewActive ? '' : 'md:hidden'}`}
      >
        <Button
          onClick={togglePreview}
          variant="outline"
          className="flex flex-row space-x-2 items-center justify-center"
        >
          {isPreviewActive ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </g>
              </svg>
              <span>Preview</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default PreviewButton;
