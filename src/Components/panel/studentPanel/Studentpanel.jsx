import React, { useEffect, useState } from 'react';
import './StudentPanel.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // برای هدایت کاربر پس از Logout

function StudentPanel() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [messages, setMessages] = useState([]);
    const [comments, setComments] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [studentInfo, setStudentInfo] = useState({});
    const [isMessagesOpen, setIsMessagesOpen] = useState(false); // State for messages collapsible
    const [isCommentsOpen, setIsCommentsOpen] = useState(false); // State for comments collapsible

    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // برای هدایت کاربر

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fsosiety.liara.run/v1/student', {
                    headers: {
                        'Authorization': token
                    }
                });
                
                setMessages(response.data.adminMessage);
                setComments(response.data.comment);
                setStudentInfo(response.data.user);

                setSuccess("اطلاعات شما با موفقیت دریافت شد");
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.message || err.message);
                } else if (err.request) {
                    setError(err.request || "خطای شبکه");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // اعتبارسنجی نام کاربری (فقط حروف فارسی)
    const validateUsername = (username) => {
        const persianRegex = /^[\u0600-\u06FF\s]+$/; // فقط حروف فارسی و فاصله
        return persianRegex.test(username);
    };

    // اعتبارسنجی رمز عبور (حداقل یک حرف بزرگ و حداقل 8 کاراکتر)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // حداقل یک حرف بزرگ و 8 کاراکتر
        return passwordRegex.test(password);
    };

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        setLoading(true);

        // اعتبارسنجی نام کاربری
        if (!validateUsername(newUsername)) {
            setError("نام کاربری باید فقط شامل حروف فارسی باشد.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                'https://fsosiety.liara.run/v1/student/changeName',
                { name: newUsername },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            );
            console.log(response.data);
            setSuccess("نام کاربری با موفقیت تغییر یافت!");
            setNewUsername("");
            setError(null); // پاک کردن خطاهای قبلی
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || err.message);
            } else if (err.request) {
                setError(err.request || "خطای شبکه");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        // اعتبارسنجی رمز عبور
        if (!validatePassword(newPassword)) {
            setError("رمز عبور باید حداقل 8 کاراکتر و شامل حداقل یک حرف بزرگ باشد.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                'https://fsosiety.liara.run/v1/student/changePassword',
                { password: newPassword },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            );
            console.log(response.data);
            setSuccess("رمز عبور با موفقیت تغییر یافت!");
            setNewPassword("");
            setError(null); // پاک کردن خطاهای قبلی
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || err.message);
            } else if (err.request) {
                setError(err.request || "خطای شبکه");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // تابع Logout
    const handleLogout = () => {
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
    }

    return (
        <div className="student-panel">
            {/* هدر صفحه با دکمه Logout */}
            <header className="panel-header">
                <h1>پنل دانش‌آموز</h1>
                <button className="logout-button" onClick={handleLogout}>
                    خروج
                </button>
            </header>

            {/* نمایش اطلاعات شخصی */}
            <div className="student-info">
                <h2>اطلاعات شخصی</h2>
                <p> نام و نام خانوادگی: {studentInfo?.name}</p>
                <p> سن: {studentInfo?.age}</p>
            </div>

            {/* بخش پیام‌ها */}
            <div className="messages">
                <button
                    className="collapsible"
                    onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                >
                    پیام‌های مدیر {isMessagesOpen ? '▲' : '▼'}
                </button>
                <div
                    className="collapsible-content"
                    style={{ maxHeight: isMessagesOpen ? '500px' : '0' }}
                >
                    <ul>
                        {messages?.map((message) => (
                            <li key={message._id}>
                                <strong>{message.title}:</strong> {message.body}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* بخش کامنت‌ها */}
            <div className="comments">
                <button
                    className="collapsible"
                    onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                >
                    کامنت‌های من {isCommentsOpen ? '▲' : '▼'}
                </button>
                <div
                    className="collapsible-content"
                    style={{ maxHeight: isCommentsOpen ? '500px' : '0' }}
                >
                    <ul>
                        {comments?.map((comment) => (
                            <li key={comment._id}>
                                <strong>score=>{comment.rating} : </strong> {comment.comment}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* تغییر نام کاربری */}
            <div className="change-username">
                <h2>تغییر نام کاربری</h2>
                <form onSubmit={handleChangeUsername}>
                    <input
                        type="text"
                        placeholder="نام کاربری جدید"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'در حال ارسال...' : 'تغییر نام کاربری'}
                    </button>
                </form>
            </div>

            {/* تغییر رمز عبور */}
            <div className="change-password">
                <h2>تغییر رمز عبور</h2>
                <form onSubmit={handleChangePassword}>
                    <input
                        type="password"
                        placeholder="رمز عبور جدید"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'در حال ارسال...' : 'تغییر رمز عبور'}
                    </button>
                </form>
            </div>

            {/* نمایش پیام‌های موفقیت یا خطا */}
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default StudentPanel;