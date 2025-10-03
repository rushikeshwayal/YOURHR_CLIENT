// src/components/Profile/ResumeViewerModal.jsx

import React from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiLinkedin, FiMapPin, FiAward, FiBookOpen, FiCode, FiUsers } from 'react-icons/fi';

const ResumeSection = ({ title, icon, children }) => (
    <div className="mb-6">
        <h3 className="flex items-center text-xl font-bold text-slate-700 border-b-2 border-slate-200 pb-2 mb-3">
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        {children}
    </div>
);

const ResumeViewerModal = ({ isOpen, onClose, resumeData }) => {
    if (!isOpen || !resumeData) return null;

    const { personal = {}, summary, work_experience = [], education = [], skills = [], projects = [], certifications = [] } = resumeData;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="flex items-start justify-between p-5 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">{personal.name}</h2>
                        <p className="text-lg text-blue-600 font-medium">{personal.headline}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-grow p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <ResumeSection title="Summary" icon={<FiUser size={20} />}>
                                <p className="text-slate-600">{summary}</p>
                            </ResumeSection>
                            <ResumeSection title="Work Experience" icon={<FiUsers size={20} />}>
                                {work_experience.map((exp, i) => (
                                    <div key={i} className="mb-4">
                                        <h4 className="font-semibold text-slate-800">{exp.title} at {exp.company}</h4>
                                        <p className="text-sm text-slate-500">{exp.start_date} - {exp.end_date} | {exp.location}</p>
                                        <ul className="list-disc list-inside mt-1 text-slate-600">
                                            {exp.description.map((desc, j) => <li key={j}>{desc}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </ResumeSection>
                        </div>
                        <div className="md:col-span-1">
                            <ResumeSection title="Contact" icon={<FiMail size={20} />}>
                                <p className="text-slate-600 flex items-center mb-1"><FiMail className="mr-2" /> {personal.email}</p>
                                <p className="text-slate-600 flex items-center mb-1"><FiPhone className="mr-2" /> {personal.phone}</p>
                                <p className="text-slate-600 flex items-center"><FiMapPin className="mr-2" /> {personal.location}</p>
                            </ResumeSection>
                            <ResumeSection title="Skills" icon={<FiCode size={20} />}>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                                </div>
                            </ResumeSection>
                            <ResumeSection title="Education" icon={<FiBookOpen size={20} />}>
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h4 className="font-semibold text-slate-800">{edu.degree}</h4>
                                        <p className="text-slate-600">{edu.institution}</p>
                                        <p className="text-sm text-slate-500">{edu.start_year} - {edu.end_year}</p>
                                    </div>
                                ))}
                            </ResumeSection>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeViewerModal;