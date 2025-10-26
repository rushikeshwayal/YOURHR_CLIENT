import React, { useState, useEffect } from 'react';
// REMOVED: react-icons import
// import { FiSearch, FiBriefcase } from 'react-icons/fi'; // Using react-icons for a nice touch

// This is the new, more detailed card for the explore page
const CompanyCard = ({
    company_id, // <-- Added company_id to props
    logo_url,
    name,
    industry,
    description,
    founded_year,
    employee_count,
    website
}) => {

    // Handler for the main card click
    const handleCardClick = () => {
        // Navigates to the company's detail page
        window.location.href = `/company/${company_id}`;
    };

    // Handler for the "Visit Website" button
    const handleWebsiteClick = (e) => {
        // Stops the click from bubbling up to the card's onClick
        e.stopPropagation();
        // The <a> tag's default href behavior will handle the navigation
    };

    return (
        <div
            className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 cursor-pointer"
            onClick={handleCardClick} // <-- Added onClick to the entire card
        >

            {/* Card Header: Logo and Name */}
            <div className="flex items-start gap-4 mb-4">
                <img
                    src={logo_url || 'https://placehold.co/150x150/1e293b/94a3b8?text=Logo'}
                    alt={`${name} logo`}
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover border-2 border-slate-700"
                />
                <div>
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <span className="mt-1 inline-flex rounded-full bg-cyan-900/70 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {industry || 'Innovation'}
                    </span>
                </div>
            </div>

            {/* Card Body: Description (grows to fill space) */}
            <div className="flex-grow">
                <p className="text-sm text-slate-400 line-clamp-3">
                    {description || 'No description provided.'}
                </p>
            </div>

            {/* Card Footer: Stats and Link */}
            <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center text-sm text-slate-400 mb-4">
                    <div>
                        <strong>Founded:</strong> {founded_year || 'N/A'}
                    </div>
                    <div>
                        <strong>Employees:</strong> {employee_count || 'N/A'}
                    </div>
                </div>
                <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    // CHANGED: Improved button style to be solid and more prominent
                    className="block w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:bg-primary/90"
                    onClick={handleWebsiteClick} // <-- Added stopPropagation onClick
                >
                    Visit Website
                </a>
            </div>
        </div>
    );
};


// This is the main section component
const ExploreSection = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [industryFilter, setIndustryFilter] = useState('all');

    // --- Data Fetching ---
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:8000/companies/get/companies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []); // Empty dependency array means this runs once on mount

    // --- Filtering Logic ---
    // Create a list of unique industries for the filter dropdown
    const industries = ['all', ...new Set(companies.map(c => c.industry).filter(Boolean))];

    const filteredCompanies = companies.filter(company => {
        const searchMatch = (company.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (company.description || '').toLowerCase().includes(searchTerm.toLowerCase());

        const industryMatch = industryFilter === 'all' || company.industry === industryFilter;

        return searchMatch && industryMatch;
    });

    // --- Render Loading State ---
    if (loading) {
        return (
            // MODIFIED: Changed this section to be full-height and centered
            <section className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center">
                {/* MODIFIED: Added animate-pulse for a better loading feel */}
                <h2 className="text-3xl font-bold animate-pulse">Loading Ecosystem...</h2>
                <p className="text-slate-400 mt-2">Connecting to the network...</p>
            </section>
        );
    }

    // --- Render Main Component ---
    return (
        <section className="py-16 sm:py-24 bg-black border-y border-slate-800 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* 1. The "Hero" part of the section */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                        Explore Our Ecosystem
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        Discover the innovative startups and established companies building the future.
                    </p> {/* <-- FIXED: Changed </V> to </p> */}
                </div>

                {/* 2. The "Creative" Filter Bar */}
                <div className="mb-12 flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search by name or description..."
                            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* REPLACED: FiSearch with inline SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    {/* Industry Filter */}
                    <div className="relative w-full md:w-64">
                        <select
                            className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-900/50 py-3 pl-10 pr-8 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                            value={industryFilter}
                            onChange={(e) => setIndustryFilter(e.target.value)}
                        >
                            {industries.map(industry => (
                                <option key={industry} value={industry} className="capitalize bg-slate-900">
                                    {industry === 'all' ? 'All Industries' : industry}
                                </option>
                            ))}
                        </select>
                        {/* REPLACED: FiBriefcase with inline SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </div>
                </div>

                {/* 3. The Company Grid */}
                {filteredCompanies.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredCompanies.map(company => (
                            // The ...company spread passes all props, including company_id
                            <CompanyCard key={company.id} {...company} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-16">
                        <h3 className="text-2xl font-semibold text-white">No Companies Found</h3>
                        <p className="mt-2">Try adjusting your search or filter terms.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExploreSection;


