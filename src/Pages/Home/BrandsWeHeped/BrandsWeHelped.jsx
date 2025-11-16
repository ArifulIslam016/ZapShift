import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import amazonImg from '../../../assets/brands/amazon.png'
import amazonVecktorImg from '../../../assets/brands/amazon_vector.png'
import casioimg from '../../../assets/brands/casio.png'
import moonstarimg from '../../../assets/brands/moonstar.png'
import redStadImg from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import startImg from '../../../assets/brands/start_people.png'
const BrandsWeHelped = () => {
    return (
  <Swiper
  wiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={true}
        
        freeMode={true}
        pagination={{
          clickable: true,
        }}>
     <SwiperSlide><img src={amazonImg} alt="" /></SwiperSlide>
     <SwiperSlide><img src={amazonVecktorImg} alt="" /></SwiperSlide>
     <SwiperSlide><img src={casioimg} alt="" /></SwiperSlide>
     <SwiperSlide><img src={moonstarimg} alt="" /></SwiperSlide>
     <SwiperSlide><img src={redStadImg} alt="" /></SwiperSlide>
     <SwiperSlide><img src={star} alt="" /></SwiperSlide>
     <SwiperSlide><img src={startImg} alt="" /></SwiperSlide>
        
  </Swiper>
    );
};

export default BrandsWeHelped;