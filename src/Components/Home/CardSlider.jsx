import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './cardSlider.css';
import { Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';

export default function CardSlider() {
    const [students, setStudents] = useState([]);
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // دریافت فایل‌های آپلود شده از سرور
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            try {
                const response = await axios.get('https://fsosiety.liara.run/v1/student/data');
                setStudents(response.data);
                console.log(students);
                
            } catch (err) {
                console.error('خطا در دریافت فایل‌ها:', err);
                setError('خطا در دریافت داده‌ها. لطفاً دوباره تلاش کنید.');
            } finally {
                setLoading(false);
            }
        };

        fetchUploadedFiles();
    }, []);

    // بررسی عرض صفحه و تنظیم تعداد اسلایدها
    const handleResize = useCallback(() => {
        if (window.innerWidth < 500) {
            setSlidesPerView(1);
        } else if (window.innerWidth < 768) {
            setSlidesPerView(2);
        } else {
            setSlidesPerView(3);
        }
    }, []);

    useEffect(() => {
        const debouncedResize = debounce(handleResize, 100);
        window.addEventListener('resize', debouncedResize);
        handleResize(); // بررسی اولیه

        return () => window.removeEventListener('resize', debouncedResize);
    }, [handleResize]);

    // تابع debounce برای بهینه‌سازی رویداد resize
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    if (error) {
        return <p className="card-slider-error">{error}</p>;
    }

    if (loading) {
        return (
            <div className="card-slider-skeleton-container">
                {[...Array(slidesPerView)].map((_, index) => (
                    <div key={index} className="card-slider-skeleton" />
                ))}
            </div>
        );
    }

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={30}
                pagination={{
                    type: 'bullets',
                    clickable: true,
                }}
                navigation={slidesPerView > 1}
                modules={[Pagination, Navigation]}
                className="card-slider-container"
            >
                {students.map((student) => (
                    <SwiperSlide key={student._id}>
                        <div className="card-slider-item">
                            <img src={`https://mybuketserver.storage.c2.liara.space/${student.filename}`} alt={student.fullname} />
                            <h3 className="card-slider-title">{student.fullname}</h3>
                            <p className="card-slider-description">{student.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}