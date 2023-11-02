import React from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ImageSlider = ({
  images,
  height,
  isRounded,
}: {
  images: any;
  height: string;
  isRounded: boolean;
}) => {
  const roundedClass = isRounded ? 'sm:rounded-xl' : '';

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Navigation]}
      id="swiper-1"
      className={`flex w-full ${roundedClass}`}
    >
      {images.map((image: any, idx: any) => {
        return (
          <SwiperSlide key={idx}>
            <div className="image-container w-full" style={{ height: height }}>
              <img
                src={image.image_url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
