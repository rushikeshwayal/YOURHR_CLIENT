import React, { useState } from 'react';
import MentorCard from './MentorCard';
import MentorDetailModal from './MentorDetail';
import EmailModal from './EmailModel';
import NavTOHomeBlack from '../NavBar/NavToHomeBlack';
const mentorsData = [
    {
        id: 1,
        name: 'Ava Kim',
        role: 'Senior ML Engineer',
        domain: 'AI/ML',
        experience: 8,
        bio: 'Applied machine learning specialist focused on LLM evaluation and MLOps.',
        imageUrl: 'https://images.pexels.com/photos/4126749/pexels-photo-4126749.jpeg',
        email: 'rushikeshwayal@gmail.com',
        articles: [
            { title: 'Prompt Eval Basics', url: '#' },
            { title: 'Vector Search Recipes', url: '#' },
        ],
        papers: [
            { title: 'Efficient RAG Pipelines', url: '#' },
        ],
        projects: [
            { title: 'LLM Playground', url: '#' },
            { title: 'Eval Dashboard', url: '#' },
        ],
    },
    {
        id: 2,
        name: 'Diego Alvarez',
        role: 'Staff Frontend Engineer',
        domain: 'Web Development',
        experience: 10,
        bio: 'Design-systems advocate building fast, accessible React apps.',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'diego.alvarez@example.com',
        articles: [
            { title: 'Modern CSS Frameworks', url: '#' },
            { title: 'Web Accessibility 101', url: '#' },
        ],
        papers: [],
        projects: [
            { title: 'Component Library', url: '#' },
            { title: 'Design System Docs', url: '#' },
        ],
    },
    {
        id: 3,
        name: 'Noor Siddiqui',
        role: 'Cloud Architect',
        domain: 'Cloud',
        experience: 12,
        bio: 'Designs resilient, cost-efficient architectures on multi-cloud.',
        imageUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
        email: 'noor.siddiqui@example.com',
        articles: [
            { title: 'Serverless Patterns', url: '#' },
        ],
        papers: [],
        projects: [
            { title: 'Multi-Cloud Strategy', url: '#' },
            { title: 'IaC with Terraform', url: '#' },
        ],
    },
    {
        id: 4,
        name: 'Ravi Patel',
        role: 'Data Scientist',
        domain: 'Data',
        experience: 7,
        bio: 'Turns ambiguous data into clear product insights and models.',
        imageUrl: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'ravi.patel@example.com',
        articles: [],
        papers: [
            { title: 'Bayesian A/B Testing', url: '#' },
        ],
        projects: [
            { title: 'Churn Prediction Model', url: '#' },
            { title: 'Experimentation Platform', url: '#' },
        ],
    },
    {
        id: 5,
        name: 'Lena Kovacs',
        role: 'Security Engineer',
        domain: 'Security',
        experience: 9,
        bio: 'Threat modeling and secure SDLC coach for engineering teams.',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'lena.kovacs@example.com',
        articles: [
            { title: 'Intro to Threat Modeling', url: '#' },
        ],
        papers: [],
        projects: [
            { title: 'Static Analysis Pipeline', url: '#' },
        ],
    },
];
export default function Connect() {
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [emailMentor, setEmailMentor] = useState(null);

    const handleSelectMentor = (mentor) => {
        setSelectedMentor(mentor);
    };

    const handleCloseDetail = () => {
        setSelectedMentor(null);
    };

    const handleOpenEmailModal = (mentor) => {
        setEmailMentor(mentor);
    };

    const handleCloseEmailModal = () => {
        setEmailMentor(null);
    };

    return (
        <div>
            <NavTOHomeBlack />
            <div className="bg-white text-gray-800 min-h-screen font-sans">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <header className="mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                            Mentor Directory
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Explore mentors across AI, Web, Cloud, Data, and Security. Click a card to view details or compose an email directly.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentorsData.map(mentor => (
                            <MentorCard
                                key={mentor.id}
                                mentor={mentor}
                                onSelect={handleSelectMentor}
                                onEmail={handleOpenEmailModal}
                            />
                        ))}
                    </div>
                </main>

                {selectedMentor && (
                    <MentorDetailModal
                        mentor={selectedMentor}
                        onClose={handleCloseDetail}
                        onOpenEmail={handleOpenEmailModal}
                    />
                )}

                {emailMentor && (
                    <EmailModal
                        mentor={emailMentor}
                        onClose={handleCloseEmailModal}
                    />
                )}
            </div>
        </div>
    );
}