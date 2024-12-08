import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LectureCard from '../components/LectureCard';
import TeacherDashboard from '../components/TeacherDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/lectures');
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchLectures();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={user.profilePicture || 'https://via.placeholder.com/100'}
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mt-1">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {user.role === 'teacher' ? (
        <TeacherDashboard />
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Lectures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture: any) => (
              <LectureCard key={lecture._id} lecture={lecture} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;