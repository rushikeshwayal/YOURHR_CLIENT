import React, { useEffect, useState } from 'react';

const ShowcaseCard = ({ logo, title, tagline, description, website }) => (
    <div className="group relative rounded-xl border border-slate-800 bg-slate-800/20 p-6 shadow-lg transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800/50">
        {/* Glow effect on hover */}
        <div
            className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'radial-gradient(400px at center, rgba(79, 70, 229, 0.15), transparent 80%)' }}
        ></div>

        <div className="relative flex flex-col h-full">
            {/* Image container with fixed aspect ratio */}
            <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg border border-slate-700">
                <img
                    src={logo}
                    alt={`${title} logo`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm font-medium text-emerald-400">{tagline}</p>
                {/* CHANGED: Added min-h-[2.5rem] (same as h-10) and line-clamp-2.
                  This ensures all cards have the same description height, aligning the buttons.
                */}
                <p className="mt-3 text-sm text-slate-400 min-h-[2.5rem] line-clamp-2">{description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <a className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition" href={website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-indigo-500 focus-visible:outline-indigo-400">
                    Connect
                    _         </button>
            </div>
        </div>
    </div>
);

const ShowcaseSection = () => {
    // ... (rest of the component is unchanged) ...
    // (No changes to the rest of the file)
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:8000/companies/get/companies');
                const data = await response.json();
                // Take only first 3 companies
                const firstThree = data.slice(0, 3).map(company => ({
                    logo: company.logo_url || company.ceo_image_url || '',
                    title: company.name,
                    tagline: company.mission || company.industry || 'Leading in innovation',
                    description: company.description || 'No description available',
                    website: company.website || '#'
                }));
                setCompanies(firstThree);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <section className="py-16 sm:py-24 bg-black text-white text-center">
                Loading companies...
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-24 bg-black border-y border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Entrepreneur Showcase
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        Meet the brilliant minds building the future.
                    </p>
                </div>
                _ <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {companies.map(item => <ShowcaseCard key={item.title} {...item} />)}
                </div>
                _ </div>
        </section>
    );
};

export default ShowcaseSection;