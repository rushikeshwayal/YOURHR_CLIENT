import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import NavBar from "../NavBar/NavToHome";

function CareerPathHero() {
    return (
        <div className="bg-gray-900 text-white">
            <header className="absolute top-0 left-0 w-full z-50 ">
                <NavBar />
            </header>

            <main>
                <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center filter brightness-50"
                        style={{
                            backgroundImage:
                                'url("https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg")',
                        }}
                    ></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                            Your Personalized <span className="text-green-400">Career Path</span> Analyzer
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-sm">
                            Chart your course to success with a tailored learning journey.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
                            <button className="w-full sm:w-auto px-8 py-3 bg-white text-green-600 font-bold rounded-lg shadow-lg hover:bg-green-50 hover:scale-105 transition-all duration-300">
                                Build Your Path
                            </button>

                            {/* UPDATED: This button is now a Link to the saved roadmaps page */}
                            <Link
                                to="/career-path/saved"
                                className="w-full sm:w-auto px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                            >
                                View Saved Roadmaps
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default CareerPathHero;
