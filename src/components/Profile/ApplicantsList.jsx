// src/components/Profile/ApplicantsList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeViewerModal from './ResumeViewerModal';

// This sub-component fetches and displays data for a single applicant row
const ApplicantRow = ({ application }) => {
    const [applicantData, setApplicantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`http://localhost:8000/users/email/${encodeURIComponent(application.email)}`);
                const userId = userRes.data.id;

                if (!userId) {
                    throw new Error("User ID could not be found for the applicant's email.");
                }

                const resumesRes = await axios.get(`http://localhost:8000/resumes/user/${userId}`);

                // ✨ FIX: Compare application.resume_link against resume.id instead of resume.resume_id
                const submittedResume = resumesRes.data.find(
                    (resume) => resume.id === application.resume_link
                );

                if (!submittedResume) {
                    console.warn("Could not find a matching resume! The ID from the application did not match any resume's main ID.");
                }

                setApplicantData({
                    user: userRes.data,
                    resume: submittedResume,
                });

            } catch (error) {
                console.error("Failed to fetch applicant details:", error);
                setApplicantData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [application]);

    if (loading) {
        return <tr><td colSpan="4" className="p-4 text-center">Loading applicant...</td></tr>;
    }

    if (!applicantData || !applicantData.resume) {
        return <tr><td colSpan="4" className="p-4 text-center text-red-500">Could not load applicant data or resume.</td></tr>;
    }

    return (
        <>
            <tr className="hover:bg-slate-50">
                <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900">{applicantData.user.full_name}</td>
                <td className="p-4 whitespace-nowrap text-sm text-slate-500">{application.email}</td>
                <td className="p-4 whitespace-nowrap text-sm text-slate-500">{new Date(application.created_at).toLocaleDateString()}</td>
                <td className="p-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => setIsResumeOpen(true)} className="text-blue-600 hover:text-blue-800">
                        View Resume
                    </button>
                </td>
            </tr>
            <ResumeViewerModal
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
                resumeData={applicantData.resume.resume_data}
            />
        </>
    );
};

// ... the rest of the ApplicantsList component remains the same
const ApplicantsList = ({ job }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/job/${job.job_id}`);
                setApplications(response.data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [job.job_id]);

    if (loading) return <div className="p-6 text-center">Loading applicants...</div>;

    return (
        <div className="bg-slate-100 p-4 border-t-4 border-blue-200">
            {applications.length === 0 ? (
                <p className="text-center text-slate-500 py-4">No applications received for this job yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Applicant Name</th>
                                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Applied On</th>
                                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {applications.map(app => <ApplicantRow key={app.id} application={app} />)}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicantsList;