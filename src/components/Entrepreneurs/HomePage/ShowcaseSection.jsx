import React from 'react';

const ShowcaseCard = ({ logo, title, tagline, description, tagColor }) => (
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
                <p className={`mt-1 text-sm font-medium ${tagColor}`}>{tagline}</p>
                <p className="mt-3 text-sm text-slate-400 h-10">{description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <a className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition" href="#">Visit Website</a>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-indigo-500 focus-visible:outline-indigo-400">
                    Connect
                </button>
            </div>
        </div>
    </div>
);

const ShowcaseSection = () => {
    const showcases = [
        { logo: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg', title: 'TechGenius Solutions', tagline: 'Revolutionizing software development', description: 'Cutting-edge AI solutions to streamline your workflows.', tagColor: 'text-emerald-400' },
        { logo: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg', title: 'EcoStyle Living', tagline: 'Sustainable products for a greener lifestyle', description: 'Mindfully crafted goods for a conscious and eco-friendly home.', tagColor: 'text-emerald-400' },
        { logo: 'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg', title: 'HealthFirst Innovations', tagline: 'Transforming healthcare with innovative tech', description: 'Developing medical devices that improve patient outcomes.', tagColor: 'text-emerald-400' }
    ];

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
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {showcases.map(item => <ShowcaseCard key={item.title} {...item} />)}
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;

