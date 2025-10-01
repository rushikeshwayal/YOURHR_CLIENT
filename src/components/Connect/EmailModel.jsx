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
const EmailModal = ({ mentor, onClose }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(e.target.subject.value);
        const body = encodeURIComponent(e.target.message.value);
        const to = mentor.email;

        // Open Gmail in new tab with pre-filled data
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`, "_blank");

        handleClose();
    };

    if (!mentor) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        >
            <div
                className={`bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Compose Email</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <input type="email" id="to" name="to" value={mentor.email} readOnly className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-lg p-2.5 outline-none" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input type="text" id="subject" name="subject" required className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea id="message" name="message" rows="5" required className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Write your message..."></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={handleClose} className="bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EmailModal;