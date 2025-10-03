import React from 'react';

// A more engaging, AI-themed loader for the modal content
const AILoader = () => (
    <div className="text-center p-8">
        <div className="flex justify-center items-center">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-blue-500/30 animate-pulse [animation-delay:0.5s]"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.528l.259 1.035.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456z" />
                    </svg>
                </div>
            </div>
        </div>
        <p className="mt-4 text-gray-600 font-semibold">Generating questions...</p>
    </div>
);


const InterviewQuestionsModal = ({ isOpen, onClose, questions, loading, onDownload }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-x-3">
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg shadow-md">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.528l.259 1.035.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                            AI Generated Interview Questions
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">&times;</button>
                </div>

                {/* Modal Body */}
                <div className="flex-grow p-6 max-h-[60vh] overflow-y-auto">
                    {loading ? <AILoader /> : (
                        questions.length > 0 ? (
                            <ul className="space-y-6">
                                {questions.map((q, idx) => (
                                    <li key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="font-semibold text-gray-900 mb-2">Q: {q.question}</p>
                                        {q.answer && <p className="text-gray-600 pl-4 border-l-2 border-blue-300">A: {q.answer}</p>}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-600 py-8 text-center">No questions could be generated for this role.</p>
                    )}
                </div>

                {/* Modal Footer */}
                {!loading && questions.length > 0 && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                        <button
                            onClick={onDownload}
                            className="w-full flex items-center justify-center gap-x-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Questions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewQuestionsModal;