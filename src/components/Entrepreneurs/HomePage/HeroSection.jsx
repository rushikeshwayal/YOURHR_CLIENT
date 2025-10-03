import React from 'react';

const HeroSection = () => (
    <section className="relative bg-background-dark py-20 sm:py-24 lg:py-32">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a052e] via-[#0a052e] to-[#120b4a]"></div>
        {/* Grid Pattern Overlay */}
        <div
            className="absolute inset-0 z-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '2rem 2rem' }}
        ></div>

        <div className="relative mx-auto max-w-4xl text-center px-4">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Empowering Entrepreneurs <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">to Grow Together</span>
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-slate-400">
                InnovateHub is a vibrant community where entrepreneurs connect, share insights, and collaborate to achieve their business goals. Join us to accelerate your growth and build lasting relationships.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:bg-primary/90">
                    Create Your Company
                </button>
                <button className="rounded-lg bg-slate-800/70 px-6 py-3 text-base font-semibold text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700">
                    Explore Companies
                </button>
            </div>
        </div>
    </section>
);

export default HeroSection;
