import { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/components/firebase/firebase';
import { Link } from 'react-router-dom';

// --- Helper Components (Scoped within this file for simplicity) ---

const StatCard = ({ label, value, icon, color }) => (
    <div className={`bg-${color}-50 p-6 rounded-lg shadow-sm border border-${color}-200`}>
        <div className="flex items-center">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-${color}-100 mr-4`}>
                {icon}
            </div>
            <div>
                <div className={`text-3xl font-bold text-${color}-600`}>{value}</div>
                <div className="text-sm font-medium text-gray-600">{label}</div>
            </div>
        </div>
    </div>
);

const EmptyState = () => (
    <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-900 mt-4 mb-2">No resumes found</h3>
        <p className="text-gray-500 mb-4">Click the button above to create your first professional resume.</p>
    </div>
);

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this resume? This action cannot be undone.</p>
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


// --- Main Component ---

const ResumeManager = () => {
    const { currentUser } = useAuth();
    const [userResumes, setUserResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }
            try {
                const usersResponse = await fetch('http://localhost:8000/users');
                if (!usersResponse.ok) throw new Error("Failed to fetch user list.");
                const users = await usersResponse.json();
                const currentUserData = users.find(user => user.email_address?.toLowerCase() === currentUser.email?.toLowerCase());

                if (currentUserData) {
                    const resumesResponse = await fetch(`http://localhost:8000/resumes/user/${currentUserData.id}`);
                    if (resumesResponse.ok) {
                        const resumes = await resumesResponse.json();
                        setUserResumes(resumes);
                    } else {
                        // Handle 404 for users with no resumes gracefully
                        setUserResumes([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setUserResumes([]); // Ensure it's an array on error
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentUser]);

    const openDeleteModal = (resumeId) => {
        setResumeToDelete(resumeId);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!resumeToDelete) return;
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8000/resumes/${resumeToDelete}`, { method: 'DELETE' });
            if (response.ok) {
                setUserResumes(prev => prev.filter(resume => resume.resume_id !== resumeToDelete));
            } else {
                throw new Error("Failed to delete resume.");
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
            alert('Error deleting resume: ' + error.message);
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
            setResumeToDelete(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-gray-700">Loading resumes...</p>
            </div>
        );
    }

    const publishedCount = userResumes.filter(r => r.status === 'published').length;
    const draftCount = userResumes.filter(r => r.status === 'draft').length;

    return (
        <div className="p-4 md:p-8">
            <DeleteConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} isDeleting={isDeleting} />

            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">My Resumes</h2>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
                <StatCard label="Total Resumes" value={userResumes.length} color="blue" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
                <StatCard label="Published" value={publishedCount} color="green" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard label="Drafts" value={draftCount} color="yellow" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>} />
            </div>

            <div className="flex justify-between items-center mb-4">
                <Link
                    to="/resume"
                    className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Create New Resume
                </Link>
            </div>

            {userResumes.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {userResumes.map((resume) => (
                                <tr key={resume.resume_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{resume.resume_data?.personal?.name || 'Untitled Resume'}</div>
                                        <div className="text-sm text-gray-500">{resume.resume_data?.personal?.headline}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${resume.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {resume.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(resume.updated_at)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            <Link to={`/resume?edit=${resume.resume_id}`} className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full" title="Edit Resume">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" /></svg>
                                            </Link>
                                            <button onClick={() => openDeleteModal(resume.resume_id)} className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full" title="Delete Resume">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ResumeManager;

