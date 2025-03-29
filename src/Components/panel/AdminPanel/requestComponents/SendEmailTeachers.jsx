
import React, { useState } from 'react';
import axios from 'axios';
import './requestCompo.css';


export default function sendEmailTeachers() {
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault(); // جلوگیری از رفرش صفحه

        if (!subject || !text) {
            alert('لطفاً موضوع و متن ایمیل را وارد کنید.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://fsosiety.liara.run/v1/user/teachers/senEmail', {
                subject,
                text,
            });

            if (response.status === 200) {
                alert('ایمیل با موفقیت ارسال شد.');
                setSubject(''); // پاک کردن فیلد موضوع
                setText(''); // پاک کردن فیلد متن
            }
        } catch (err) {
            if (err.response) {
                // اگر سرور پاسخ داده، اما با خطا
                setError(err.response.data.message || 'خطا در ارسال ایمیل');
                alert(err.response.data.message || 'خطا در ارسال ایمیل');
            } else if (err.request) {
                // اگر درخواست ارسال شد، اما پاسخی دریافت نشد
                setError('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.');
                alert('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.');
            } else {
                // خطاهای دیگر
                setError('خطای غیرمنتظره رخ داده است.');
                alert('خطای غیرمنتظره رخ داده است.');
            }
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className='sendEmailContainer'>
      <h1>ارسال ایمیل به دانش‌آموزان</h1>
      <form onSubmit={sendEmail}>
          <div>
              <label htmlFor="subject">موضوع ایمیل:</label>
              <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={loading}
              />
          </div>
          <div>
              <label htmlFor="text">متن ایمیل:</label>
              <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={loading}
              />
          </div>
          <button type="submit" disabled={loading || !subject || !text}>
              {loading ? 'در حال ارسال...' : 'ارسال ایمیل'}
          </button>
      </form>

      {error && <p className='errorMessage'>{error}</p>}
  </div>
    );
}