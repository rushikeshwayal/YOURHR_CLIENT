import React, { useState, useEffect } from 'react';
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
    </svg>
);
const DetailList = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div>
            <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">{title}</h4>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const MentorDetailModal = ({ mentor, onClose, onOpenEmail }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    if (!mentor) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        >
            <div
                className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 relative">
                    <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <CloseIcon />
                    </button>
                    <div className="flex flex-col items-center text-center">
                        <img className="w-24 h-24 rounded-full object-cover mb-4" src={mentor.imageUrl} alt={mentor.name} />
                        <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                        <p className="text-gray-600">{mentor.role}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                            <span>{mentor.domain}</span>
                            <span className="text-gray-300">|</span>
                            <span>{mentor.experience} yrs experience</span>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <button
                                onClick={() => {
                                    onOpenEmail(mentor);
                                    handleClose();
                                }}
                                className="flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <MailIcon /> Send Email
                            </button>
                            <a href={`mailto:${mentor.email}`} className="text-blue-600 hover:underline">{mentor.email}</a>
                        </div>
                    </div>

                    <div className="text-left mt-8">
                        <h3 className="text-md font-bold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
                    </div>

                    <div className="border-t border-gray-200 mt-8 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-left">
                        <DetailList title="Articles" items={mentor.articles} />
                        <DetailList title="Papers" items={mentor.papers} />
                        <DetailList title="Projects" items={mentor.projects} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MentorDetailModal;