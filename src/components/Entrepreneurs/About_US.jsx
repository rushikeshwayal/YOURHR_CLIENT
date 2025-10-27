import React from 'react';

// You might want a common Navbar and Footer component imported here eventually
// import Navbar from './Navbar'; 
// import Footer from './Footer';

const AboutUsPage = () => {
    return (
        <main className="bg-black text-white min-h-screen">
            {/* <Navbar /> */} {/* Add your Navbar component here */}

            {/* --- Hero Section --- */}
            <section className="py-24 sm:py-32 bg-gradient-to-br from-[#0a052e] via-[#0a052e] to-[#120b4a] text-center">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                        About InnovateHub
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        Connecting entrepreneurs, fostering innovation, and building the future, together.
                    </p>
                </div>
            </section>

            {/* --- Content Section --- */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* Our Mission */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-primary/30 pb-2">
                            Our Mission
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            Our mission is to empower entrepreneurs by creating a vibrant ecosystem where they can connect, share knowledge, find opportunities, and collaborate effectively. We believe that collective growth is the key to unlocking groundbreaking innovation and sustainable success in the startup world.
                        </p>
                    </div>

                    {/* Our Vision */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-primary/30 pb-2">
                            Our Vision
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            We envision InnovateHub as the premier digital destination for entrepreneurs globally – a dynamic community that fuels the next generation of industry leaders and impactful ventures. We strive to be the catalyst for countless success stories, partnerships, and technological advancements.
                        </p>
                    </div>

                    {/* The Team (Placeholder) */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-primary/30 pb-2">
                            Meet the Team (Placeholder)
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            InnovateHub is built by a passionate team of developers, designers, and startup enthusiasts dedicated to supporting the entrepreneurial journey.
                        </p>
                        {/* Placeholder for team members */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                            <div className="p-4 bg-slate-800/50 rounded-lg">
                                <img src="https://placehold.co/100x100/334155/e2e8f0?text=Team1" alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-slate-600" />
                                <h3 className="font-semibold text-white">Alex Chen</h3>
                                <p className="text-sm text-slate-400">Founder & CEO</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg">
                                <img src="https://placehold.co/100x100/334155/e2e8f0?text=Team2" alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-slate-600" />
                                <h3 className="font-semibold text-white">Maria Garcia</h3>
                                <p className="text-sm text-slate-400">Head of Product</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg">
                                <img src="https://placehold.co/100x100/334155/e2e8f0?text=Team3" alt="Team Member 3" className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-slate-600" />
                                <h3 className="font-semibold text-white">Sam Lee</h3>
                                <p className="text-sm text-slate-400">Lead Engineer</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* <Footer /> */} {/* Add your Footer component here */}
        </main>
    );
};

export default AboutUsPage;
