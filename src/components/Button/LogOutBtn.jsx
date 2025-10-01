import { useEffect } from "react";
import { auth } from "../Authentication/components/firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "../Authentication/components/firebase/firebase";
import Btn from "./Btn";

function LogOutBtn() {

  const navigate = useNavigate();
  // const currentUser = useAuth(); // Directly use the returned value from useAuth()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("You Sign-Out Successfully")
        navigate("/");
        console.log("SignOut Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Check user auth state on mount
  useEffect(() => {
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

    // <button className=" border-[1px] border-black text-black font-bold px-5 py-2 rounded-lg bg-green-400 hover:bg-green-500 " onClick={handleLogout} >Logout</button>
    <div onClick={handleLogout}>
      <Btn title="Logout" />
    </div>
  );

}

export default LogOutBtn;