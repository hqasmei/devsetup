import React from 'react';
 

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ImageSlider = ({ images }: { images: any }) => {
  return (
    <Swiper
      cssMode={true}
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      id="swiper-1"
      className="flex w-full rounded-lg"
    >
      {images.map((image: any, idx: any) => {
        return (
          <SwiperSlide key={idx}>
            <img src={image.image_url} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
