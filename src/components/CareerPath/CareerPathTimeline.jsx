import React from 'react';

// Reusable icon components for different resource types
const Icon = ({ type }) => {
    const icons = {
        Book: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        Course: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
        Documentation: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    };
    return icons[type] || icons['Documentation']; // Default icon
};

const TimelineItem = ({ data, isLast }) => {
    const { step, title, description, estimated_time, priority, resources } = data;

    const priorityClasses = {
        High: 'bg-red-100 text-red-800 border-red-300',
        Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        Low: 'bg-green-100 text-green-800 border-green-300',
    };

    return (
        <div className="relative flex items-start">
            {/* Timeline Line */}
            {!isLast && <div className="absolute top-5 left-5 -bottom-4 w-0.5 bg-gray-300"></div>}

            {/* Step Number Circle */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold rounded-full z-10">
                {step}
            </div>

            {/* Content Card */}
            <div className="ml-6 flex-grow pb-12">
                <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <div className="flex items-center gap-x-4 mt-2 sm:mt-0">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${priorityClasses[priority] || 'bg-gray-100 text-gray-800'}`}>
                                {priority} Priority
                            </span>
                            <span className="text-sm font-medium text-gray-500">{estimated_time}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-6">{description}</p>

                    <h4 className="font-semibold text-gray-800 mb-3">Recommended Resources:</h4>
                    <ul className="space-y-3">
                        {resources.map((resource, index) => (
                            <li key={index}>
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200 group"
                                >
                                    <Icon type={resource.type} />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800 group-hover:text-emerald-700">{resource.title}</p>
                                        <p className="text-xs text-gray-500">{resource.type}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-emerald-700 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

function CareerPathTimeline({ pathData }) {
    if (!pathData || pathData.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Your Personalized Roadmap</h2>
            <div className="relative">
                {pathData.map((item, index) => (
                    <TimelineItem
                        key={item.step}
                        data={item}
                        isLast={index === pathData.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

export default CareerPathTimeline;
