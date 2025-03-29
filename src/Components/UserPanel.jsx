import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import User from './panel/userPanel/User';
import Admin from './panel/AdminPanel/Admin';
import Teacher from './panel/TeacherPanel/Teacher';



function UserPanel() {
    const [userData, setUserData] = useState(null); // اطلاعات کاربر
    const navigate = useNavigate();

    useEffect(() => {
        // توکن را از localStorage دریافت می‌کنیم
        const token = localStorage.getItem('token');

        // اگر توکن وجود نداشت، کاربر را به صفحه‌ی لاگین هدایت می‌کنیم
        if (!token) {
            navigate('/login');
            return;
        }

        // دریافت اطلاعات کاربر از سرور
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://fsosiety.liara.run/v1/auth', {
                    headers: {
                        Authorization: token // ارسال توکن در هدر
                    }
                    
                });
                console.log(response.data.role);
                setUserData(response.data); // ذخیره‌سازی اطلاعات کاربر
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // اگر خطایی رخ داد، کاربر را به صفحه‌ی لاگین هدایت می‌کنیم
            }
        };
        

        fetchUserData();
    }, [navigate]);

    if (!userData) {
        return <div>Loading...</div>; // نمایش پیام در حال بارگذاری
    }


    return (
        <div>
            {/* {userData.role === 'ADMIN' && <Admin />} */}
            {userData.role === 'USER' && <User/>}
            {userData.role === 'ADMIN' &&<Admin/>}
            {userData.role === 'TEACHER' && <Teacher/>}
            {/* {userData.role !== 'ADMIN' && userData.role !== 'USER' && <GuestPanel />} */}
        </div>

    );
}

export default UserPanel;