import React from 'react';

const CtaBanner = () => (
    // CHANGED: Complete refactor for better alignment and page flow.
    // 1. Removed min-h-screen and extra divs.
    // 2. Used the same background gradient as your HeroSection for consistency.
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0a052e] via-[#0a052e] to-[#120b4a]">
        {/* 3. Added a standard container, matching the Hero's max-w-4xl for centered text. */}
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block">100+ Entrepreneurs already</span>
                {/* 4. Re-used the Hero's text gradient class for the highlighted span. */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pb-5">
                    sharing their journey.
                </span>
            </h2>
            <p className="mt-4 text-lg leading-6 max-w-2xl mx-auto text-slate-400">
                Join our thriving community to connect with like-minded individuals, gain valuable knowledge, and grow your network.
            </p>
            <a
                className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105"
                href="#"
            >
                Join the Network
            </a>
        </div>
    </section>
);

export default CtaBanner;