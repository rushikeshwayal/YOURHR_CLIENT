import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// CORRECTED: Adjusted the import path for useAuth assuming a different directory structure. 
// You might need to adjust this further based on your specific project setup.
import { useAuth } from '../../Authentication/components/firebase/firebase';

/* ---------- Reusable Text Section ---------- */
const JobDetailSection = ({ title, children }) => {
    // Keep this simple for Description, Responsibilities, Benefits
    if (!children) return null;
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">
                {title}
            </h2>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line prose prose-invert prose-sm max-w-none prose-p:my-2">
                {children}
            </div>
        </div>
    );
};

/* ---------- Reusable Sidebar Info Item ---------- */
const SidebarInfoItem = ({ label, value, icon }) => {
    if (!value) return null;
    return (
        <li className="flex items-start py-3">
            <div className="flex-shrink-0 w-6 h-6 text-slate-400 mt-0.5">{icon}</div>
            <div className="ml-3">
                <span className="font-semibold text-slate-400 text-sm">{label}</span>
                <p className="text-white text-sm">{value}</p>
            </div>
        </li>
    );
};

/* ---------- Reusable Skill Pill ---------- */
const SkillPill = ({ skill }) => (
    <span className="inline-block rounded-md bg-slate-700 px-3 py-1 text-sm font-medium text-slate-200">
        {skill.trim()}
    </span>
);

/* ---------- Application Form Component ---------- */
const ApplicationForm = ({
    applied,
    savedResumes,
    selectedResumeId,
    setSelectedResumeId,
    whyHired,
    setWhyHired,
    handleApply,
    isSubmitting
}) => {
    if (applied) {
        return (
            <div className="mt-12 pt-8 border-t border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Apply for this role
                </h2>
                <div className="p-6 bg-green-900/50 text-green-300 border-l-4 border-green-500 rounded-r-lg text-center">
                    <p className="font-bold text-lg">Application Sent!</p>
                    <p>You have successfully applied for this position.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 pt-8 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
                Apply for this role
            </h2>
            <form onSubmit={handleApply} className="space-y-6">
                {/* Resume Selection */}
                <div>
                    <label className="block mb-2 text-lg font-semibold text-slate-300">
                        Select Your Latest Resume
                    </label>
                    {savedResumes.length > 0 ? (
                        <select
                            value={selectedResumeId}
                            onChange={(e) => setSelectedResumeId(e.target.value)}
                            required
                            className="w-full p-4 border border-slate-700 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="">-- Select Resume --</option>
                            {/* Assuming API returns resume_link directly or an ID mapped to it */}
                            {savedResumes.map(resume => (
                                <option key={resume.id} value={resume.resume_link}>
                                    {/* Display something meaningful, e.g., filename or date */}
                                    Resume ({new Date(resume.created_at).toLocaleDateString()}) - {resume.id}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-slate-500 italic">
                            No resume found. Please create one in your profile first.
                        </p>
                    )}
                </div>
                {/* Why Hire Textarea */}
                <div>
                    <label htmlFor="whyHired" className="block mb-2 text-lg font-semibold text-slate-300">
                        Why should you be hired for this role?
                    </label>
                    <textarea
                        id="whyHired"
                        value={whyHired}
                        onChange={(e) => setWhyHired(e.target.value)}
                        required
                        className="w-full p-4 border border-slate-700 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
                        rows={6}
                        placeholder="Share your qualifications, experience, and passion..."
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || savedResumes.length === 0 || !selectedResumeId}
                    className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};


/* ---------- Main Job Detail Page Component ---------- */
const JobDetailPage = () => {
    const { id: jobId } = useParams();
    const { currentUser } = useAuth(); // Get user info from context
    const userEmail = currentUser?.email || "";

    // Job and Company State
    const [jobDetails, setJobDetails] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Application Form State
    const [applied, setApplied] = useState(false);
    const [whyHired, setWhyHired] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [savedResumes, setSavedResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState(""); // Stores the resume_link/id

    // Fetch Job and Company Data
    useEffect(() => {
        setJobDetails(null); setCompanyName(''); setError(null); setLoading(true);

        const fetchJobAndCompanyData = async () => {
            if (!jobId) {
                setError("Job ID missing."); setLoading(false); return;
            }
            try {
                const jobResponse = await fetch(`http://localhost:8000/company-jobs/get/jobs/${jobId}`);
                if (!jobResponse.ok) throw new Error(`Job fetch failed: ${jobResponse.status}`);
                const jobData = await jobResponse.json();
                setJobDetails(jobData);

                if (jobData && jobData.company_id) {
                    try {
                        const companyResponse = await fetch(`http://localhost:8000/companies/get/companies/${jobData.company_id}`);
                        if (companyResponse.ok) {
                            const companyData = await companyResponse.json();
                            setCompanyName(companyData.name || '');
                        } else { console.warn(`Company name fetch failed: ${companyResponse.status}`); }
                    } catch (companyErr) { console.warn("Error fetching company:", companyErr); }
                }
            } catch (err) {
                console.error("Fetch error:", err); setError(err.message);
            } finally {
                setLoading(false); // Set loading false *after* all fetches attempt
            }
        };
        fetchJobAndCompanyData();
    }, [jobId]);

    // Fetch User's Resumes
    useEffect(() => {
        const fetchUserResumes = async () => {
            if (!userEmail) return;
            // NOTE: Fetching ALL users to find ID is inefficient.
            // Ideally, use an endpoint like /users/me or /users/email/{email}
            try {
                const usersRes = await fetch("http://localhost:8000/users");
                if (!usersRes.ok) return; // Silently fail if cannot get users
                const users = await usersRes.json();
                const user = users.find((u) => u.email_address?.toLowerCase() === userEmail.toLowerCase());

                if (!user || !user.id) {
                    console.warn("Could not find user ID for email:", userEmail);
                    setSavedResumes([]); // Ensure it's empty if user not found
                    return;
                }

                // Fetch resumes for the found user ID
                const resumesRes = await fetch(`http://localhost:8000/resumes/user/${user.id}`);
                if (resumesRes.ok) {
                    const resumes = await resumesRes.json();
                    // Store the resumes (or just the latest one if desired)
                    // Assuming you want all resumes in the dropdown
                    setSavedResumes(resumes || []);
                    // Automatically select the latest if available?
                    // if (resumes.length > 0) {
                    //     setSelectedResumeId(resumes[resumes.length - 1].resume_link); // Assuming resume_link is what API needs
                    // }
                } else {
                    console.warn("Could not fetch user resumes.");
                    setSavedResumes([]);
                }
            } catch (err) {
                console.error("Failed to load resumes:", err);
                setSavedResumes([]); // Reset on error
            }
        };
        fetchUserResumes();
    }, [userEmail]); // Refetch if user changes

    // Check if User Already Applied
    useEffect(() => {
        const checkApplied = async () => {
            // Need jobDetails to get the specific job's internal DB ID (jobDetails.id)
            if (!userEmail || !jobDetails || !jobDetails.id) return;

            setApplied(false); // Reset check state
            try {
                // Fetch ALL applications - INEFFICIENT, needs specific check endpoint ideally
                const res = await fetch("http://localhost:8000/company-applications/get/applications"); // Use correct endpoint
                if (!res.ok) {
                    console.warn("Could not fetch applications to check status.");
                    return;
                }
                const applications = await res.json();

                // Check if an application exists for this user and this specific job's internal ID
                const found = applications.some(
                    (app) => app.email === userEmail && app.company_job_id === jobDetails.id
                );
                setApplied(found);
            } catch (err) {
                console.error("Failed to check application status:", err);
            }
        };
        // Run check only when userEmail and jobDetails (specifically jobDetails.id) are available
        if (userEmail && jobDetails?.id) {
            checkApplied();
        }
    }, [userEmail, jobDetails]); // Dependency on jobDetails ensures we have jobDetails.id


    // --- Application Submission Handler ---
    const handleApply = async (e) => {
        e.preventDefault();
        if (!selectedResumeId || !jobDetails?.id) {
            alert("Please select your resume and ensure job details are loaded.");
            return;
        }
        setIsSubmitting(true);
        setError(null); // Clear previous errors

        try {
            const applicationData = {
                email: userEmail,
                resume_link: "https://example.com/", // Send the selected resume link/ID
                why_hired: whyHired,
                company_job_id: jobDetails.id, // Use the internal DB ID from jobDetails
            };

            console.log("Submitting application:", applicationData); // For debugging

            const response = await fetch("http://localhost:8000/company-applications/post/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(applicationData),
            });

            if (response.ok) {
                setApplied(true); // Update UI to show "Applied"
                alert("Application submitted successfully!");
            } else {
                const errorData = await response.json().catch(() => ({ detail: "Unknown server error" })); // Catch cases where response isn't JSON
                console.error("Application API Error:", errorData);
                setError(`Error applying: ${errorData.detail || `Status ${response.status}`}`);
                alert(`Error applying: ${errorData.detail || `Status ${response.status}`}`);
            }
        } catch (err) {
            console.error("Application submission fetch error:", err);
            setError("An unexpected error occurred while submitting your application.");
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    // --- RENDER STATES ---
    if (loading) return ( /* Loading state */
        <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold animate-pulse">Loading Job Details...</h2>
            <p className="text-slate-400 mt-2">Connecting...</p>
        </main>
    );
    if (error) return ( /* Error state */
        <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl font-bold text-red-500">Error Loading Job</h2>
            <p className="text-slate-400 mt-2 max-w-md">{error}</p>
            <div className="mt-6"><a href="/explore" className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white">Back to Explore</a></div>
        </main>
    );
    if (!jobDetails) return ( /* Job Not Found state */
        <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl font-bold text-yellow-500">Job Not Found</h2>
            <p className="text-slate-400 mt-2 max-w-md">Could not find details for the specified job ID.</p>
            <div className="mt-6"><a href="/explore" className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white">Back to Explore</a></div>
        </main>
    );

    // --- RENDER MAIN COMPONENT ---
    const {
        title, role, location, job_type, salary_range, experience_required, skills_required,
        description, responsibilities, benefits, company_id
    } = jobDetails;
    const skills = skills_required ? skills_required.split(',').map(skill => skill.trim()).filter(Boolean) : [];

    // Icons (keep as before)
    const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
    const SalaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
    const TypeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
    const ExperienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"></path><circle cx="12" cy="12" r="10"></circle></svg>;

    return (
        <main className="bg-black text-white min-h-screen">
            {/* Header */}
            <section className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">{title}</h1>
                    <p className="mt-3 text-xl text-primary font-medium">{companyName || role}</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* --- LEFT COLUMN --- */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Job Details */}
                            <JobDetailSection title="Job Description">{description}</JobDetailSection>
                            <JobDetailSection title="Responsibilities">{responsibilities}</JobDetailSection>
                            <JobDetailSection title="Benefits">{benefits}</JobDetailSection>

                            {/* Application Form */}
                            <ApplicationForm
                                applied={applied}
                                savedResumes={savedResumes}
                                selectedResumeId={selectedResumeId}
                                setSelectedResumeId={setSelectedResumeId}
                                whyHired={whyHired}
                                setWhyHired={setWhyHired}
                                handleApply={handleApply}
                                isSubmitting={isSubmitting}
                            />
                        </div>

                        {/* --- RIGHT COLUMN (Sidebar) --- */}
                        <div className="md:col-span-1 space-y-8">
                            {/* Overview Card */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                <h3 className="text-xl font-bold text-white mb-2">Job Overview</h3>
                                <ul className="divide-y divide-slate-800">
                                    <SidebarInfoItem label="Location" value={location} icon={<LocationIcon />} />
                                    <SidebarInfoItem label="Salary" value={salary_range} icon={<SalaryIcon />} />
                                    <SidebarInfoItem label="Employment Type" value={job_type} icon={<TypeIcon />} />
                                    <SidebarInfoItem label="Experience" value={experience_required} icon={<ExperienceIcon />} />
                                </ul>
                            </div>

                            {/* Skills Card */}
                            {skills.length > 0 && (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Skills Required</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, index) => <SkillPill key={index} skill={skill} />)}
                                    </div>
                                </div>
                            )}

                            {/* Back link */}
                            {company_id && (
                                <div>
                                    <Link to={`/company/${company_id}`} className="inline-block text-sm text-primary hover:underline">
                                        ← View all jobs at {companyName || 'this company'}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JobDetailPage;

