import React, { useState, useEffect } from 'react';
// CORRECTED: Trying a different relative path for useAuth. Adjust if necessary.
import { useAuth } from '../../Authentication/components/firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
// CORRECTED: Assuming PostJobModal.js is in the same directory. Adjust if necessary.
import PostJobModal from './PostJobModal';

// Modified CompanyCard: No longer navigates on click, has buttons
const CompanyCard = ({
    company_id,
    logo_url,
    name,
    industry,
    description,
    founded_year,
    employee_count,
    website,
    onPostJobClick // New prop to handle opening the modal
}) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/company/${company_id}`);
    };

    const handlePostJob = (e) => {
        e.stopPropagation(); // Prevent potential event bubbling if needed
        onPostJobClick(company_id); // Call the function passed from parent
    };

    const handleWebsiteClick = (e) => {
        e.stopPropagation();
    };

    return (
        // Removed onClick from the main div
        <div
            className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg transition-colors duration-300 hover:border-slate-700"
        >
            {/* Header (same as before) */}
            <div className="flex items-start gap-4 mb-4">
                <img
                    src={logo_url || 'https://placehold.co/150x150/1e293b/94a3b8?text=Logo'}
                    alt={`${name} logo`}
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover border-2 border-slate-700"
                />
                <div>
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <span className="mt-1 inline-flex rounded-full bg-cyan-900/70 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {industry || 'Innovation'}
                    </span>
                </div>
            </div>
            {/* Body (same as before) */}
            <div className="flex-grow">
                <p className="text-sm text-slate-400 line-clamp-3">
                    {description || 'No description provided.'}
                </p>
            </div>
            {/* Footer (Modified with buttons) */}
            <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center text-sm text-slate-400 mb-4">
                    <div><strong>Founded:</strong> {founded_year || 'N/A'}</div>
                    <div><strong>Employees:</strong> {employee_count || 'N/A'}</div>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                        onClick={handleViewDetails}
                        className="flex-1 text-center rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-slate-600"
                    >
                        View Details
                    </button>
                    <button
                        onClick={handlePostJob}
                        className="flex-1 text-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:bg-primary/90"
                    >
                        Post New Job
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main "My Companies" Page component with Modal Logic
const MyCompaniesPage = () => {
    const { currentUser } = useAuth();
    const userEmail = currentUser?.email;
    const navigate = useNavigate(); // For potential redirects after job post

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for managing the Post Job Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompanyIdForJob, setSelectedCompanyIdForJob] = useState(null);

    // Fetch user's companies
    useEffect(() => {
        if (!userEmail) {
            setError("Log in to view companies."); setLoading(false); return;
        }
        const fetchMyCompanies = async () => {
            setLoading(true); setError(null);
            try {
                const encodedEmail = encodeURIComponent(userEmail);
                const response = await fetch(`http://localhost:8000/companies/get/companies/user/${encodedEmail}`);
                if (!response.ok) {
                    if (response.status === 404) { setCompanies([]); }
                    else { throw new Error(`Fetch failed: ${response.status}`); }
                } else {
                    const data = await response.json();
                    setCompanies(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error("Error fetching user's companies:", err);
                setError(err.message || "Could not load companies.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyCompanies();
    }, [userEmail]);

    // --- Modal Handling Functions ---
    const handleOpenPostJobModal = (companyId) => {
        setSelectedCompanyIdForJob(companyId);
        setIsModalOpen(true);
    };

    const handleClosePostJobModal = () => {
        setIsModalOpen(false);
        setSelectedCompanyIdForJob(null);
    };

    // --- Job Submission Handler ---
    const handlePostJobSubmit = async (jobData) => {
        console.log("Submitting job:", jobData); // Debugging
        try {
            const payload = { ...jobData, company_id: selectedCompanyIdForJob };
            const response = await fetch('http://localhost:8000/company-jobs/post/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const newJob = await response.json();
                alert(`Job "${newJob.title}" posted!`);
                handleClosePostJobModal();
            } else {
                const errorData = await response.json().catch(() => ({ detail: `Status ${response.status}` }));
                throw new Error(errorData.detail || "Failed to post job.");
            }
        } catch (err) {
            console.error("Job post error:", err);
            alert(`Error: ${err.message}`);
        }
        // Note: Removed finally setLoading(false) as modal handles its own submission state
    };


    // --- Render Logic ---
    if (loading) {
        return (
            <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold animate-pulse">Loading Your Companies...</h2>
            </main>
        );
    }
    if (error) {
        return (
            <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-red-500">Error</h2>
                <p className="text-slate-400 mt-2 max-w-md">{error}</p>
                <div className="mt-6">
                    <a href="/explore" className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white">Go to Explore</a>
                </div>
            </main>
        );
    }

    return (
        <main className="py-16 sm:py-24 bg-black border-y border-slate-800 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">My Companies</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Manage profiles and post jobs.</p>
                </div>

                {/* Company Grid or Message */}
                {companies.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {companies.map(company => (
                            <CompanyCard
                                key={company.company_id}
                                {...company}
                                onPostJobClick={handleOpenPostJobModal} // Pass the handler
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-16 border border-dashed border-slate-700 rounded-2xl bg-slate-900/30">
                        <h3 className="text-2xl font-semibold text-white">No Companies Found</h3>
                        <p className="mt-2">You haven't created any company profiles yet.</p>
                        <Link
                            to="/create-company" // Link to your create company page route
                            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105"
                        >
                            Create Your First Company
                        </Link>
                    </div>
                )}
            </div>

            {/* Render the Modal Conditionally */}
            {isModalOpen && selectedCompanyIdForJob && (
                <PostJobModal
                    isOpen={isModalOpen}
                    onClose={handleClosePostJobModal}
                    onSubmit={handlePostJobSubmit}
                    companyId={selectedCompanyIdForJob} // Pass companyId to modal
                />
            )}
        </main>
    );
};

export default MyCompaniesPage;

