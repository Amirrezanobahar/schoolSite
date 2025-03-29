import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // استفاده از useNavigate
import NavbarItems from './NavbarItems';
import axios from 'axios';
import './Header.css'

const Navbar = () => {
  const [display, setDisplay] = useState({ display: 'none' });
  const [teachers, setTeachers] = useState([]); // state برای ذخیره داده‌های دبیران
  const [loading, setLoading] = useState(true); // state برای مدیریت حالت بارگذاری
  const [error, setError] = useState(null); // state برای مدیریت خطا
  const [selectedTeacher, setSelectedTeacher] = useState(''); // state برای معلم انتخاب شده
  const navigate = useNavigate(); // استفاده از useNavigate برای تغییر مسیر

  const registerHandler = () => {
    setDisplay((prevDisplay) => ({
      display: prevDisplay.display === 'none' ? 'block' : 'none',
    }));
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://fsosiety.liara.run/v1/user/get/teachers');
      setTeachers(response.data); // ذخیره داده‌های دریافت شده در state
      setError(null); // خطا را پاک کنید
    } catch (error) {
      console.error('خطا در دریافت داده‌ها:', error);
      setError('خطا در دریافت داده‌ها.'); // تنظیم پیام خطا
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  useEffect(() => {
    fetchUser(); // فراخوانی تابع fetchUser هنگام mount شدن کامپوننت
  }, []);

  // تغییر معلم انتخاب شده و تغییر مسیر
  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teacherId);
    if (teacherId) {
      navigate(`/teachers/${teacherId}`); // تغییر مسیر به آدرس معلم انتخاب شده
    }
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <NavbarItems value="صفحه اصلی" />
        </Link>
        <NavbarItems value="اخبار و اطلاعیه ها" />
        {loading ? (
          <p className="loading-message">در حال بارگذاری...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="teachers-dropdown">
            <select value={selectedTeacher} onChange={handleTeacherChange}>
              <option value="">انتخاب معلم</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <NavbarItems scroll="relation" value="ارتباط با ما" />
        
        <NavbarItems scroll="hestori" value="تاریخچه" />
        <Link to="/register">
          <NavbarItems value="ورود/ثبت نام" />
        </Link>
        <Link to="/userPanel">
          <NavbarItems value="پنل کاربری" />
        </Link>
      </div>
      <div className='navbarMobile'>


        {loading ? (
          <p className="loading-message">در حال بارگذاری...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="teachers-dropdown">
            <select value={selectedTeacher} onChange={handleTeacherChange}>
              <option value="">انتخاب معلم</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Link to="/register">
          <NavbarItems value="ورود/ثبت نام" />
        </Link>
        <Link to="/userPanel">
          <NavbarItems value="پنل کاربری" />
        </Link>

      </div>
    </>
  );
};

export default Navbar;