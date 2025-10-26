import React from 'react';

const TestimonialCard = ({ quote, name, title, avatar }) => (
    <figure className="flex flex-col h-full rounded-xl border border-slate-800 bg-slate-800/20 p-6 shadow-lg">
        {/* Made blockquote flex-grow to push figcaption to the bottom */}
        <blockquote className="flex-grow text-slate-300">
            <p>“{quote}”</p>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-4 flex-shrink-0">
            <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
            <div>
                <div className="font-semibold text-white">{name}</div>
                <div className="mt-0.5 text-sm text-slate-400">{title}</div>
            </div>
        </figcaption>
    </figure>
);

const TestimonialsSection = () => {
    // ADDED: More realistic and varied testimonials (6 total)
    const testimonials = [
        {
            quote: "Joining TalentVerse was a game-changer. The mentorship I received helped me navigate my first product launch and avoid common pitfalls. The community is incredibly supportive.",
            name: "Alex Johnson",
            title: "Founder, QuantumLeap AI",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            quote: "The Job Board is fantastic. We hired two senior developers who were a perfect fit for our company culture. It's my go-to resource for tech talent.",
            name: "Emily Rodriguez",
            title: "COO, FinTech Solutions",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            quote: "I was struggling with my go-to-market strategy. The resources and expert sessions on TalentVerse gave me the clarity I needed. We've seen a 3x growth in user acquisition since.",
            name: "Michael Chen",
            title: "CEO & Co-Founder, Aura Health",
            avatar: "https://randomuser.me/api/portraits/men/76.jpg"
        },
        {
            quote: "As a non-technical founder, I felt overwhelmed. This community connected me with a technical co-founder and investors who believed in our vision. We just closed our pre-seed round.",
            name: "Samantha Kaye",
            title: "Founder, AgriGrow Tech",
            avatar: "https://randomuser.me/api/portraits/women/39.jpg"
        },
        {
            quote: "The collaboration features are top-notch. I've partnered with two other founders from the network on joint ventures that have been mutually beneficial. It's the power of a connected ecosystem.",
            name: "David Kim",
            title: "CEO, Nexus Robotics",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        {
            quote: "An unparalleled community for founders. The resources and support are second to none. It's refreshing to be around so many driven and innovative individuals.",
            name: "Priya Sharma",
            title: "Founder, EcoStyle",
            avatar: "https://randomuser.me/api/portraits/women/17.jpg"
        },
    ];

    return (
        <section className="py-16 sm:py-24 bg-black border-y border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Loved by Founders Worldwide</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Don't just take our word for it. Hear what our community has to say.</p>
                </div>
                {/* CHANGED: Updated grid columns for better responsiveness */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;