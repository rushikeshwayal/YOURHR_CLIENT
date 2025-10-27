// src/components/Profile/ProfileSidebar.jsx

import React from 'react';
import { FiUser, FiBriefcase, FiLayers } from 'react-icons/fi'; // Using Feather Icons

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
    const linkClasses = (section) =>
        `w-full flex items-center p-3 rounded-lg text-base font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 ${activeSection === section
            ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md'
            : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'
        }`;

    return (
        <aside className="w-full  bg-white rounded-2xl shadow-lg p-6 h-fit  top-24">
            <nav className="space-y-3">
                <button
                    onClick={() => setActiveSection('profile')}
                    className={linkClasses('profile')}
                >
                    <FiUser className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>My Profile</span>
                </button>
                <button
                    onClick={() => setActiveSection('uploadedJobs')}
                    className={linkClasses('uploadedJobs')}
                >
                    <FiBriefcase className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>Posted Jobs</span>
                </button>
                {/* <button
                    onClick={() => setActiveSection('myCompany')}
                    className={linkClasses('myCompany')}
                >
                    <FiLayers className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>My Company</span>
                </button> */}
            </nav>
        </aside>
    );
};

export default ProfileSidebar;