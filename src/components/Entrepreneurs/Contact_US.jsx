import React, { useState } from 'react';

// You might want a common Navbar and Footer component imported here eventually
// import Navbar from './Navbar'; 
// import Footer from './Footer';

// Reusable Input Component (from previous examples)
const FormInput = ({ label, id, type = 'text', value, onChange, required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
        <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary" />
    </div>
);

// Reusable Textarea Component (from previous examples)
const FormTextarea = ({ label, id, value, onChange, required = false, placeholder = '', rows = 4 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
        <textarea id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder} rows={rows} className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary resize-vertical" />
    </div>
);


const ContactUsPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        console.log("Form Data Submitted (Placeholder):", formData);

        // --- Placeholder for API call ---
        // Replace this timeout with your actual API call to send the message
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Example success/error handling
        const success = Math.random() > 0.3; // Simulate success/failure
        if (success) {
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form on success
        } else {
            setSubmitStatus('error');
        }
        // --- End Placeholder ---

        setIsSubmitting(false);
    };

    return (
        <main className="bg-black text-white min-h-screen">
            {/* <Navbar /> */}

            {/* --- Hero Section --- */}
            <section className="py-24 sm:py-32 bg-gradient-to-br from-[#0a052e] via-[#0a052e] to-[#120b4a] text-center">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                        Get in Touch
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        Have questions, feedback, or partnership inquiries? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* --- Content Section --- */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* --- Left Column: Contact Form --- */}
                    <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormInput label="Your Name" id="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                                <FormInput label="Your Email" id="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                            </div>
                            <FormInput label="Subject" id="subject" value={formData.subject} onChange={handleChange} required placeholder="Regarding..." />
                            <FormTextarea label="Message" id="message" value={formData.message} onChange={handleChange} required placeholder="Your message here..." rows={5} />

                            {/* Submission Status */}
                            {submitStatus === 'success' && <p className="text-green-400 text-center">Message sent successfully!</p>}
                            {submitStatus === 'error' && <p className="text-red-400 text-center">Something went wrong. Please try again later.</p>}


                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* --- Right Column: Contact Info & Map --- */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Contact Details */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1">📍</span>
                                    <span>InnovateHub HQ<br />123 Tech Park Ave<br />Pune, Maharashtra, 411014<br />India</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1">✉️</span>
                                    <a href="mailto:contact@innovatehub.example" className="hover:text-primary">contact@innovatehub.example</a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1">📞</span>
                                    <a href="tel:+911234567890" className="hover:text-primary">+91 123 456 7890</a>
                                </li>
                            </ul>
                        </div>
                        {/* Map Placeholder */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl overflow-hidden aspect-video">
                            <div className="bg-slate-800 h-full flex items-center justify-center text-slate-500 italic">
                                Map Placeholder
                                {/* You could embed an iframe here later */}
                                {/*  */}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* <Footer /> */}
        </main>
    );
};

export default ContactUsPage;
