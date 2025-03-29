import axios from 'axios';
import React, { useState, useCallback } from 'react';
import './requestCompo.css'; // فایل CSS برای استایل‌دهی

export default function AddSpecifications() {
    const [duty, setDuty] = useState('');
    const [education, setEducation] = useState('');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const postData = useCallback(async () => {
        if (!duty || !education || !profile) {
            setError('لطفا تمام فیلدها را پر کنید.');
            return;
        }

        // بررسی حجم فایل
        if (profile.size > 1024 * 1024) { // 1 مگابایت = 1024 * 1024 بایت
            setError('حجم فایل باید کمتر از 1 مگابایت باشد.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('file', profile);
        formData.append('duty', duty);
        formData.append('education', education);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://fsosiety.liara.run/v1/teacher/setProfile', formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setSuccess(true);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'خطا در ارسال داده‌ها.');
            } else if (err.request) {
                setError('خطا در ارتباط با سرور.');
            } else {
                setError('خطای ناشناخته رخ داده است.');
            }
        } finally {
            setLoading(false);
        }
    }, [duty, education, profile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // بررسی حجم فایل قبل از تنظیم state
            if (file.size > 1024 * 1024) { // 1 مگابایت = 1024 * 1024 بایت
                setError('حجم فایل باید کمتر از 1 مگابایت باشد.');
                return;
            }
            setProfile(file);
            setError(null); // پاک کردن خطا اگر فایل معتبر باشد
        }
    };

    return (
        <div className="add-specifications-container">
            <h1 className="title">افزودن مشخصات</h1>

            <label className="label"> کار شما در مدرسه حاج اکبر شعوری  (مثلا: دبیر ریاضی)</label>
            <input
                type="text"
                onChange={(e) => setDuty(e.target.value)}
                disabled={loading}
                className="input"
            />

            <label className="label">تحصیلات (مثلا  : دکترای رشته ریاضی)</label>
            <input
                type="text"
                onChange={(e) => setEducation(e.target.value)}
                disabled={loading}
                className="input"
            />

            <label className="label">عکس پروفایل جدید</label>
            <input
                type="file"
                onChange={handleFileChange}
                disabled={loading}
                className="input"
                accept="image/*" // فقط فایل‌های تصویری قابل انتخاب هستند
            />

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">داده‌ها با موفقیت ارسال شدند.</p>}

            <button onClick={postData} disabled={loading} className="submit-button">
                {loading ? 'در حال ارسال...' : 'ارسال'}
            </button>
        </div>
    );
}