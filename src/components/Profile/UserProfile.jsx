// src/components/Profile/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from "../Authentication/components/firebase/firebase";
import NavBarBlack from "../NavBar/NavToHomeBlack";
import Footer from "../Footer/Footer";

// Import new profile components
import ProfileSidebar from './ProfileSidebar';
import UserProfileSection from './UserProfileSection';
import UploadedJobsSection from './UploadedJobsSection';
import MyCompanySection from './MyCompanySection'; // Placeholder for future
import ResumeManager from '../Resume/ResumeManager'; // Assuming you want this in the 'My Profile' section

export default function Profile() {
  const { currentUser } = useAuth();
  // Default to 'profile' view
  const [activeSection, setActiveSection] = useState('profile');

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 text-center">
        <p className="text-xl text-slate-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <NavBarBlack />
      {/* Main content container with consistent padding and top margin */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/4 lg:w-1/5 flex-shrink-0 mb-8 md:mb-0">
            <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow md:w-3/4 lg:w-4/5">
            {/* The content will be rendered inside a single container for consistent styling */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {activeSection === 'profile' && (
                <>
                  <UserProfileSection currentUser={currentUser} />
                  {/* Nesting ResumeManager inside the profile section for better flow */}
                  {/* <div className="p-4 md:p-8 border-t border-slate-200">
                    <ResumeManager />
                  </div> */}
                </>
              )}
              {activeSection === 'uploadedJobs' && <UploadedJobsSection currentUser={currentUser} />}
              {activeSection === 'myCompany' && <MyCompanySection />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}