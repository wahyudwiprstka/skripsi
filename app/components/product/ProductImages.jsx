'use client'

import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Pagination, Thumbs} from 'swiper/modules';

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import '@/public/styles/productImage.css'
import { useState } from 'react';
import Image from 'next/image';

const ProductImages = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiperRealIndex, setSwiperRealIndex] = useState(0);
    const images = [
        {
            img: 'https://images.unsplash.com/photo-1705179910388-2e27559c3f39?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'a dog image'
        },
        {
            img: 'https://images.unsplash.com/photo-1705517649861-5450dc4dd44a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'a snowy river'
        },
        {
            img: 'https://images.unsplash.com/photo-1705450568642-d9d3523a9b12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'a kitchen'
        },
        {
            img: 'https://images.unsplash.com/photo-1705086867540-86ee11e93f8b?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'sunset in desert'
        },
        {
            img: 'https://images.unsplash.com/photo-1705179910388-2e27559c3f39?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'a dog image'
        },
        {
            img: 'https://images.unsplash.com/photo-1705517649861-5450dc4dd44a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'a snowy river'
        },
        {
            img: 'https://images.unsplash.com/photo-1705450568642-d9d3523a9b12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'a kitchen'
        },
        {
            img: 'https://images.unsplash.com/photo-1705086867540-86ee11e93f8b?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'sunset in desert'
        },  
    ];
    return(
            <div className="product-image-container">
                <Swiper
                    loop={true}
                    onSlideChange={(swiper) => setSwiperRealIndex(swiper.activeIndex)}
                    spaceBetween={10}
                    modules={[ Navigation, Thumbs, FreeMode ]}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    className='w-[300px] rounded-lg h-[300px]'
                >
                {images.map((image, index) => (
                    <SwiperSlide>
                        <button onClick={()=>document.getElementById('my_modal_2').showModal()}>
                            <Image
                                src={image.img}
                                alt={image.alt}
                                width={3000}
                                height={3000}
                                priority={true}
                                className={"object-cover object-center w-[300px] h-[300px] rounded hover:scale-125 transition-transform duration-150 ease-in-out"}
                            />
        
                        </button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box overflow-hidden w-[80vw] h-[80vh] p-0">
                                <Image
                                    src={images[swiperRealIndex].img}
                                    alt={images[swiperRealIndex].alt}
                                    width={3000}
                                    height={3000}
                                    priority={true}
                                    className="object-cover object-center w-full h-full rounded"
                                />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* thumbnail */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={4}
                    slidesPerView={4}
                    slidesPerGroup={2}
                    freeMode={true}
                    navigation={{ 
                        nextEl: ".button-next-slide-thumb",
                        prevEl: ".button-prev-slide-thumb"
                     }}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className='thumbs mt-1 w-full group relative cursor-grab'
                >
                    {images.map((image, index) => (
                        <SwiperSlide>
                                <img src={image.img} alt={image.alt} className='product-image-thumbnail object-cover object-center rounded-lg' />
                        </SwiperSlide>
                    ))}
                    <div className="button-next-slide-thumb absolute text-white bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center p-2 cursor-pointer top-[50%] -translate-y-[50%] z-[100] right-0 group-hover:opacity-100 opacity-0 transition-all">
                        <FaArrowRightLong/>
                    </div>
                    <div className="button-prev-slide-thumb absolute text-white bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center p-2 cursor-pointer top-[50%] -translate-y-[50%] z-[100] opacity-0 group-hover:opacity-100 left-0 transition-all">
                        <FaArrowLeftLong/>
                    </div>
                </Swiper>
            </div>
    )
}

export default ProductImages;