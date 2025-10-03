import React from 'react';
import LogOutBtn from "../Button/LogOutBtn"; // Assuming this path is correct

const UserProfileSection = ({ currentUser }) => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">My Profile</h2>
            <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-sm">
                <img
                    src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || currentUser.email}&background=random&color=fff&size=128`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg ring-4 ring-blue-200"
                />
                <h1 className="text-2xl font-semibold mb-2 text-gray-900">
                    {currentUser.displayName || "User Name"}
                </h1>
                <p className="text-gray-600 text-lg mb-2">{currentUser.email}</p>
                {currentUser.phoneNumber && (
                    <p className="text-gray-600 mb-4">Phone: {currentUser.phoneNumber}</p>
                )}
                <p className="text-sm text-gray-500 mb-6">
                    Joined On: {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <LogOutBtn />
                    <a href="/reset-password" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        Change Password
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserProfileSection;
