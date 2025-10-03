import React, { useEffect, useState } from 'react';

const SkillMatchPieChart = ({ percentage }) => {
    const [offset, setOffset] = useState(0);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const skillMatch = 100 - percentage;

    useEffect(() => {
        // Animate the stroke offset on component mount
        const progressOffset = ((100 - skillMatch) / 100) * circumference;
        setOffset(progressOffset);
    }, [skillMatch, circumference]);

    return (
        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Your Skill Match</h4>
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <defs>
                        <linearGradient id="skillMatchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#34D399" />
                            <stop offset="100%" stopColor="#6EE7B7" />
                        </linearGradient>
                        <linearGradient id="skillGapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A78BFA" />
                            <stop offset="100%" stopColor="#C4B5FD" />
                        </linearGradient>
                    </defs>
                    {/* Background Circle for Skill Gaps */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="url(#skillGapGradient)"
                        strokeWidth="15"
                    />
                    {/* Foreground Circle for Skill Match */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="url(#skillMatchGradient)"
                        strokeWidth="15"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">{skillMatch}%</span>
                    <span className="text-sm text-gray-500 font-medium">Match</span>
                </div>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-x-6 mt-6">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 mr-2"></div>
                    <span className="text-sm font-semibold text-gray-700">Your Skills</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 mr-2"></div>
                    <span className="text-sm font-semibold text-gray-700">Skill Gaps</span>
                </div>
            </div>
        </div>
    );
};

export default SkillMatchPieChart;
