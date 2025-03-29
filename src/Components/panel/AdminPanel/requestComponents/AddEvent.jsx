import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './addEvent.css'; // فایل CSS برای استایل‌دهی

export default function AddEvent() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // استفاده از useState

    // دریافت فایل‌های آپلود شده از سرور
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            try {
                const response = await axios.get('https://fsosiety.liara.run/v1/event/data');
                setUploadedFiles(response.data); // به‌روزرسانی state
            } catch (err) {
                console.error('خطا در دریافت فایل‌ها:', err);
                setError('خطا در دریافت فایل‌ها. لطفاً دوباره تلاش کنید.');
            }
        };

        fetchUploadedFiles();
    }, []);

    // اعتبارسنجی فایل
    const validateFile = (file) => {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!allowedFormats.includes(file.type)) {
            return 'فرمت فایل نامعتبر است. فقط فایل‌های JPEG، PNG و GIFو jpg مجاز هستند.';
        }
        if (file.size > 1024 * 1024) { // 1 مگابایت = 1024 * 1024 بایت
            return 'حجم فایل باید کمتر از 1 مگابایت باشد.';
        }
        return null;
    };

    const handleSubmit = async () => {
        // اعتبارسنجی فایل
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://fsosiety.liara.run/v1/event/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':localStorage.getItem('token')
                },
                timeout: 10000
            });

            // بررسی وجود response.data.event
            if (response.data) {
                // اضافه کردن شیء جدید به آرایه uploadedFiles                
                setUploadedFiles([...uploadedFiles, response.data]);
                setSuccess('فایل با موفقیت آپلود شد!');
                setFile(null); // ریست کردن فایل انتخاب شده
            } else {
                console.error('پاسخ سرور نامعتبر است:', response.data);
                setError('پاسخ سرور نامعتبر است. لطفاً دوباره تلاش کنید.');
            }
        } catch (err) {
            if (err.response) {
                setError(`خطای سرور: ${err.response.data.message || 'خطای ناشناخته'}`);
            } else if (err.request) {
                setError('خطای شبکه: سرور پاسخگو نیست.');
            } else {
                setError('خطای ناشناخته رخ داده است.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`https://fsosiety.liara.run/v1/event/data/${fileId}`);
            // حذف فایل از لیست فایل‌ها
            setUploadedFiles(uploadedFiles.filter(file => file._id !== fileId));
            setSuccess('فایل با موفقیت حذف شد!');
        } catch (err) {
            setError('خطا در حذف فایل. لطفاً دوباره تلاش کنید.');
            console.error('خطا:', err);
        }
    };

    return (
        <div className="best-students-container">
            <h1>رویداد ها</h1>

            <div className="form-group">
                <label htmlFor="file">عکس</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={loading}
                    accept="image/*" // فقط فایل‌های تصویری قابل انتخاب هستند
                />
            </div>

            <button onClick={handleSubmit} disabled={loading} className="submit-button">
                {loading ? 'در حال ارسال...' : 'ثبت'}
            </button>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="uploaded-files">
                <h2>فایل‌های آپلود شده</h2>
                <ul className="file-list">
                    {uploadedFiles?.map((file) => (
                        <li key={file._id} className="file-item">
                            <div className="file-info">
                                <img src={`https://mybuketserver.storage.c2.liara.space/${file.filename}`} alt="Uploaded" className="file-image" />
                                <a href={`https://mybuketserver.storage.c2.liara.space/${file.filename}`} target="_blank" rel="noopener noreferrer">
                                    مشاهده فایل
                                </a>
                            </div>
                            <button
                                onClick={() => handleDelete(file._id)}
                                className="delete-button"
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}