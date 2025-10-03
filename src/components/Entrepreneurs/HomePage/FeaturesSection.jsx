import React from 'react';
import { FiZap, FiUsers, FiBriefcase } from 'react-icons/fi';

const FeatureCard = ({ icon, title, description }) => (
    <div className="relative rounded-xl bg-slate-800/50 p-6 border border-slate-800">
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3">
            <div className="w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl"></div>
        </div>
        <div className="relative">
            <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-slate-400 text-sm">{description}</p>
        </div>
    </div>
);

const FeaturesSection = () => {
    const features = [
        { icon: <FiZap size={24} />, title: 'Accelerate Growth', description: 'Connect with mentors and investors to scale your startup faster than ever before.' },
        { icon: <FiUsers size={24} />, title: 'Build Your Network', description: 'Join a vibrant community of founders, developers, and industry experts.' },
        { icon: <FiBriefcase size={24} />, title: 'Find Top Talent', description: 'Post jobs and discover skilled professionals who are passionate about innovation.' },
    ];

    return (
        <section className="py-16 sm:py-24 bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
