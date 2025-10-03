import React from 'react';
import NavBar from './Navbar/NavBar';
import Footer from './HomePage/Footer';
import HomePage from './HomePage/Home'; // Corrected import path

function Main() {
    return (
        // The dark class enables Tailwind's dark mode styling
        <div className="min-h-screen flex flex-col bg-background-dark font-display text-slate-200 ">
            <NavBar />
            <HomePage />
            <Footer />
        </div>
    );
}
export default Main;
