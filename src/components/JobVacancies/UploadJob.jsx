import { useState } from 'react';
import NavToHomeBlack from '../NavBar/NavToHomeBlack';
import Footer from '../Footer/Footer';
import { useAuth } from '../Authentication/components/firebase/firebase';

function UploadJob() {
    const { currentUser } = useAuth();
    const userEmail = currentUser?.email || '';

    const [value, setValue] = useState({
        job_title: '',
        company_name: '',
        location: '',
        employment_type: '',
        job_description: '',
        salary_range: '',
        skills_required: '',
        experience_required: '',
        education_required: '',
        benefits: '',
        application_url: '',
        application_deadline: '',
        job_status: 'Open', // default Open
        contact_email: userEmail,
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { id, value: inputValue } = event.target;
        setValue((prevValue) => ({
            ...prevValue,
            [id]: inputValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        const requiredFields = [
            'job_title',
            'company_name',
            'location',
            'employment_type',
            'job_description',
            'salary_range',
            'experience_required',
            'education_required',
            'skills_required',
            'application_url',
            'application_deadline',
        ];
        for (const field of requiredFields) {
            if (!value[field]) {
                setMessage(`Please fill in all required fields: ${field}`);
                return;
            }
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8000/jobs/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value), // sending exactly your format
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            setValue({
                job_title: '',
                company_name: '',
                location: '',
                employment_type: '',
                job_description: '',
                salary_range: '',
                skills_required: '',
                experience_required: '',
                education_required: '',
                benefits: '',
                application_url: '',
                application_deadline: '',
                job_status: 'Open',
                contact_email: userEmail,
            });
            setMessage('Job posted successfully!');
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'An error occurred while posting the job. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div >
            <div>
                <div >
                    <NavToHomeBlack />
                </div>

                {message && (
                    <p
                        className={`mt-4 max-w-screen-lg mx-auto text-center ${message.includes('success') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                            } border rounded-lg p-2`}
                    >
                        {message}
                    </p>
                )}

                <div className="max-w-screen-lg mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg mt-8 border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 p-4 text-gray-900">
                            <p className="mt-4 text-sm font-medium uppercase tracking-wider text-indigo-600">
                                Post a Job
                            </p>
                            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                                Upload <span className="text-indigo-600">Job</span>
                            </h3>
                            <p className="mt-4 text-lg leading-7 text-gray-600">
                                Fill in the details below to create a professional job listing.
                            </p>
                        </div>

                        <div className="md:col-span-8">
                            <form
                                className="p-6 bg-gray-50 rounded-xl shadow-inner space-y-6"
                                onSubmit={handleSubmit}
                            >
                                {/* Title & Company */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="job_title" className="block text-sm font-medium text-gray-900">
                                            Job Title
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="job_title"
                                            value={value.job_title}
                                            onChange={handleChange}
                                            placeholder="Enter Title"
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="company_name" className="block text-sm font-medium text-gray-900">
                                            Company Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="company_name"
                                            value={value.company_name}
                                            onChange={handleChange}
                                            placeholder="Enter Company Name"
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                </div>

                                {/* Location & Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-900">
                                            Job Location
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="location"
                                            value={value.location}
                                            onChange={handleChange}
                                            placeholder="Enter Location"
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="employment_type" className="block text-sm font-medium text-gray-900">
                                            Job Type
                                        </label>
                                        <select
                                            required
                                            id="employment_type"
                                            value={value.employment_type}
                                            onChange={handleChange}
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        >
                                            <option value="">Select Job Type</option>
                                            <option value="Per Hour">Per Hour</option>
                                            <option value="Per Project">Per Project</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Experience, Salary */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="experience_required" className="block text-sm font-medium text-gray-900">
                                            Experience Required (years)
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            id="experience_required"
                                            value={value.experience_required}
                                            onChange={handleChange}
                                            placeholder="Enter Experience"
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="salary_range" className="block text-sm font-medium text-gray-900">
                                            Salary
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            id="salary_range"
                                            value={value.salary_range}
                                            onChange={handleChange}
                                            placeholder="Enter Salary Range"
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                </div>

                                {/* Email & Status */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="contact_email" className="block text-sm font-medium text-gray-900">
                                            Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            id="contact_email"
                                            readOnly
                                            value={value.contact_email}
                                            className="mt-1 p-3 w-full border border-gray-300 bg-gray-100 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="job_status" className="block text-sm font-medium text-gray-900">
                                            Job Status
                                        </label>
                                        <select
                                            required
                                            id="job_status"
                                            value={value.job_status}
                                            onChange={handleChange}
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                {/* URL & Deadline */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="application_url" className="block text-sm font-medium text-gray-900">
                                            Website Link
                                        </label>
                                        <input
                                            required
                                            type="url"
                                            id="application_url"
                                            value={value.application_url}
                                            onChange={handleChange}
                                            placeholder="Enter URL"
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-900">
                                            Deadline
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            id="application_deadline"
                                            value={value.application_deadline}
                                            onChange={handleChange}
                                            className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                </div>

                                {/* Text Areas */}
                                <div>
                                    <label htmlFor="job_description" className="block text-sm font-medium text-gray-900">
                                        Job Description
                                    </label>
                                    <textarea
                                        required
                                        id="job_description"
                                        rows="5"
                                        value={value.job_description}
                                        onChange={handleChange}
                                        placeholder="Enter Description"
                                        className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="education_required" className="block text-sm font-medium text-gray-900">
                                        Education Required
                                    </label>
                                    <textarea
                                        required
                                        id="education_required"
                                        rows="3"
                                        value={value.education_required}
                                        onChange={handleChange}
                                        placeholder="Enter Education Required"
                                        className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="skills_required" className="block text-sm font-medium text-gray-900">
                                        Skills Required
                                    </label>
                                    <textarea
                                        required
                                        id="skills_required"
                                        rows="3"
                                        value={value.skills_required}
                                        onChange={handleChange}
                                        placeholder="Enter Required Skills"
                                        className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="benefits" className="block text-sm font-medium text-gray-900">
                                        Benefits
                                    </label>
                                    <textarea
                                        required
                                        id="benefits"
                                        rows="3"
                                        value={value.benefits}
                                        onChange={handleChange}
                                        placeholder="Enter Benefits"
                                        className="mt-1 p-3 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {isLoading ? 'Uploading...' : 'Upload Job'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr className="max-w-screen-lg mx-auto mt-8" />
                <Footer />
            </div>
        </div>
    );
}

export default UploadJob;
