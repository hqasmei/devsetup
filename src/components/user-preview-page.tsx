import React from 'react';

import Image from 'next/image';

import ImageSlider from '@/components/image-slider';
import { useShareSetupModal } from '@/components/modals/share-setup-modal';
import { ProductProps } from '@/lib/types';

const UserPreviewPage = ({
  user,
  images,
  products,
}: {
  user: any;
  images: any;
  products: any;
}) => {
  const { setShowShareSetupModal, ShareSetupModal } = useShareSetupModal();
  let userData = null; // Initialize userData to null or some default value
  if (user && user.user && user.user.user_metadata) {
    userData = user.user.user_metadata;
  }
  const productsByCategory: { [key: string]: ProductProps[] } = products.reduce(
    (result: any, product: any) => {
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
    <>
      <ShareSetupModal />
      <div className="flex h-screen justify-center">
        <div className="flex flex-col  w-full sm:max-w-lg">
          <span className="flex justify-end py-4 px-8 sm:px-0">
            <button onClick={() => setShowShareSetupModal(true)}>
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
                  d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6l-4-4l-4 4m4-4v13"
                />
              </svg>
            </button>
          </span>
          {images.length != 0 ? (
            <div className="text-white flex flex-col w-full sm:px-0 items-start">
              <div className="flex  w-full">
                <ImageSlider isRounded={true} images={images} height="360px" />
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

          <div className="grid grid-cols-1 gap-4 md:px-0 px-4">
            {userData && (
              <div className="flex flex-row items-center space-x-2 mt-4 mb-2">
                <Image
                  src={userData.avatar_url}
                  alt="User profile"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="text-sm ">{userData.full_name}</span>
              </div>
            )}
          </div>

          <div className="md:px-0 px-4 flex flex-col space-y-2 mt-4">
            {Object.entries(productsByCategory).map(
              ([category, categoryProducts]) => (
                <div key={category}>
                  <span className="font-bold text-lg">{category}</span>
                  <ul className="font-thin text-md list-inside list-disc">
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
    </>
  );
};

export default UserPreviewPage;
