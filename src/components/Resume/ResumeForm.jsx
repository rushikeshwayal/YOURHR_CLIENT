import { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/components/firebase/firebase';
import NavBarBlack from '../NavBar/NavToHomeBlack';
import Footer from '../Footer/Footer';

const ResumeForm = ({ onPreview, initialData }) => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [resumeData, setResumeData] = useState(() => initialData ? initialData : {
        personal: {
            name: '',
            headline: '',
            email: '',
            phone: '',
            linkedin: '',
            location: ''
        },
        summary: '',
        work_experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [completedSections, setCompletedSections] = useState(new Set());

    // Fetch user details to get user_id and pre-fill if no initialData
    useEffect(() => {
        if (initialData) return; // Don't overwrite with user details if editing
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:8000/users');
                if (response.ok) {
                    const users = await response.json();
                    const currentUserData = users.find(user =>
                        user.email_address?.toLowerCase() === currentUser?.email?.toLowerCase()
                    );
                    setUserDetails(currentUserData);

                    // Pre-fill personal info if available
                    if (currentUserData) {
                        setResumeData(prev => ({
                            ...prev,
                            personal: {
                                name: currentUserData.full_name || '',
                                email: currentUserData.email_address || '',
                                phone: currentUserData.phone_number || '',
                                location: `${currentUserData.address_city || ''}, ${currentUserData.address_state || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
                                headline: '',
                                linkedin: ''
                            }
                        }));
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (currentUser) {
            fetchUserDetails();
        }
    }, [currentUser, initialData]);

    const handleInputChange = (section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));

        // Mark section as completed if it has meaningful data
        checkSectionCompletion(section, value);
    };

    const checkSectionCompletion = (section, value) => {
        const isCompleted = () => {
            switch (section) {
                case 'personal':
                    return resumeData.personal.name && resumeData.personal.email;
                case 'summary':
                    return resumeData.summary && resumeData.summary.trim().length > 0;
                case 'work_experience':
                    return resumeData.work_experience.length > 0 &&
                        resumeData.work_experience.some(exp => exp.company && exp.title);
                case 'education':
                    return resumeData.education.length > 0 &&
                        resumeData.education.some(edu => edu.degree && edu.institution);
                case 'skills':
                    return resumeData.skills.length > 0;
                case 'projects':
                    return resumeData.projects.length > 0 &&
                        resumeData.projects.some(proj => proj.name && proj.description);
                case 'certifications':
                    return resumeData.certifications.length > 0 &&
                        resumeData.certifications.some(cert => cert.name && cert.issuer);
                case 'languages':
                    return resumeData.languages.length > 0;
                default:
                    return false;
            }
        };

        if (isCompleted()) {
            setCompletedSections(prev => new Set([...prev, section]));
        } else {
            setCompletedSections(prev => {
                const newSet = new Set(prev);
                newSet.delete(section);
                return newSet;
            });
        }
    };

    const handleArrayChange = (section, index, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (section, newItem) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

    const removeArrayItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const handleSkillsChange = (skillsString) => {
        const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
        setResumeData(prev => ({
            ...prev,
            skills: skillsArray
        }));
    };

    const saveResume = async () => {
        if (!userDetails) {
            alert('User details not found. Please complete your profile first.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userDetails.id,
                    resume_data: resumeData,
                    status: 'draft'
                })
            });

            if (response.ok) {
                setSaved(true);
                alert('Resume saved successfully!');
            } else {
                const error = await response.json();
                alert('Error saving resume: ' + (error.detail || 'Unknown error'));
            }
        } catch (error) {
            alert('Error saving resume: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'summary', label: 'Summary' },
        { id: 'work_experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'languages', label: 'Languages' }
    ];

    return (
        <div>
            <NavBarBlack />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Create Your Resume</h1>
                            <p className="text-gray-600 mt-1">Fill in your information to create a professional resume</p>

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Progress</span>
                                    <span>{completedSections.size} of {tabs.length} sections completed</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(completedSections.size / tabs.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            {/* Sidebar */}
                            <div className="w-64 bg-gray-50 border-r border-gray-200">
                                <nav className="p-4">
                                    <ul className="space-y-2">
                                        {tabs.map(tab => (
                                            <li key={tab.id}>
                                                <button
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${activeTab === tab.id
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <span>{tab.label}</span>
                                                    {completedSections.has(tab.id) && (
                                                        <span className="text-green-600">✓</span>
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-6">
                                {/* Personal Information */}
                                {activeTab === 'personal' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={resumeData.personal.name}
                                                    onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Headline</label>
                                                <input
                                                    type="text"
                                                    value={resumeData.personal.headline}
                                                    onChange={(e) => handleInputChange('personal', 'headline', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="e.g., Software Engineer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={resumeData.personal.email}
                                                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={resumeData.personal.phone}
                                                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="+91 9876543210"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                                                <input
                                                    type="url"
                                                    value={resumeData.personal.linkedin}
                                                    onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                                <input
                                                    type="text"
                                                    value={resumeData.personal.location}
                                                    onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="City, State"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Summary */}
                                {activeTab === 'summary' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                                            <textarea
                                                value={resumeData.summary}
                                                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                                                rows={6}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Write a brief summary of your professional background, skills, and career objectives..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Work Experience */}
                                {activeTab === 'work_experience' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                                            <button
                                                onClick={() => addArrayItem('work_experience', {
                                                    company: '',
                                                    title: '',
                                                    location: '',
                                                    start_date: '',
                                                    end_date: '',
                                                    description: []
                                                })}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Add Experience
                                            </button>
                                        </div>
                                        {resumeData.work_experience.map((exp, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-lg font-medium text-gray-900">Experience #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeArrayItem('work_experience', index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                                        <input
                                                            type="text"
                                                            value={exp.company}
                                                            onChange={(e) => handleArrayChange('work_experience', index, 'company', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Company Name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                                        <input
                                                            type="text"
                                                            value={exp.title}
                                                            onChange={(e) => handleArrayChange('work_experience', index, 'title', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Job Title"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                                        <input
                                                            type="text"
                                                            value={exp.location}
                                                            onChange={(e) => handleArrayChange('work_experience', index, 'location', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="City, State"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                                        <input
                                                            type="date"
                                                            value={exp.start_date}
                                                            onChange={(e) => handleArrayChange('work_experience', index, 'start_date', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                                        <input
                                                            type="date"
                                                            value={exp.end_date}
                                                            onChange={(e) => handleArrayChange('work_experience', index, 'end_date', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (one per line)</label>
                                                    <textarea
                                                        value={exp.description.join('\n')}
                                                        onChange={(e) => handleArrayChange('work_experience', index, 'description', e.target.value.split('\n'))}
                                                        rows={4}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Describe your responsibilities and achievements..."
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Education */}
                                {activeTab === 'education' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                                            <button
                                                onClick={() => addArrayItem('education', {
                                                    degree: '',
                                                    institution: '',
                                                    location: '',
                                                    start_year: '',
                                                    end_year: '',
                                                    status: 'completed'
                                                })}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Add Education
                                            </button>
                                        </div>
                                        {resumeData.education.map((edu, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-lg font-medium text-gray-900">Education #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeArrayItem('education', index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                                                        <input
                                                            type="text"
                                                            value={edu.degree}
                                                            onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="e.g., B.Tech Computer Science"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                                                        <input
                                                            type="text"
                                                            value={edu.institution}
                                                            onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="University/College Name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                                        <input
                                                            type="text"
                                                            value={edu.location}
                                                            onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="City, State"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                                        <select
                                                            value={edu.status}
                                                            onChange={(e) => handleArrayChange('education', index, 'status', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="completed">Completed</option>
                                                            <option value="ongoing">Ongoing</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                                                        <input
                                                            type="text"
                                                            value={edu.start_year}
                                                            onChange={(e) => handleArrayChange('education', index, 'start_year', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="2015"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                                                        <input
                                                            type="text"
                                                            value={edu.end_year}
                                                            onChange={(e) => handleArrayChange('education', index, 'end_year', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="2019"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Skills */}
                                {activeTab === 'skills' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={resumeData.skills.join(', ')}
                                                onChange={(e) => handleSkillsChange(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Python, React, AWS, JavaScript, Node.js"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Separate multiple skills with commas</p>
                                        </div>
                                    </div>
                                )}

                                {/* Projects */}
                                {activeTab === 'projects' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                                            <button
                                                onClick={() => addArrayItem('projects', {
                                                    name: '',
                                                    description: '',
                                                    link: ''
                                                })}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Add Project
                                            </button>
                                        </div>
                                        {resumeData.projects.map((project, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-lg font-medium text-gray-900">Project #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeArrayItem('projects', index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                                                        <input
                                                            type="text"
                                                            value={project.name}
                                                            onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Project Name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                                        <textarea
                                                            value={project.description}
                                                            onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                                                            rows={3}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Describe your project..."
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
                                                        <input
                                                            type="url"
                                                            value={project.link}
                                                            onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="https://github.com/username/project"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Certifications */}
                                {activeTab === 'certifications' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
                                            <button
                                                onClick={() => addArrayItem('certifications', {
                                                    name: '',
                                                    issuer: '',
                                                    date: ''
                                                })}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Add Certification
                                            </button>
                                        </div>
                                        {resumeData.certifications.map((cert, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-lg font-medium text-gray-900">Certification #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeArrayItem('certifications', index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                                                        <input
                                                            type="text"
                                                            value={cert.name}
                                                            onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="AWS Certified Developer"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Issuer</label>
                                                        <input
                                                            type="text"
                                                            value={cert.issuer}
                                                            onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Amazon"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                                        <input
                                                            type="date"
                                                            value={cert.date}
                                                            onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Languages */}
                                {activeTab === 'languages' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Languages (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={resumeData.languages.join(', ')}
                                                onChange={(e) => setResumeData(prev => ({
                                                    ...prev,
                                                    languages: e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang)
                                                }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="English, Hindi, Spanish"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Separate multiple languages with commas</p>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => onPreview && onPreview(resumeData)}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Preview Resume
                                    </button>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={saveResume}
                                            disabled={loading}
                                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {loading ? 'Saving...' : saved ? 'Saved ✓' : 'Save Resume'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (saved) {
                                                    // Move to next tab or section
                                                    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                                                    if (currentIndex < tabs.length - 1) {
                                                        setActiveTab(tabs[currentIndex + 1].id);
                                                    } else {
                                                        // If on last tab, go to preview
                                                        onPreview && onPreview(resumeData);
                                                    }
                                                }
                                            }}
                                            disabled={!saved}
                                            className={`px-6 py-2 rounded-md transition-colors ${saved
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {activeTab === tabs[tabs.length - 1].id ? 'Preview Resume' : 'Next'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResumeForm;
