import React, { useState } from 'react';
// CORRECTED: Adjusted import path for useAuth again. 
// Try navigating up one more directory level. Adjust if needed.
import { useAuth } from "../../Authentication/components/firebase/firebase";
import { useNavigate } from 'react-router-dom'; // To redirect after success

/**
 * A reusable input field component for the form.
 */
const FormInput = ({ label, id, type = 'text', value, onChange, required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary"
        />
    </div>
);

/**
 * A reusable textarea field component for the form.
 */
const FormTextarea = ({ label, id, value, onChange, required = false, placeholder = '', rows = 4 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
        />
    </div>
);


/* ---------- Create Company Page Component ---------- */
const CreateCompanyPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const userEmail = currentUser?.email || "";

    const [formData, setFormData] = useState({
        name: "",
        company_type: "",
        ceo_name: "",
        ceo_image_url: "",
        description: "",
        industry: "",
        mission: "",
        vision: "",
        goals: "",
        website: "",
        phone_number: "",
        address: "",
        city: "",
        state: "",
        country: "",
        founded_year: "", // Keep as string for input, convert on submit
        employee_count: "", // Keep as string for input, convert on submit
        linkedin_url: "",
        logo_url: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!userEmail) {
            setError("User email not found. Please log in again.");
            setLoading(false);
            return;
        }

        // Construct the payload matching the API structure
        const payload = {
            user_email: userEmail,
            name: formData.name,
            company_type: formData.company_type,
            ceo_name: formData.ceo_name,
            // Provide default valid URL if empty, or ensure API handles empty strings gracefully
            ceo_image_url: formData.ceo_image_url || "https://example.com/default_ceo.png",
            description: formData.description,
            industry: formData.industry,
            mission: formData.mission,
            vision: formData.vision,
            goals: formData.goals,
            website: formData.website || "https://example.com/", // Default valid URL
            phone_number: formData.phone_number,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            founded_year: parseInt(formData.founded_year) || 0, // Convert to number, default 0
            employee_count: parseInt(formData.employee_count) || 0, // Convert to number, default 0
            linkedin_url: formData.linkedin_url || "https://linkedin.com/", // Default valid URL
            logo_url: formData.logo_url || "https://example.com/default_logo.png" // Default valid URL
        };

        console.log("Submitting Payload:", payload); // For debugging

        try {
            const response = await fetch("http://localhost:8000/companies/post/companies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json(); // Assuming API returns the created company details
                setSuccess(`Company "${result.name}" created successfully!`);
                // Optionally reset form
                // setFormData({ /* initial empty state */ });
                // Redirect after a short delay
                setTimeout(() => {
                    // Redirect to explore or the new company page if ID is returned
                    // If result contains company_id: navigate(`/company/${result.company_id}`);
                    navigate('/explore');
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => ({ detail: `Request failed with status ${response.status}` }));
                throw new Error(errorData.detail || "Failed to create company.");
            }
        } catch (err) {
            console.error("Submit error:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-black text-white min-h-screen py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                        Create Your Company Profile
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Share your venture with the community. Fill in the details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Company Name" id="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Innovate Solutions Inc." />
                        <FormInput label="Company Type" id="company_type" value={formData.company_type} onChange={handleChange} required placeholder="e.g., SaaS, E-commerce" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="CEO Name" id="ceo_name" value={formData.ceo_name} onChange={handleChange} required placeholder="e.g., Jane Doe" />
                        <FormInput label="Industry" id="industry" value={formData.industry} onChange={handleChange} required placeholder="e.g., Technology, Finance" />
                    </div>

                    {/* Descriptions */}
                    <FormTextarea label="Description" id="description" value={formData.description} onChange={handleChange} required placeholder="Briefly describe what your company does." />
                    <FormTextarea label="Mission" id="mission" value={formData.mission} onChange={handleChange} placeholder="What is your company's core purpose?" />
                    <FormTextarea label="Vision" id="vision" value={formData.vision} onChange={handleChange} placeholder="What is the long-term future you aim to create?" />
                    <FormTextarea label="Goals" id="goals" value={formData.goals} onChange={handleChange} placeholder="List key objectives or goals (use new lines)." />

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Website URL" id="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" />
                        <FormInput label="LinkedIn URL" id="linkedin_url" type="url" value={formData.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/company/yourcompany" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Logo URL" id="logo_url" type="url" value={formData.logo_url} onChange={handleChange} placeholder="https://.../logo.png" />
                        <FormInput label="CEO Image URL" id="ceo_image_url" type="url" value={formData.ceo_image_url} onChange={handleChange} placeholder="https://.../ceo.jpg" />
                    </div>

                    {/* Contact & Location */}
                    <FormInput label="Phone Number" id="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} placeholder="+1-XXX-XXX-XXXX" />
                    <FormInput label="Address" id="address" value={formData.address} onChange={handleChange} placeholder="123 Startup St" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput label="City" id="city" value={formData.city} onChange={handleChange} />
                        <FormInput label="State/Province" id="state" value={formData.state} onChange={handleChange} />
                        <FormInput label="Country" id="country" value={formData.country} onChange={handleChange} />
                    </div>

                    {/* Company Size & Age */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Founded Year" id="founded_year" type="number" value={formData.founded_year} onChange={handleChange} placeholder="e.g., 2020" />
                        <FormInput label="Number of Employees" id="employee_count" type="number" value={formData.employee_count} onChange={handleChange} placeholder="e.g., 50" />
                    </div>

                    {/* Submission Feedback */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Company..." : "Create Company Profile"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CreateCompanyPage;

