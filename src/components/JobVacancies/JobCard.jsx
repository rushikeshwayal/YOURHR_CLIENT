// src/components/JobCard.js

import React from "react";

// Placeholder for a company logo with a richer gray background
const CompanyLogo = () => (
    <div className="w-14 h-14 flex-shrink-0 bg-gray-800 rounded-lg flex items-center justify-center shadow-inner">
        <svg
            className="w-8 h-8 text-gray-400" // Lighter gray icon for contrast
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    </div>
);

export default function JobCard({ job, onApply }) {
    const skills = job.skills_required.split(",").map((skill) => skill.trim());

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            {/* Subtle background pattern or overlay for richness */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50 z-0"></div>
            <div className="relative z-10 flex flex-col h-full"> {/* Ensure content is above background */}
                <div className="flex items-center mb-6">
                    <CompanyLogo />
                    <div className="ml-5">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                            {job.job_title}
                        </h2>
                        <p className="text-md text-gray-600 mt-1">{job.company_name}</p>
                    </div>
                </div>

                <div className="flex-grow">
                    <p className="text-xl text-green-700 font-bold mb-4">
                        {job.salary_range}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => onApply(job.job_id)}
                    className="w-full mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 transform hover:-translate-y-0.5"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}