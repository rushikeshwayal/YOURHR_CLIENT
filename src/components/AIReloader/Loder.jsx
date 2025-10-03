import React, { useState, useEffect } from 'react';

const AILoader = () => {
    const [message, setMessage] = useState("Initializing analysis...");
    const [isFading, setIsFading] = useState(false);

    const messages = [
        "Analyzing your skills and experience...",
        "Searching for the latest industry trends...",
        "Consulting career databases...",
        "Tailoring your personalized learning path...",
        "Building your step-by-step roadmap...",
        "Finalizing the details..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true); // Start fading out

            setTimeout(() => {
                // Change the message after the fade-out completes
                setMessage(prevMessage => {
                    const currentIndex = messages.indexOf(prevMessage);
                    const nextIndex = (currentIndex + 1) % messages.length;
                    return messages[nextIndex];
                });
                setIsFading(false); // Start fading back in
            }, 500); // This duration should match the CSS transition duration

        }, 2500); // Time each message is displayed + transition time

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center gap-x-4 p-4 rounded-2xl">
            {/* Pulsing Core Animation */}
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>

            {/* Loading Text with Smooth Fade Transition */}
            {/* FIX: Added a fixed width (w-96) to prevent the layout from shifting as the text changes. */}
            <div className="text-left w-96">
                <p
                    className={`text-lg font-semibold text-gray-700 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                >
                    {message}
                </p>
            </div>
        </div>
    );
};

export default AILoader;

