import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditJobModal = ({ isOpen, onClose, job, onJobUpdated }) => {
    const [formData, setFormData] = useState({ ...job });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (job) {
            // Convert date to YYYY-MM-DD for input type="date"
            setFormData({
                ...job,
                application_deadline: job.application_deadline ? new Date(job.application_deadline).toISOString().split('T')[0] : ''
            });
        }
    }, [job]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await axios.put(`http://localhost:8000/jobs/${job.job_id}`, formData);
            onJobUpdated(); // Callback to refresh the job list
        } catch (err) {
            console.error("Error updating job:", err);
            setError(err.response?.data?.detail || "Failed to update job.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">Edit Job: {job.job_title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">&times;</button>
                </div>

                {/* Modal Body - Form */}
                <div className="flex-grow p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input type="text" id="job_title" name="job_title" value={formData.job_title || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input type="text" id="company_name" name="company_name" value={formData.company_name || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                            <input type="text" id="employment_type" name="employment_type" value={formData.employment_type || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="job_description" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                            <textarea id="job_description" name="job_description" value={formData.job_description || ''} onChange={handleChange} required rows="5" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="salary_range" className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                            <input type="text" id="salary_range" name="salary_range" value={formData.salary_range || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="skills_required" className="block text-sm font-medium text-gray-700 mb-1">Skills Required (comma-separated)</label>
                            <input type="text" id="skills_required" name="skills_required" value={formData.skills_required || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="experience_required" className="block text-sm font-medium text-gray-700 mb-1">Experience Required</label>
                            <input type="text" id="experience_required" name="experience_required" value={formData.experience_required || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="education_required" className="block text-sm font-medium text-gray-700 mb-1">Education Required</label>
                            <input type="text" id="education_required" name="education_required" value={formData.education_required || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                            <textarea id="benefits" name="benefits" value={formData.benefits || ''} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                            <input type="date" id="application_deadline" name="application_deadline" value={formData.application_deadline || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="job_status" className="block text-sm font-medium text-gray-700 mb-1">Job Status</label>
                            <select id="job_status" name="job_status" value={formData.job_status || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input type="email" id="contact_email" name="contact_email" value={formData.contact_email || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="application_url" className="block text-sm font-medium text-gray-700 mb-1">Application URL</label>
                            <input type="url" id="application_url" name="application_url" value={formData.application_url || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        {error && <div className="md:col-span-2 text-red-600 text-sm">{error}</div>}

                        {/* Form Submission Buttons */}
                        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">Cancel</button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-x-2"
                            >
                                {isSubmitting && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditJobModal;
