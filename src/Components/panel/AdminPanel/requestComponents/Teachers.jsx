import React, { useState } from 'react';
import axios from 'axios';
import './requestCompo.css';


export default function Teachers() {
    const [Teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeachers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://fsosiety.liara.run/v1/user/teachers');
            setTeachers(response.data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching Teachers:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='allTeachers'>
        <button onClick={fetchTeachers} disabled={loading}>
            {loading ? 'Loading...' : 'Load Teachers'}
        </button>

        {error && <p className='errorMessage'>{error}</p>}

        {Teachers.length > 0 ? (
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
                    {Teachers.map((teacher) => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.phone}</td>
                            <td>{teacher.age}</td>
                            <td>{teacher._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            !loading && <p className='noTeachersMessage'>No teachers found.</p>
        )}
    </div>
    );
}