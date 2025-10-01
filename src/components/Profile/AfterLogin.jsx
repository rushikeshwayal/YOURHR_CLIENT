import { useEffect } from "react";
import { auth } from "../Authentication/components/firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../Authentication/components/firebase/firebase";
import Home from "../Home/Home";

function AfterLogin() {
  const navigate = useNavigate();
  const currentUser = useAuth(); // Directly use the returned value from useAuth()

  useEffect(() => {
    // Subscribe to auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to home if the user is not logged in
        navigate("/");
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      {currentUser ? (
        <Home />
      ) : null}
    </div>
  );
}

export default AfterLogin;
