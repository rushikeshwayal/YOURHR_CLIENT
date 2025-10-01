
import { useAuth } from "../Authentication/components/firebase/firebase";
import LogOutBtn from "../Button/LogOutBtn";
import ResumeManager from "../Resume/ResumeManager";
function Profile() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div>
      <div className="absolute pt-5"><a className="ml-10 font-bold text-xl" href="/home">← Home</a></div>
      <div className="profile-page min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentUser ? (
            <div className="space-y-8">
              {/* User Profile Card */}
              <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-semibold mb-2">
                  {currentUser.displayName || currentUser.email}
                </h1>
                <p className="text-gray-600 mb-4">{currentUser.email}</p>
                <p className="text-gray-600 mb-6">{currentUser.phoneNumber}</p>
                <div className="flex space-x-4">
                  <LogOutBtn />
                  <a href="/reset-password" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Change Password
                  </a>
                </div>
                <p className="font-bold mt-5 text-gray-600">
                  Joined On: {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
                </p>
              </div>

              {/* Resume Manager */}
              <ResumeManager />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No user is logged in</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
