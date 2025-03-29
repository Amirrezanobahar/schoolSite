import React, { useState } from 'react';
import './requestCompo.css';
import axios from 'axios';

export default function AddTeacher() {
    const [userID, setUserID] = useState('');
    const [teacherID, setTeacherID] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRoleChange = async (url, id, successMessage) => {
        if (!id) {
            alert('لطفاً ایدی کاربر را وارد کنید.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(url, { id });
            if (response.status === 200) {
                alert(successMessage);
                setUserID('');
                setTeacherID('');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'خطا در تغییر نقش کاربر');
            } else if (err.request) {
                setError('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.');
            } else {
                setError('خطای غیرمنتظره رخ داده است.');
            }
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const upToTeacher = (e) => {
        e.preventDefault();
        handleRoleChange('https://fsosiety.liara.run/v1/user/upToTeacher', userID, 'کاربر با موفقیت به معلم ارتقا یافت.');
    };

    const lowToUser = (e) => {
        e.preventDefault();
        handleRoleChange('https://fsosiety.liara.run/v1/user/upToUser', teacherID, 'کاربر با موفقیت به کاربر عادی تغییر یافت.');
    };

    return (
        <div className='addTeacher'>
            <h2>مدیریت نقش کاربران</h2>

            <div className='inputGroup'>
                <label htmlFor="userID">ایدی کاربر را وارد کنید:</label>
                <input
                    type="text"
                    id="userID"
                    placeholder='...'
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className='buttonGroup'>
                <button onClick={upToTeacher} disabled={loading || !userID}>
                    {loading ? 'در حال ارتقا...' : 'ارتقا به معلم'}
                </button>
            </div>

            <div className='inputGroup'>
                <label htmlFor="teacherID">ایدی معلم را وارد کنید:</label>
                <input
                    type="text"
                    id="teacherID"
                    placeholder='...'
                    value={teacherID}
                    onChange={(e) => setTeacherID(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className='buttonGroup'>
                <button onClick={lowToUser} disabled={loading || !teacherID}>
                    {loading ? 'در حال تغییر...' : 'تغییر به کاربر عادی'}
                </button>
            </div>

            {error && <p className='errorMessage'>{error}</p>}
        </div>
    );
}