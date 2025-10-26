import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* JobCard used inside this file */
const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const onView = () => navigate(`/company-job/${job.job_id}`);

    const posted = job.posted_date ? new Date(job.posted_date).toLocaleDateString() : "";

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h3 className="text-lg font-bold text-white">{job.title}</h3>
                <p className="text-slate-400">{job.role} · {job.location}</p>
                <div className="mt-2 text-sm text-slate-400">
                    {job.job_type} · {job.experience_required || "N/A"}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-slate-400 text-sm">Posted: {posted}</div>
                <button onClick={onView} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                    View
                </button>
            </div>
        </div>
    );
};

const CompanyJobsSection = ({ companyId }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }

        const fetchJobs = async () => {
            try {
                const res = await fetch(`http://localhost:8000/company-jobs/get/company/${companyId}`);
                if (!res.ok) throw new Error(`Failed to load jobs: ${res.status}`);
                const data = await res.json();
                // ensure array and show only up to 5 jobs
                setJobs(Array.isArray(data) ? data.slice(0, 5) : []);
            } catch (err) {
                console.error("jobs fetch error", err);
                setError(err.message || "Failed to load jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [companyId]);

    if (loading) return <div className="py-8 text-center text-slate-400">Loading jobs...</div>;
    if (error) return <div className="py-8 text-center text-red-500">Failed to load jobs</div>;
    if (!jobs.length) return null;

    return (
        <section className="py-12 border-t border-slate-800">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-6">Job Openings</h2>
                <div className="space-y-4">
                    {jobs.map(job => (
                        <JobCard job={job} key={job.job_id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyJobsSection;
