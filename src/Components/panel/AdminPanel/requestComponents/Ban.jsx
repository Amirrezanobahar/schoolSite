import React, { useState } from 'react';
import axios from 'axios';
import './requestCompo.css';

export default function BanUnban() {
    const [ID, setID] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('ban'); // حالت پیش‌فرض: بن کردن

    const handleAction = async () => {
        if (!ID) {
            alert('لطفاً ایدی کاربر را وارد کنید.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const endpoint = actionType === 'ban' ? '/v1/user/ban' : '/v1/user/unBan';
            const response = await axios.put(`https://fsosiety.liara.run${endpoint}`, { id: ID });

            if (response.status === 200) {
                alert(`کاربر با موفقیت ${actionType === 'ban' ? 'بن' : 'آنبن'} شد.`);
                setID(''); // پاک کردن فیلد پس از موفقیت
            }
        } catch (err) {
            if (err.response) {
                // اگر سرور پاسخ داده، اما با خطا
                setError(err.response.data.message || `خطا در ${actionType === 'ban' ? 'بن' : 'آنبن'} کردن کاربر`);
                alert(err.response.data.message || `خطا در ${actionType === 'ban' ? 'بن' : 'آنبن'} کردن کاربر`);
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
      <div className='banUnbanUser'>
      <div>
          <label htmlFor="userID">ایدی کاربر را وارد کنید:</label>
          <input
              type="text"
              id="userID"
              placeholder='...'
              value={ID}
              onChange={(e) => setID(e.target.value)}
              disabled={loading}
          />
      </div>

      <div className='radioGroup'>
          <label>
              <input
                  type="radio"
                  value="ban"
                  checked={actionType === 'ban'}
                  onChange={() => setActionType('ban')}
                  disabled={loading}
              />
              بن کردن
          </label>
          <label>
              <input
                  type="radio"
                  value="unban"
                  checked={actionType === 'unban'}
                  onChange={() => setActionType('unban')}
                  disabled={loading}
              />
              خروج از بن
          </label>
      </div>

      <button onClick={handleAction} disabled={loading || !ID}>
          {loading ? 'در حال پردازش...' : actionType === 'ban' ? 'بن کردن' : 'خروج از بن'}
      </button>

      {error && <p className='errorMessage'>{error}</p>}
  </div>
    );
}