import React from 'react'
import { Link } from 'react-router-dom'
import NavbarItems from '../../Header/NavbarItems'
import './adminStyle.css'

export default function Navbar() {
    const logOut = async () => {
        const confirmLogout = window.confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟');
        if (!confirmLogout) return; // اگر کاربر انصراف داد، عملیات متوقف شود

        try {
            // حذف توکن از localStorage
            localStorage.removeItem('token');

            // ریدایرکت کاربر به صفحه لاگین یا صفحه اصلی
            window.location.href = '/login'; // یا window.location.reload() اگر نیاز به رفرش صفحه دارید
        } catch (err) {
            console.error('خطا در خروج از سیستم:', err);
            alert('خطا در خروج از سیستم. لطفاً دوباره تلاش کنید.');
        }
    };
    return (
        <div className='adminPanel'>
            <div className='adminPanelContainer'>
                <Link className='adminPanelNavbar' to="/userPanel/students">
                    <p>لیست دانش آموزان مدرسه</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/teachers">
                    <p>لیست معلمان مدرسه</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/ban">
                    <p>بن کردن کاربر</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/students/email">
                    <p>ارسال ایمیل به کل دانش آموزان</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/students/message">
                    <p>ارسال پیام به پنل دانش آموزان</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/teachers/message">
                    <p>ارسال پیام به پنل  معلمان</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/teachers/email">
                    <p>ارسال ایمیل به کل معلم‌ها</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/bestStudents">
                    <p>اضافه کردن دانش آموز برتر به صفحه اصلی</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/events">
                    <p>اضافه کردن رویداد برای نوبار صفحه</p>
                </Link>
                <Link className='adminPanelNavbar' to="/userPanel/addTeacher">
                    <p>تغییر سطح کاربر</p>
                </Link>
                <div className='adminPanelNavbar' onClick={logOut} style={{ cursor: 'pointer' }}>
                    <p>خروج از حساب کاربری</p>
                </div>
            </div>
        </div>


    )
}
