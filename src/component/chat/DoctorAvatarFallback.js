import React from 'react';

const DoctorAvatarFallback = ({ isSpeaking }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      {isSpeaking && (
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Speaking</span>
        </div>
      )}
      
      <p className="text-gray-500 mt-4 text-center px-6">
        3D Doctor Avatar<br />
        <span className="text-sm">(Simplified View)</span>
      </p>
    </div>
  );
};

export default DoctorAvatarFallback; 