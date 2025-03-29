import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './EventSlider.css'; // فایل استایل برای اسلایدر

export default function EventSlider() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // دریافت تصاویر از API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fsosiety.liara.run/v1/event/data');
                setImages(response.data); // فرض می‌کنیم API یک آرایه از آدرس تصاویر برمی‌گرداند
                console.log(images); // بررسی داده‌های دریافتی
            } catch (err) {
                if (err.request) {
                    setError(err.request);
                } else if (err.response) {
                    setError(err.response);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // تغییر خودکار اسلاید هر 3 ثانیه
    useEffect(() => {
        if (images?.length > 0) {
            const timeout = setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % images.length);
            }, 3000);
            return () => clearTimeout(timeout); // پاک کردن timeout هنگام unmount
        }
    }, [currentSlide, images]);

    if (loading) {
        return <div>Loading...</div>; // نمایش پیام در حال لود شدن
    }

    if (error) {
        return <div>Error: {error.message || "Something went wrong"}</div>; // نمایش پیام خطا
    }

    if (images.length === 0) {
        return <div>در حال بارگذاری تصاویر...</div>; // نمایش پیام اگر تصویری وجود ندارد
    }

    return (
        <div className="slider">
            <div className="slides">
                {images?.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img
                            src={`https://mybuketserver.storage.c2.liara.space/${image.filename}`}
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}