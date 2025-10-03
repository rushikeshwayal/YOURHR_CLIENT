import React from 'react';

const TestimonialCard = ({ quote, name, title, avatar }) => (
    <figure className="rounded-xl border border-slate-800 bg-slate-800/20 p-6 shadow-lg">
        <blockquote className="text-slate-300">
            <p>“{quote}”</p>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-4">
            <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
            <div>
                <div className="font-semibold text-white">{name}</div>
                <div className="mt-0.5 text-sm text-slate-400">{title}</div>
            </div>
        </figcaption>
    </figure>
);

const TestimonialsSection = () => {
    const testimonials = [
        { quote: "InnovateHub was instrumental in our seed round. The connections we made were invaluable.", name: "Sarah Chen", title: "CEO of TechGenius", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
        { quote: "An unparalleled community for founders. The resources and support are second to none.", name: "David Lee", title: "Founder of EcoStyle", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { quote: "We found our lead engineer through the Job Board. The quality of talent here is exceptional.", name: "Maria Garcia", title: "CTO of HealthFirst", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
    ];
    return (
        <section className="py-16 sm:py-24 bg-slate-900 border-y border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Loved by Founders Worldwide</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Don't just take our word for it. Hear what our community has to say.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
