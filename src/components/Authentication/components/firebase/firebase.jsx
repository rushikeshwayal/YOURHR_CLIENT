import  { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Lodder from '../Lodding/LodderFile'

const firebaseConfig = {
  apiKey: "AIzaSyCuNrc7LBAh7Ok_y5LArNr8w73aN7h1p6s",
  authDomain: "rushi-50d80.firebaseapp.com",
  projectId: "rushi-50d80",
  storageBucket: "rushi-50d80.appspot.com",
  messagingSenderId: "663335436804",
  appId: "1:663335436804:web:8c69e338470b439df6ab51",
  measurementId: "G-JH7EJS3BR4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center w-full min-h-screen size-5"><Lodder /></div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export default app;
