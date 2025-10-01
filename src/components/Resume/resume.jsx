import { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/components/firebase/firebase';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

const Resume = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [resumeData, setResumeData] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            if (!currentUser?.email) return setLoading(false);
            try {
                // Fetch user details to get user_id
                const usersRes = await fetch('http://localhost:8000/users');
                if (!usersRes.ok) return setLoading(false);
                const users = await usersRes.json();
                const user = users.find(
                    (u) =>
                        u.email_address?.toLowerCase() ===
                        currentUser.email.toLowerCase()
                );
                if (!user) return setLoading(false);

                // Fetch resumes for user
                const resumesRes = await fetch(
                    `http://localhost:8000/resumes/user/${user.id}`
                );
                if (!resumesRes.ok) return setLoading(false);
                const resumes = await resumesRes.json();
                if (resumes.length > 0) {
                    // Show the latest resume
                    const latestResume = resumes[resumes.length - 1];
                    setResumeData(latestResume.resume_data);
                }
            } catch {
                // ignore errors
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, [currentUser]);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );

    // If resume exists and not in edit mode, show preview
    if (resumeData && !editMode) {
        return (
            <div className="relative min-h-screen">
                <ResumePreview resumeData={resumeData} />
                {/* Fixed bottom center button */}
                <div className="absolute bottom-[410px] p-16 left-1/2 transform -translate-x-1/2">
                    <button
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Resume
                    </button>
                </div>
            </div>
        );
    }

    // If editing or no resume, show form (pre-fill if editing)
    return (
        <ResumeForm
            onPreview={(data) => {
                setResumeData(data);
                setEditMode(false);
            }}
            initialData={resumeData}
        />
    );
};

export default Resume;
