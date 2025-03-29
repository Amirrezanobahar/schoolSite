
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './requestCompo.css';

const AdminMessageFTeacher = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // دریافت پیام‌های مدیر از سرور
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('https://fsosiety.liara.run/v1/teacher/adminMessage');
                setMessages(response.data);
            } catch (err) {
                console.error('خطا در دریافت پیام‌ها:', err);
                setError('خطا در دریافت پیام‌ها. لطفاً دوباره تلاش کنید.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div className="teacher-panel-loading">در حال بارگذاری...</div>;
    }

    if (error) {
        return <div className="teacher-panel-error">{error}</div>;
    }

    return (
        <div className="teacher-panel-container">
            <h1 className="teacher-panel-title">پیام‌های مدیر</h1>
            <div className="teacher-panel-messages">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div key={message._id} className="teacher-panel-message">
                            <h3 className="teacher-panel-message-title">{message.title}</h3>
                            <p className="teacher-panel-message-body">{message.body}</p>
                            <p className="teacher-panel-message-date">
                                تاریخ ارسال: {new Date(message.createdAt).toLocaleDateString('fa-IR')}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="teacher-panel-no-messages">هیچ پیامی وجود ندارد.</p>
                )}
            </div>
        </div>
    );
};

export default AdminMessageFTeacher;