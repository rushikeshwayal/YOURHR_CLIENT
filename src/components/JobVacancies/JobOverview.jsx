import React from 'react';

// --- Helper Components ---

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start text-gray-600 mb-4">
        <div className="flex-shrink-0 w-6 h-6 mr-3 text-gray-400">{icon}</div>
        <div>
            <p className="font-semibold text-gray-800">{label}</p>
            <p className="text-gray-600">{value}</p>
        </div>
    </div>
);

const SkillsTags = ({ skills }) => {
    const skillList = skills.split(",").map((skill) => skill.trim());
    return (
        <div className="flex flex-wrap gap-2">
            {skillList.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                </span>
            ))}
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

// --- Main Component ---

const JobOverview = ({ job, handleGenerateQuestions, loadingQuestions, handleSkillGaps, loadingSkillGaps }) => (
    <div className="lg:col-span-1 p-8 lg:p-12 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Job Overview</h3>
        <DetailItem
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
            label="Location"
            value={job.location}
        />
        <DetailItem
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Salary"
            value={job.salary_range}
        />
        <DetailItem
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Employment Type"
            value={job.employment_type}
        />
        <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Skills Required</h3>
            <SkillsTags skills={job.skills_required} />
        </div>

        {/* AI Tools Section with Integrated Loaders */}
        <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI Tools</h3>
            <button
                onClick={handleGenerateQuestions}
                className="w-full flex items-center justify-center gap-x-2 px-4 py-3 mb-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                disabled={loadingQuestions}
            >
                {loadingQuestions ? <LoadingSpinner /> : null}
                <span>{loadingQuestions ? "Generating..." : "Generate Interview Questions"}</span>
            </button>
            <button
                onClick={handleSkillGaps}
                className="w-full flex items-center justify-center gap-x-2 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:bg-purple-400"
                disabled={loadingSkillGaps}
            >
                {loadingSkillGaps ? <LoadingSpinner /> : null}
                <span>{loadingSkillGaps ? "Analyzing..." : "Analyze My Skill Gaps"}</span>
            </button>
        </div>
    </div>
);

export default JobOverview;

