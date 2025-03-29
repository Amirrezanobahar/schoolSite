import React, { useState } from 'react';
import axios from 'axios';
import './requestCompo.css';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://fsosiety.liara.run/v1/user/students');
            setStudents(response.data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching students:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='allStudents'>
        <button onClick={fetchStudents} disabled={loading}>
            {loading ? 'Loading...' : 'Load Students'}
        </button>

        {error && <p className='errorMessage'>{error}</p>}

        {students.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.age}</td>
                            <td>{student._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            !loading && <p className='noStudentsMessage'>No students found.</p>
        )}
    </div>
    );
}