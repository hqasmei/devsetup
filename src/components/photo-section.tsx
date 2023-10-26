'use client';

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Dropzone from '@/components/dropzone';
import ChevronLeft from '@/components/icons/chevron-left';
import { UploadButton } from '@/lib/uploadthing';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PhotoSection() {
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();
  const params = useParams();
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getImages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from('images')
        .select('*')
        .eq('user_id', user?.id);

      if (data) {
        setImages(data);
      }
    };

    getImages();
  }, [supabase, setImages]);

  return (
    <div className="w-full md:w-1/2 h-screen border-r p-4 items-center justify-start flex flex-col">
      <div className="max-w-xl flex  flex-col w-full justify-start  items-start">
        <span className="text-lg font-bold my-2 text-center w-full items-center justify-center">
          Add your setup photos
        </span>
        <div className="w-full grid grid-cols-3 gap-4">
          <Dropzone />

          {images.map((image, idx) => {
            return (
              <div
                key={idx}
                className="text-white flex flex-col items-center w-full  px-4 md:px-0"
              >
                <div className="max-w-4xl flex flex-1 w-full flex-col items-start h-48">
                  <Image
                    priority
                    src={image.image_url}
                    alt=""
                    width={1000}
                    height={1000}
                    className="rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
