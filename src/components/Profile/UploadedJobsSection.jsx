// src/components/Profile/UploadedJobsSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../Authentication/components/firebase/firebase";
import EditJobModal from './EditJobModal';
import ApplicantsList from './ApplicantsList'; // Import the new component
import { FiEye, FiEdit2 } from 'react-icons/fi';

const JobCard = ({ job, onEdit, onToggleApplicants, isViewing }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm transition-shadow duration-200">
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{job.job_title}</h3>
                <p className="text-slate-600 mb-4">{job.company_name} - {job.location}</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-500 mb-4">
                    <p><strong>Type:</strong> {job.employment_type}</p>
                    <p><strong>Salary:</strong> {job.salary_range}</p>
                    <p><strong>Posted:</strong> {formatDate(job.job_posted_date)}</p>
                    <p><strong>Deadline:</strong> {formatDate(job.application_deadline)}</p>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={() => onToggleApplicants(job.job_id)}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isViewing ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                        <FiEye className="mr-2 h-4 w-4" />
                        <span>{isViewing ? 'Hide Applicants' : 'View Applicants'}</span>
                    </button>
                    <button
                        onClick={() => onEdit(job)}
                        className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                    >
                        <FiEdit2 className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </button>
                </div>
            </div>
            {/* Conditionally render the applicants list here */}
            {isViewing && <ApplicantsList job={job} />}
        </div>
    );
};

const UploadedJobsSection = ({ currentUser }) => {
    const [postedJobs, setPostedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);
    const [viewingApplicantsFor, setViewingApplicantsFor] = useState(null); // State to track which job's applicants are visible

    const fetchPostedJobs = async () => {
        // ... (your existing fetch logic remains the same)
        if (!currentUser?.email) {
            setError("User email not available.");
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const encodedEmail = encodeURIComponent(currentUser.email);
            const response = await axios.get(`http://localhost:8000/jobs/user/${encodedEmail}`);
            setPostedJobs(response.data);
        } catch (err) {
            console.error("Error fetching posted jobs:", err);
            setError("Failed to load your posted jobs.");
            setPostedJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostedJobs();
    }, [currentUser]);

    const handleEditClick = (job) => {
        setJobToEdit(job);
        setIsEditModalOpen(true);
    };

    const handleJobUpdated = () => {
        setIsEditModalOpen(false);
        setJobToEdit(null);
        fetchPostedJobs();
    };

    // Toggle which applicant list is visible
    const handleToggleApplicants = (jobId) => {
        setViewingApplicantsFor(prevId => (prevId === jobId ? null : jobId));
    };

    if (loading) return <div className="text-center p-8 text-slate-600">Loading your posted jobs...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">My Posted Jobs</h2>
            {postedJobs.length === 0 ? (
                <div className="text-center py-12 text-slate-600">
                    <p className="text-lg mb-2">You haven't posted any jobs yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {postedJobs.map(job => (
                        <JobCard
                            key={job.job_id}
                            job={job}
                            onEdit={handleEditClick}
                            onToggleApplicants={handleToggleApplicants}
                            isViewing={viewingApplicantsFor === job.job_id}
                        />
                    ))}
                </div>
            )}

            {jobToEdit && (
                <EditJobModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    job={jobToEdit}
                    onJobUpdated={handleJobUpdated}
                />
            )}
        </div>
    );
};

export default UploadedJobsSection;