import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/courses');
      setCourses(response.data);
      if (user) {
        setEnrolledCourses(user.enrolledCourses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await axios.post(`http://localhost:5500/api/courses/${courseId}/enroll`);
      setEnrolledCourses([...enrolledCourses, courseId]);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <CourseCard
            key={course._id}
            course={course}
            onEnroll={handleEnroll}
            isEnrolled={enrolledCourses.includes(course._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;