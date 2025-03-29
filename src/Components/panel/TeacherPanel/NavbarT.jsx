import React from 'react'
import { Link } from 'react-router-dom'
import NavbarItems from '../../Header/NavbarItems'
// import './../TeacherPanel/adminStyle.css'

export default function NavbarT() {
    const logOut = async () => {
        console.log('hello :))');
        
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
                <Link className='adminPanelNavbar' to="/teacherPanel/upload" ><p>آپلود فایل</p></Link >
                <Link className='adminPanelNavbar' to="/teacherPanel/comments" ><p>مشاهده انتقاد ها</p></Link >
                <Link className='adminPanelNavbar' to="/teacherPanel/adminMessageFT" ><p>مشاهده پیام های مدیر</p></Link >
                <Link className='adminPanelNavbar' to="/teacherPanel/Specifications" ><p>اضافه یا آپدیت کردن مشخصات خود</p></Link >
                <Link className='adminPanelNavbar' onClick={logOut}  ><p>خروج از حساب کاربری</p></Link >
            </div>
        </div>


    )
}
