'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 

import '@/public/styles/productImage.css'

import { A11y, FreeMode, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import Image from 'next/image';

const DetailTes = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
      console.log(thumbsSwiper);
    }, [thumbsSwiper])

  return (
    <>
        <Swiper
        navigation={true}
        pagination={true}
        keyboard={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Thumbs]}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper w-[500px] h-[500px] border border-slate-400 rounded-lg"
      >
        <SwiperSlide>
            <Image src="/img/product/iphone.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/img/product/iphone 2.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/img/product/iphone 3.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/img/product/iphone 4.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 w-[500px] h-[120px] mt-2"
      >
       <SwiperSlide className='border border-slate-400 rounded'>
            <Image src="/img/product/iphone.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
        <SwiperSlide className='border border-slate-400 rounded'>
            <Image src="/img/product/iphone 2.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
        <SwiperSlide className='border border-slate-400 rounded'>
            <Image src="/img/product/iphone 3.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
        <SwiperSlide className='border border-slate-400 rounded'>
            <Image src="/img/product/iphone 4.jpg" alt='Product Image' width={1000} height={1000}/>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default DetailTes