import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../Authentication/components/firebase/firebase"; // Adjust path as needed
import CareerPathTimeline from './CareerPathTimeline';
import NavBarBlack from '../NavBar/NavToHomeBlack';

// --- Reusable Helper Components ---

const Loader = () => (
    <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const NoRoadmapsFound = () => (
    <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-xl font-semibold text-gray-900">No Saved Roadmaps</h3>
        <p className="mt-1 text-gray-500">You haven't saved any career paths yet. Go generate one!</p>
    </div>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this roadmap? This action cannot be undone.</p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-400 flex items-center"
                    >
                        {isDeleting && <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Accordion Item for a single Roadmap ---

const AccordionItem = ({ roadmap, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Safely format the date
    const formattedDate = new Date(roadmap.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden">
            {/* Accordion Header */}
            <div className="flex items-center p-4 cursor-pointer transition-colors hover:bg-slate-50" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-900">{roadmap.job_title || 'Saved Roadmap'}</h3>
                    <p className="text-sm text-gray-500">
                        Saved on {formattedDate}
                        {roadmap.company_name && roadmap.company_name !== 'N/A' && ` • For ${roadmap.company_name}`}
                    </p>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(roadmap.id); }}
                        className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                        aria-label="Delete roadmap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                    </button>
                    <svg
                        className={`w-6 h-6 text-gray-500 ml-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Accordion Body (Collapsible Content) */}
            {isOpen && (
                <div className="p-6 border-t border-gray-200">
                    <CareerPathTimeline pathData={roadmap.roadmap_data} />
                </div>
            )}
        </div>
    );
};


// --- Main SavedRoadmaps Component ---

function SavedRoadmaps() {
    const { currentUser } = useAuth();
    const [savedRoadmaps, setSavedRoadmaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // State for managing the delete confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roadmapToDelete, setRoadmapToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (currentUser?.email) {
            const fetchSavedRoadmaps = async () => {
                setIsLoading(true);
                setError('');
                try {
                    // ✨ FIXED: Corrected API URL
                    const response = await axios.get(`http://localhost:8000/career-path/career-path/user/${currentUser.email}`);
                    setSavedRoadmaps(response.data);
                } catch (err) {
                    if (err.response && err.response.status === 404) {
                        setSavedRoadmaps([]);
                    } else {
                        console.error("Error fetching saved roadmaps:", err);
                        setError("Could not load your saved roadmaps. Please try again later.");
                    }
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSavedRoadmaps();
        } else {
            setIsLoading(false);
        }
    }, [currentUser]);

    const handleDeleteClick = (roadmapId) => {
        setRoadmapToDelete(roadmapId);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!roadmapToDelete) return;

        setIsDeleting(true);
        setError('');
        try {
            // ✨ FIXED: Corrected API URL
            await axios.delete(`http://localhost:8000/career-path/career-path/${roadmapToDelete}`);
            setSavedRoadmaps(currentRoadmaps => currentRoadmaps.filter(r => r.id !== roadmapToDelete));
        } catch (err) {
            console.error("Error deleting roadmap:", err);
            setError("Failed to delete the roadmap. Please try again.");
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
            setRoadmapToDelete(null);
        }
    };

    return (
        <div className='mb-12 bg-slate-50'>
            <NavBarBlack />

            <div className="relative bg-slate-50 min-h-screen text-gray-800 font-sans p-4 sm:p-6 lg:p-8">

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                    isDeleting={isDeleting}
                />
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">Saved Roadmaps</span>
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                            Here are all the personalized career paths you've generated and saved.
                        </p>
                    </div>

                    {isLoading && <Loader />}
                    {error && (
                        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && (
                        savedRoadmaps.length > 0 ? (
                            <div className="space-y-4">
                                {savedRoadmaps.map((roadmap) => (
                                    <AccordionItem key={roadmap.id} roadmap={roadmap} onDelete={handleDeleteClick} />
                                ))}
                            </div>
                        ) : (
                            <NoRoadmapsFound />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default SavedRoadmaps;