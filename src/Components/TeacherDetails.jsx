import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './teacherDeatels.css'; // فایل CSS برای استایل‌دهی

const TeacherDetails = () => {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await axios.get(`https://fsosiety.liara.run/v1/teacher/get/teachers/${teacherId}`);
                setTeacher(response.data);
                setError(null);
            } catch (error) {
                console.error('خطا در دریافت اطلاعات معلم:', error);
                setError('خطا در دریافت اطلاعات معلم.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherDetails();
    }, [teacherId]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `https://fsosiety.liara.run/v1/scoreComment/teacher/rate/${teacherId}`,
                {
                    rating,
                    comment,
                    teacherId,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setSubmissionSuccess(true);
            setComment('');
            setRating(0);
            setTimeout(() => setSubmissionSuccess(false), 3000);
        } catch (error) {
            console.error('خطا در ثبت امتیاز و نظر:', error);
            setError('خطا در ثبت امتیاز و نظر. لطفا دوباره تلاش کنید.');
        }
    };

    if (loading) {
        return <p className="loading-message">در حال بارگذاری...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!teacher) {
        return <p className="not-found-message">معلم یافت نشد.</p>;
    }

    return (
        <div className="teacher-details-container">
            <div className="teacher-info">
                <div className="profile-section">
                    <img
                        src={`https://mybuketserver.storage.c2.liara.space/${teacher.teacherData?.filename}`}
                        alt="Profile"
                        className="profile-image"
                    />
                    <h1 className="teacher-name">{teacher.name}</h1>
                </div>
                <div className="teacher-details">
                    <p><strong>نقش:</strong> {teacher.teacherData?.duty}</p>
                    <p><strong>تحصیلات:</strong> {teacher.teacherData?.education}</p>
                    <p><strong>امتیاز:</strong> {teacher.scoreNum} ⭐</p>
                </div>

                <div className="uploaded-files">
                    <h2>فایل‌های معلم</h2>
                    <ul className="file-list">
                        {teacher.teacherFiles?.map((file, index) => (
                            <li key={index} className="file-item">
                                <a
                                    href={`https://mybuketserver.storage.c2.liara.space/${file.filename}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {file.body&&file.body}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="rating-container">
                <h2>امتیازدهی و نظرات</h2>

                <div className="rating-stars">
                    <label>امتیاز:</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? 'active' : ''}`}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p>امتیاز شما: {rating} ستاره</p>
                </div>

                <div className="comment-section">
                    <label>انتقادات و پیشنهادات:</label>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="نظر خود را وارد کنید..."
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className="submit-button"
                >
                    ثبت امتیاز و نظر
                </button>

                {submissionSuccess && (
                    <p className="success-message">امتیاز و نظر شما با موفقیت ثبت شد!</p>
                )}
            </div>
        </div>
    );
};

export default TeacherDetails;