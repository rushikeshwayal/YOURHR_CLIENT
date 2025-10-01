import { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/components/firebase/firebase';
import { Link } from 'react-router-dom';

const ResumeManager = () => {
    const { currentUser } = useAuth();
    const [userResumes, setUserResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details
                const usersResponse = await fetch('http://localhost:8000/users');
                if (usersResponse.ok) {
                    const users = await usersResponse.json();
                    const currentUserData = users.find(user =>
                        user.email_address?.toLowerCase() === currentUser?.email?.toLowerCase()
                    );
                    setUserDetails(currentUserData);

                    // Fetch user's resumes
                    if (currentUserData) {
                        const resumesResponse = await fetch(`http://localhost:8000/resumes/user/${currentUserData.id}`);
                        if (resumesResponse.ok) {
                            const resumes = await resumesResponse.json();
                            setUserResumes(resumes);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const deleteResume = async (resumeId) => {
        if (!confirm('Are you sure you want to delete this resume?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/resumes/${resumeId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUserResumes(prev => prev.filter(resume => resume.resume_id !== resumeId));
                alert('Resume deleted successfully!');
            } else {
                alert('Error deleting resume');
            }
        } catch (error) {
            alert('Error deleting resume: ' + error.message);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
                <Link
                    to="/resume"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create New Resume
                </Link>
            </div>

            {userResumes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
                    <p className="text-gray-500 mb-4">Create your first professional resume to get started</p>
                    <Link
                        to="/resume"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create Resume
                    </Link>
                </div>
            ) : (
                (() => {
                    const latestResume = userResumes[userResumes.length - 1];
                    return (
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Latest Resume
                                        </h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${latestResume.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {latestResume.status}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Created: {formatDate(latestResume.created_at)}</p>
                                        <p>Last Updated: {formatDate(latestResume.updated_at)}</p>
                                        {latestResume.resume_data?.personal?.name && (
                                            <p>Name: {latestResume.resume_data.personal.name}</p>
                                        )}
                                        {latestResume.resume_data?.personal?.headline && (
                                            <p>Title: {latestResume.resume_data.personal.headline}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex space-x-2 ml-4">
                                    <Link
                                        to={`/resume?edit=${latestResume.resume_id}`}
                                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteResume(latestResume.resume_id)}
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()
            )}

            {/* Quick Stats */}
            {userResumes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{userResumes.length}</div>
                            <div className="text-sm text-gray-600">Total Resumes</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {userResumes.filter(r => r.status === 'published').length}
                            </div>
                            <div className="text-sm text-gray-600">Published</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">
                                {userResumes.filter(r => r.status === 'draft').length}
                            </div>
                            <div className="text-sm text-gray-600">Drafts</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeManager;
