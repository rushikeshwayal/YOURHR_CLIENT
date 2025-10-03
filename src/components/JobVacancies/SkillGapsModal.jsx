import React from 'react';
import { Link } from 'react-router-dom';
import SkillMatchPieChart from './SkillMatchPieChart'; // 1. Import the new Pie Chart component

// AI-themed loader for the modal content
const AILoader = () => (
    <div className="text-center p-8">
        <div className="flex justify-center items-center">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-purple-500/30 animate-pulse [animation-delay:0.5s]"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                </div>
            </div>
        </div>
        <p className="mt-4 text-gray-600 font-semibold">Analyzing your profile against the job requirements...</p>
    </div>
);

const SkillGapsModal = ({ isOpen, onClose, skillGaps, loading }) => {
    if (!isOpen) return null;

    // 2. Parse the data to separate the percentage from the gaps list
    const percentageData = skillGaps?.find(item => item.percentage_skill_gap);
    const skillGapList = skillGaps?.filter(item => item.skill_gap) || [];
    const percentage = percentageData ? parseFloat(percentageData.percentage_skill_gap) : 0;

    const noGapsFound = skillGaps === null || (skillGapList.length === 0 && percentage === 0);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-x-3">
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg shadow-md">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">AI Skill Gap Analysis</h3>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">&times;</button>
                </div>

                {/* Modal Body */}
                <div className="flex-grow p-6 max-h-[60vh] overflow-y-auto">
                    {loading ? <AILoader /> : (
                        noGapsFound ? (
                            <div className="text-center py-8">
                                <p className="text-2xl text-green-700 font-bold">You're a Great Match! 🎉</p>
                                <p className="text-gray-500 mt-2">Your skills align perfectly with the job requirements.</p>
                            </div>
                        ) : (
                            // 3. Render the pie chart and the list together
                            <div className="space-y-8">
                                <SkillMatchPieChart percentage={percentage} />
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">Identified Skill Gaps</h4>
                                    <ul className="space-y-4">
                                        {skillGapList.map((gap, idx) => (
                                            <li key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <p className="font-semibold text-gray-900 mb-2">{gap.skill_gap}</p>
                                                <p className="text-gray-600 pl-4 border-l-2 border-purple-300">{gap.explanation}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Modal Footer */}
                {!loading && !noGapsFound && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                        <Link
                            to="/careerpath"
                            className="w-full flex items-center justify-center gap-x-2 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                            </svg>
                            Build a Career Path to Fill These Gaps
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillGapsModal;

