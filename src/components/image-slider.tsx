import React from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ImageSlider = ({ images }: { images: any }) => {
  return (
    <Swiper
      // cssMode={true}
      pagination={{
        dynamicBullets: true,
      }}
      // navigation={true}
      modules={[Pagination, Navigation]}
      id="swiper-1"
      className="flex w-full rounded-lg"
    >
      {images.map((image: any, idx: any) => {
        return (
          <SwiperSlide key={idx}>
            <div className="image-container w-full h-64">
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
