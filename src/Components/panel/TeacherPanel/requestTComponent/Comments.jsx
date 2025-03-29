import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './requestCompo.css'
export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://127.0.0.1:3000/v1/scoreComment/comments/',
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setComments(response.data);
        console.log(comments);
        
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="comments-loading">در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className="comments-error">خطا در دریافت نظرات.</p>;
  }

  return (
    <div className="comments-container">
      <h1 className="comments-title">نظرات</h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comment-card" key={comment._id}>
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-rating">امتیاز: {comment.rating}</p>
          </div>
        ))
      ) : (
        <p className="comments-empty">هیچ نظری یافت نشد.</p>
      )}
    </div>
  );
}

