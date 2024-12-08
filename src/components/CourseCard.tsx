import React from 'react';
import { Book, Users } from 'lucide-react';

interface CourseProps {
  course: {
    _id: string;
    title: string;
    language: string;
    description: string;
    level: string;
    teacher: {
      name: string;
    };
    students: string[];
    lectures: any[];
  };
  onEnroll?: (courseId: string) => void;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseProps> = ({ course, onEnroll, isEnrolled }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <span className={`px-2 py-1 rounded text-sm ${
            course.level === 'beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Book className="w-4 h-4 mr-2" />
          Language: {course.language}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="w-4 h-4 mr-2" />
          {course.students.length} students enrolled
        </div>
        <div className="text-sm text-gray-500">
          Teacher: {course.teacher.name}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t">
        {onEnroll && !isEnrolled ? (
          <button
            onClick={() => onEnroll(course._id)}
            className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Enroll Now
          </button>
        ) : (
          <div className="text-center text-green-600 font-medium">
            ✓ Enrolled
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;