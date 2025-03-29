import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './FileUploader.css'; // فایل CSS برای استایل‌دهی

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [body, setBody] = useState(''); // تغییر نام به body برای رعایت قراردادهای نام‌گذاری
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    // لیست فرمت‌های مجاز
    const allowedFormats = ['application/pdf', 'image/jpeg', 'image/png','image/jpg'];
    const maxFileSize = 10 * 1024 * 1024; // 10 مگابایت

    const handleFileChange = useCallback((e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // بررسی حجم فایل
            if (selectedFile.size > maxFileSize) {
                setFile(null);
                setMessage('حجم فایل باید کمتر از ۱۰ مگابایت باشد.');
                return;
            }

            // بررسی فرمت فایل
            if (allowedFormats.includes(selectedFile.type)) {
                setFile(selectedFile);
                setMessage('');
            } else {
                setFile(null);
                setMessage('فرمت فایل مجاز نیست. فقط فایل‌های PDF، JPEG و PNG مجاز هستند.');
            }
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!file) {
            setMessage('لطفا یک فایل انتخاب کنید.');
            setLoading(false);
            return;
        }else if(!body){
            setMessage('لطفا متن را وارد کنید.');
            setLoading(false);
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('body', body); // اضافه کردن body به FormData
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://fsosiety.liara.run/v1/user/teachers/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                },
            });
            setMessage(response.data.message);
            // پس از آپلود موفق، فایل‌ها را مجدداً دریافت کنید
            fetchFiles();
        } catch (error) {
            setMessage('خطا در آپلود فایل.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [file, body]);

    const fetchFiles = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://fsosiety.liara.run/v1/user/teachers/files', {
                headers: {
                    Authorization: token
                },
            });
            setFiles(response.data);
        } catch (error) {
            console.error('خطا در دریافت فایل‌ها:', error);
        }
    }, []);

    const handleDeleteFile = useCallback(async (fileId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`https://fsosiety.liara.run/v1/user/teachers/files/${fileId}`, {
                headers: {
                    Authorization: token
                },
            });
            setMessage('فایل با موفقیت حذف شد.');
            // پس از حذف موفق، فایل‌ها را مجدداً دریافت کنید
            fetchFiles();
        } catch (error) {
            setMessage('خطا در حذف فایل.');
            console.error(error);
        }
    }, [fetchFiles]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    return (
        <div className="file-uploader-container">
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" onChange={handleFileChange} disabled={loading} className="file-input" />
                <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="نامی برای فایل خود را وارد کنید"
                    disabled={loading}
                    className="body-input"
                />
                <button type="submit" disabled={loading} className="upload-button">
                    {loading ? 'در حال آپلود...' : 'آپلود فایل'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}

            <div className="file-list">
                <h1>فایل‌های من</h1>
                {files.length > 0 ? (
                    <ul>
                        {files.map((file) => (
                            <li key={file._id} className="file-item">
                                <a href={`https://mybuketserver.storage.c2.liara.space/${file.filename}`} target="_blank" rel="noopener noreferrer">
                                    {file.body}
                                </a>
                                <button
                                    onClick={() => handleDeleteFile(file._id)}
                                    className="delete-button"
                                    disabled={loading}
                                >
                                    حذف
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>هیچ فایلی آپلود نشده است.</p>
                )}
            </div>
        </div>
    );
};

export default FileUploader;