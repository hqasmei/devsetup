'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import ChevronRight from '@/components/icons/chevron-right';
import ImageSlider from '@/components/image-slider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SetupCard = ({ setup }: { setup: any }) => {
  const supabase = createClientComponentClient();
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const getImages = async () => {
      const { data, error } = await supabase
        .from('setup_images')
        .select('image_url')
        .eq('setup_id', setup.setup_id);

      if (data) {
        setImages(data);
      } else {
        console.log(error);
      }
    };

    getImages();
  }, [supabase, setImages]);

  return (
    <Link
      href={`/admin/${setup.setup_id}`}
      className="flex flex-col space-y-3 z-0 group"
    >
      {images && <ImageSlider images={images} />}
      <div className="flex flex-row justify-between items-center">
        <span className="items-end flex">{setup.name}</span>
        <ChevronRight />
      </div>
    </Link>
  );
};

export default SetupCard;
