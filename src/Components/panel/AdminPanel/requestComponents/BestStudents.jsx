import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './requestCompo.css'; // فایل CSS برای استایل‌دهی

export default function BestStudents() {
    const [fullname, setFullname] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const token =localStorage.getItem('token')

    // دریافت فایل‌های آپلود شده از سرور
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            try {
                const response = await axios.get('https://fsosiety.liara.run/v1/student/data');
                setUploadedFiles(response.data);
            } catch (err) {
                console.error('خطا در دریافت فایل‌ها:', err);
            }
        };

        fetchUploadedFiles();
    }, []);

    const handleSubmit = async () => {
        // اعتبارسنجی ورودی‌ها
        if (!fullname || !description || !file) {
            setError('لطفاً تمام فیلدها را پر کنید.');
            return;
        }

        // بررسی حجم فایل (کمتر از 1 مگابایت)
        if (file.size > 1024 * 1024) { // 1 مگابایت = 1024 * 1024 بایت
            setError('حجم فایل باید کمتر از 1 مگابایت باشد.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fullname', fullname);
        formData.append('description', description);

        try {
            console.log('my response:  ');

            const response = await axios.post('https://fsosiety.liara.run/v1/student/data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization":token
                },
            });

            
            // افزودن فایل جدید به لیست فایل‌ها
            setUploadedFiles([...uploadedFiles, response.data]);
            setSuccess(true);
            setFullname('');
            setDescription('');
            setFile(null);
        } catch (err) {
            setError('خطا در ارسال داده‌ها. لطفاً دوباره تلاش کنید.');
            console.error('خطا:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`https://fsosiety.liara.run/v1/student/data/${fileId}`);
            // حذف فایل از لیست فایل‌ها
            setUploadedFiles(uploadedFiles.filter(file => file._id !== fileId));
            setSuccess(true);
        } catch (err) {
            setError('خطا در حذف فایل. لطفاً دوباره تلاش کنید.');
            console.error('خطا:', err);
        }
    };

    return (
        <div className="best-students-container">
            <h1>ثبت دانش‌آموز برتر</h1>

            <div className="form-group">
                <label htmlFor="fullname">نام و نام خانوادگی دانش‌آموز (مثلاً: امیررضا نوبهار)</label>
                <input
                    type="text"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">رتبه، کلاس و رشته (مثلاً: مقام ۱ کلاس دوازده ریاضی)</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="file">عکس دانش‌آموز</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={loading}
                />
            </div>

            <button onClick={handleSubmit} disabled={loading} className="submit-button">
                {loading ? 'در حال ارسال...' : 'ثبت'}
            </button>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">داده‌ها با موفقیت ثبت شدند!</p>}

            <div className="uploaded-files">
                <h2>فایل‌های آپلود شده</h2>
                <ul className="file-list">
                    {uploadedFiles.map((file) => (
                        <li key={file._id} className="file-item">
                            <div className="file-info">
                                <span>{file.fullname}</span>
                                <span>{file.description}</span>
                                <a href={`https://mybuketserver.storage.c2.liara.space/${file.path}`} target="_blank" rel="noopener noreferrer">
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