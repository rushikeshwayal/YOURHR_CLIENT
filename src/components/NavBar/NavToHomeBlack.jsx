import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DropDownBlack from '../Dropdown/DDBlack';
import UserPng from '../../assets/User.png';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for the mobile menu

function NavBarBlack() {
    // State for mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper for NavLink styling - adapted for a light background
    const getNavLinkClass = ({ isActive }) =>
        `py-2 transition-colors duration-300 ${isActive
            ? 'text-blue-600 border-b-2 border-blue-600' // Active link style
            : 'text-slate-700 hover:text-blue-500' // Inactive link style
        }`;

    // Links data for easier mapping
    const navLinks = [
        { href: "/home", text: "Home" },
        { href: "/apply", text: "Find Job" },
        { href: "/post/job", text: "Post Job" },
        { href: "/resume", text: "Resume" },
        { href: "/careerpath", text: "Career Path" },
        { href: "/entrepreneurs", text: "Join With Entrepreneur" },
    ];

    return (
        <header className="top-0 left-0 w-full z-50 bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Brand Logo */}
                <a href="/home" className="font-bold text-2xl text-slate-800">
                    TalentVerse
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-6 text-base font-medium">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} to={link.href} className={getNavLinkClass}>
                            {link.text}
                        </NavLink>
                    ))}
                    <DropDownBlack />
                    <NavLink to="/profile" className="group ml-4">
                        <img
                            className="h-10 w-10  "
                            src={UserPng}
                            alt="User Profile"
                        />
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none">
                        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu (slides down from the top) */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isMenuOpen ? 'max-h-screen border-t' : 'max-h-0'}`}>
                <div className="px-6 pb-6 flex flex-col items-center space-y-5 text-lg">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} to={link.href} className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                            {link.text}
                        </NavLink>
                    ))}
                    <DropDownBlack />
                    <NavLink to="/profile" className="mt-4" onClick={() => setIsMenuOpen(false)}>
                        <img
                            className="h-12 w-12 rounded-full ring-2 ring-blue-500"
                            src={UserPng}
                            alt="User Profile"
                        />
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default NavBarBlack;