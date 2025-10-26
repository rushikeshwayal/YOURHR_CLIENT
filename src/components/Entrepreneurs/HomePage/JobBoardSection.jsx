import React, { useEffect, useState } from 'react';
// import { FiChevronDown } from 'react-icons/fi'; // Icon not currently used
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Modified JobRow to use navigate instead of direct link
const JobRow = ({ company, role, location, type, posted, jobId /* Added jobId prop */ }) => {
    const navigate = useNavigate();

    const handleViewJob = () => {
        if (jobId) {
            navigate(`/company-job/${jobId}`); // Navigate to internal detail page
        } else {
            console.error("Job ID is missing, cannot navigate.");
            // Optionally provide feedback to the user
        }
    };

    return (
        <tr className="group border-b border-slate-800 transition-colors duration-200 hover:bg-slate-800/50">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{company}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{role}</td>
            <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-400 md:table-cell">{location}</td>
            <td className="hidden whitespace-nowrap px-6 py-4 lg:table-cell">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${type === 'Full-time' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-indigo-900/60 text-indigo-300'}`}>
                    {type}
                </span>
            </td>
            <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-400 sm:table-cell">{posted}</td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                {/* Changed from <a> to <button> and added onClick */}
                <button
                    onClick={handleViewJob}
                    className="text-primary font-semibold hover:text-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!jobId} // Disable button if jobId is missing
                >
                    View Job
                </button>
            </td>
        </tr>
    );
};

const JobBoardSection = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null); // Reset error
            try {
                const response = await fetch('http://localhost:8000/company-jobs/get/jobs');
                if (!response.ok) {
                    throw new Error(`Failed to fetch jobs: ${response.status}`);
                }
                const data = await response.json();

                // Ensure data is an array before mapping
                if (!Array.isArray(data)) {
                    console.error("API did not return an array:", data);
                    throw new Error("Invalid data format received from API.");
                }

                const formattedJobs = data.map(job => ({
                    // Assuming API returns company name directly or fetch it if needed
                    // company: job.company_name || job.title, // Use actual company name if possible
                    company: job.title, // Placeholder using job title if no company name
                    role: job.role,
                    location: job.location,
                    type: job.job_type,
                    posted: new Date(job.posted_date).toLocaleDateString(),
                    // apply_link: job.apply_link, // Keep if needed elsewhere, but not for the button
                    jobId: job.job_id // <-- Added jobId mapping
                }));
                setJobs(formattedJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setError(error.message || "Could not load jobs."); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <section className="py-16 sm:py-24 bg-black text-white text-center">
                <p className="animate-pulse">Loading jobs...</p>
            </section>
        );
    }

    // Added error display
    if (error) {
        return (
            <section className="py-16 sm:py-24 bg-black text-white text-center">
                <p className="text-red-500">Error: {error}</p>
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-24 bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Job Board</h2>
                    <p className="mt-4 text-lg text-slate-400">Find your next role at a fast-growing startup.</p>
                </div>

                {jobs.length > 0 ? (
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
                        <table className="min-w-full">
                            <thead className="border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Company / Job Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell">Location</th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 lg:table-cell">Type</th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 sm:table-cell">Posted</th>
                                    <th className="relative px-6 py-3"><span className="sr-only">View Job</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {/* Displaying limited jobs, pass jobId */}
                                {jobs.slice(0, 5).map((job, index) => <JobRow key={job.jobId || index} {...job} />)}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Message when no jobs are found
                    <div className="text-center text-slate-400 py-16 border border-dashed border-slate-700 rounded-lg">
                        <p>No job openings found at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobBoardSection;
