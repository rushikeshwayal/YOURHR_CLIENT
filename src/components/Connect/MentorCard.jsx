import React from 'react';
const MentorCard = ({ mentor, onSelect, onEmail }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
        <div className="flex items-start gap-4">
            <img className="w-16 h-16 rounded-full object-cover" src={mentor.imageUrl} alt={mentor.name} />
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.role}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span>{mentor.domain}</span>
                    <span className="text-gray-300">|</span>
                    <span>{mentor.experience} yrs exp</span>
                </div>
            </div>
        </div>
        <p className="text-gray-600 text-sm mt-4 flex-grow">{mentor.bio}</p>
        <div className="flex items-center gap-3 mt-6">
            <button
                onClick={() => onSelect(mentor)}
                className="flex-1 text-center bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
                View details
            </button>
            <button
                onClick={() => onEmail(mentor)}
                className="flex-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Email
            </button>
        </div>
    </div>
);
export default MentorCard;