// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';


// import './Slider.css';

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

// export default function CardSlider() {
//     const [swiperRef, setSwiperRef] = useState(null);
//     var screenWidth = 3;
//     if (screen.width < 500) screenWidth = 1;
//     const slides = [
//         { image: "https://picsum.photos/200/300", title: "This is a title", description: "This is a description" },
//         { image: "https://picsum.photos/600/500", title: "This is a second title", description: "This is a second description" },
//         { image: "https://picsum.photos/700/600", title: "This is a third title", description: "This is a third description" },
//         { image: "https://picsum.photos/500/400", title: "This is a fourth title", description: "This is a fourth description" },
//         { image: "https://picsum.photos/200/300", title: "This is a fifth title", description: "This is a fifth description" },
//         { image: "https://picsum.photos/800/700", title: "This is a sixth title", description: "This is a sixth description" },
//         { image: "https://picsum.photos/300/400", title: "This is a seventh title", description: "This is a seventh description" },
//     ]




//     return (
//         <>
//             {/* <Swiper
//                 onSwiper={setSwiperRef}
//                 slidesPerView={screenWidth}
//                 spaceBetween={30}
//                 pagination={{
//                     type: 'bullets',
//                 }}
//                 navigation={screen.width > 500 ? true : false}
//                 modules={[Pagination, Navigation]}
//                 className="mySwiper"
//             >
//                 {slides.map((slide,index) => {
//                     return (
//                         <SwiperSlide key={index} >
//                             <div className='slide'>
//                                 <img src="/src/Images/khosroshah.jpg" alt="" />
//                                 <h3>{slide.title}</h3>
//                                 <p> {slide.description} </p>
//                             </div>
//                         </SwiperSlide>

//                     )



//                 })}
//             </Swiper> */}

//         </>
//     );
// }
