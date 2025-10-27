import React, { useState } from 'react';

// Reusable Input Component (similar to CreateCompanyPage)
const FormInput = ({ label, id, type = 'text', value, onChange, required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type} id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder}
            className="w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary"
        />
    </div>
);

// Reusable Textarea Component (similar to CreateCompanyPage)
const FormTextarea = ({ label, id, value, onChange, required = false, placeholder = '', rows = 3 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder} rows={rows}
            className="w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary resize-vertical"
        />
    </div>
);


const PostJobModal = ({ isOpen, onClose, onSubmit, companyId }) => {
    const [jobData, setJobData] = useState({
        // company_id is passed via props, not part of form state
        title: "",
        role: "",
        location: "",
        job_type: "Full-time", // Default value
        salary_range: "",
        experience_required: "",
        skills_required: "", // Comma-separated
        description: "",
        responsibilities: "",
        benefits: "",
        application_deadline: "", // Expecting ISO format like "YYYY-MM-DDTHH:MM:SSZ"
        status: "Active", // Default value
        apply_link: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Prepare data (e.g., ensure deadline is correct format if needed)
        const finalJobData = {
            ...jobData,
            // Ensure deadline has timezone if required by backend, e.g., append 'Z' for UTC
            application_deadline: jobData.application_deadline ? `${jobData.application_deadline}:00Z` : null, // Example: appending seconds and UTC marker if needed
            // Convert skills string to array/list if backend expects that
        };
        await onSubmit(finalJobData); // Call the parent submit handler
        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        // Modal Backdrop
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Close modal if backdrop is clicked
        >
            {/* Modal Content */}
            <div
                className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white">Post New Job Opening</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors text-2xl"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Body - Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Job Title & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="Job Title" id="title" value={jobData.title} onChange={handleChange} required placeholder="e.g., Senior Software Engineer" />
                        <FormInput label="Role" id="role" value={jobData.role} onChange={handleChange} required placeholder="e.g., Backend Developer" />
                    </div>
                    {/* Location & Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="Location" id="location" value={jobData.location} onChange={handleChange} required placeholder="e.g., Remote, Pune, India" />
                        <div>
                            <label htmlFor="job_type" className="block text-sm font-medium text-slate-300 mb-1">Job Type<span className="text-red-500">*</span></label>
                            <select id="job_type" name="job_type" value={jobData.job_type} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-white focus:ring-1 focus:ring-primary focus:border-primary">
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                    </div>
                    {/* Salary & Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="Salary Range" id="salary_range" value={jobData.salary_range} onChange={handleChange} placeholder="e.g., ₹10L - ₹15L PA" />
                        <FormInput label="Experience Required" id="experience_required" value={jobData.experience_required} onChange={handleChange} placeholder="e.g., 3-5 years" />
                    </div>
                    {/* Skills */}
                    <FormInput label="Skills Required" id="skills_required" value={jobData.skills_required} onChange={handleChange} required placeholder="Comma-separated, e.g., React, Node.js, AWS" />
                    {/* Descriptions */}
                    <FormTextarea label="Description" id="description" value={jobData.description} onChange={handleChange} required placeholder="Detailed job description..." rows={5} />
                    <FormTextarea label="Responsibilities" id="responsibilities" value={jobData.responsibilities} onChange={handleChange} placeholder="Key responsibilities..." />
                    <FormTextarea label="Benefits" id="benefits" value={jobData.benefits} onChange={handleChange} placeholder="e.g., Health insurance, remote work..." />
                    {/* Apply Link & Deadline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="External Apply Link" id="apply_link" type="url" value={jobData.apply_link} onChange={handleChange} placeholder="https://yourcompany.com/careers/apply" />
                        <FormInput label="Application Deadline" id="application_deadline" type="datetime-local" value={jobData.application_deadline} onChange={handleChange} />
                    </div>
                    {/* Status (Hidden or Select) - Assuming default 'Active' */}
                    {/* You might want a select if you need other statuses */}
                    {/* <input type="hidden" name="status" value="Active" /> */}

                    {/* Modal Footer - Actions */}
                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button" // Important: type="button" to prevent form submission
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Posting..." : "Post Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobModal;
