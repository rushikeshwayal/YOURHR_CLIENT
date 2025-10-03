import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../Authentication/components/firebase/firebase";
import CareerPathTimeline from './CareerPathTimeline';
import AILoader from '../AIReloader/Loder';

// --- Helper Components ---

const LoadingSpinner = () => (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

const SaveButton = ({ newRoadmapData, userEmail, jobTitle, companyName }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const handleSaveRoadmap = async () => {
        if (!newRoadmapData || !userEmail || !jobTitle) return;

        setIsSaving(true);
        setSaveStatus('');
        try {
            const payload = {
                user_email: userEmail,
                job_title: jobTitle,
                company_name: companyName || "N/A",
                roadmap_data: newRoadmapData
            };
            // ✨ FIX: Corrected the POST URL to remove the duplicate path segment.
            await axios.post("http://localhost:8000/career-path/career-path", payload);
            setSaveStatus("success");
        } catch (error) {
            console.error("Failed to save roadmap:", error);
            setSaveStatus("error");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mt-10 text-center">
            <button
                onClick={handleSaveRoadmap}
                disabled={isSaving || saveStatus === 'success'}
                className="inline-flex items-center justify-center gap-x-2 bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isSaving ? (
                    <><LoadingSpinner /> Saving...</>
                ) : saveStatus === 'success' ? (
                    '✓ Roadmap Saved!'
                ) : (
                    'Save This Roadmap'
                )}
            </button>
            {saveStatus === 'error' && <p className="text-red-500 mt-2">Could not save roadmap. Please try again.</p>}
        </div>
    );
};


// --- Main Component ---

function CareerPathForm() {
    const { currentUser } = useAuth();
    const [userId, setUserId] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [careerPath, setCareerPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser?.email) {
            const fetchUserId = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/users/email/${currentUser.email}`);
                    if (response.data?.id) {
                        setUserId(response.data.id);
                    } else {
                        setError("Could not find a user ID for the logged-in email.");
                    }
                } catch (err) {
                    console.error("Error fetching user ID:", err);
                    setError("Failed to fetch user details. Ensure you have a profile.");
                }
            };
            fetchUserId();
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!jobTitle.trim()) {
            setError('Please enter a career path goal.');
            return;
        }
        if (!userId) {
            setError('Could not verify user ID. Please ensure your profile is complete.');
            return;
        }

        setIsLoading(true);
        setError('');
        setCareerPath(null);

        const params = new URLSearchParams({
            job_title: jobTitle,
            company_name: companyName || 'N/A',
            use_search: 'true'
        });

        try {
            // ✨ FIX: Corrected the GET URL to remove the duplicate path segment.
            const response = await axios.get(`http://localhost:8000/career-path/career-path/generate/${userId}?${params.toString()}`);
            setCareerPath(response.data);
        } catch (err) {
            console.error("Error generating career path:", err);
            setError(err.response?.data?.detail || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative bg-slate-50 min-h-screen text-gray-800 font-sans">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>

            <main className="relative flex-grow">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">Career Path</span>
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                            Enter your desired role and let our AI build a step-by-step roadmap to guide your learning journey.
                        </p>
                    </div>

                    {/* Form & Results Card */}
                    <div className="bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12">
                        {/* Form Section */}
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Tell Us Your Goal
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div>
                                    <label htmlFor="career-path" className="block text-sm font-medium text-gray-700 mb-2">Career Path</label>
                                    <input
                                        type="text" id="career-path" value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        placeholder="e.g., Data Engineer"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200 disabled:bg-gray-100"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dream-company" className="block text-sm font-medium text-gray-700 mb-2">Dream Company (Optional)</label>
                                    <input
                                        type="text" id="dream-company" value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="e.g., Google, Amazon"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200 disabled:bg-gray-100"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button type="submit" disabled={isLoading} className="w-full md:w-auto flex items-center justify-center gap-x-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-green-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isLoading ? <LoadingSpinner /> : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428a1 1 0 00.475 0l5 1.428a1 1 0 001.17-1.409l-7-14z" /></svg>
                                    )}
                                    <span>{isLoading ? 'Build Your Path' : 'Build Your Path'}</span>
                                </button>
                            </div>
                        </form>

                        {/* ✨ MODIFICATION: Loader and Error display are now INSIDE the card */}
                        <div className="mt-8">
                            {/* {isLoading && <AILoader />} */}
                            {error && !isLoading && (
                                <div className="max-w-3xl mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Section - Appears below the card when ready */}
                    {careerPath && !isLoading && (
                        <div className="mt-16">
                            <CareerPathTimeline pathData={careerPath} />
                            <SaveButton
                                newRoadmapData={careerPath}
                                userEmail={currentUser?.email}
                                jobTitle={jobTitle}
                                companyName={companyName}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default CareerPathForm;