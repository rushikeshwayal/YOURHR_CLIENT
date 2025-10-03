import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import UserPng from '../../../assets/User.png';
const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getNavLinkClass = ({ isActive }) =>
        `py-2 transition-colors duration-300 ${isActive
            ? 'text-indigo-400'
            : 'text-slate-300 hover:text-indigo-400'
        }`;

    const navLinks = [
        { href: "/explore", text: "Explore" },
        { href: "/my-company", text: "My Company" },
        { href: "/about", text: "About Us" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/60 backdrop-blur-lg border-b border-slate-800">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Brand Logo */}
                <NavLink to="/home" className="font-bold text-2xl text-white flex items-center gap-2">
                    <svg className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path></svg>
                    TalentVerse.Grow
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8 text-base font-semibold">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} to={link.href} className={getNavLinkClass}>
                            {link.text}
                        </NavLink>
                    ))}
                </div>

                {/* Action Buttons & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    <NavLink to="/profile" className="mt-4" onClick={() => setIsMenuOpen(false)}>
                        <img
                            className="h-10 w-10"
                            src={UserPng}
                            alt="User Profile"
                        />
                    </NavLink>
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 focus:outline-none">
                            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/90 backdrop-blur-xl ${isMenuOpen ? 'max-h-screen border-t border-slate-800' : 'max-h-0'}`}>
                <div className="p-6 flex flex-col items-center space-y-6 text-lg">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} to={link.href} className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                            {link.text}
                        </NavLink>
                    ))}
                    <NavLink to="/profile" className="mt-4" onClick={() => setIsMenuOpen(false)}>
                        <img
                            className="h-12 w-12 rounded-full ring-2 ring-sky-400"
                            src={UserPng}
                            alt="User Profile"
                        />
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
