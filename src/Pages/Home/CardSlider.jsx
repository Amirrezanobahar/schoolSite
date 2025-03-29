import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Context } from '../../Context'
import { useContext } from 'react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './Slider.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function CardSlider() {
    const [swiperRef, setSwiperRef] = useState(null);
    var screenWidth = 3;
    if (screen.width < 500) screenWidth = 1;
   



    const {cardsliderref} = useContext(Context);
    return (
        
        <>
            {/* <Swiper  
                onSwiper={setSwiperRef}
                slidesPerView={screenWidth}
                spaceBetween={30}
                pagination={{
                    type: 'bullets',
                }}
                navigation={screen.width > 500 ? true : false}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide, index) => {
                  

                    return (
                        <SwiperSlide key={index} >
                            <div className='slide'  >
                                <img src="/src/Images/khosroshah.jpg" alt="" />
                                <h3 ref={cardsliderref}  >{slide.title}</h3>
                                <p> {slide.description} </p>
                            </div>
                        </SwiperSlide>

                    )



                })}
            </Swiper> */}

        </>
    );
}
