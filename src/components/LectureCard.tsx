import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface LectureProps {
  lecture: {
    title: string;
    description: string;
    startTime: string;
    duration: number;
    isLive: boolean;
    liveLink: string;
    teacher: {
      name: string;
    };
  };
}

const LectureCard: React.FC<LectureProps> = ({ lecture }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{lecture.title}</h3>
          {lecture.isLive && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              LIVE
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4">{lecture.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(lecture.startTime).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          {lecture.duration} minutes
        </div>
        <div className="text-sm text-gray-500">
          Teacher: {lecture.teacher.name}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t">
        <a
          href={lecture.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Join Lecture
        </a>
      </div>
    </div>
  );
};

export default LectureCard;