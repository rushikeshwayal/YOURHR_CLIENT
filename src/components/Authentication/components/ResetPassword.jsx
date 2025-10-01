import { sendPasswordResetEmail } from "firebase/auth";
import  { useState } from "react";
import { auth } from './firebase/firebase';
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email to reset your password.");
        navigate('/login'); // Navigate to login page after reset email is sent
      })
      .catch((error) => {
        alert("Something went wrong");
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(errorCode, errorMsg);
      });
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <h1 className="text-2xl">Forgot Password</h1>
      <form className="flex flex-col gap-5" onSubmit={handleReset}>
        <input
          className="px-5 py-3 border-2 w-80 border-black rounded-lg"
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-center text-white text-bold text-lg px-5 py-2 w-80"
        >
          Reset Password
        </button>
        <div className="flex gap-20 items-center justify-center">
        <a href="/" className="text-blue-500">
         Login
      </a>
      <a href="/register" className="text-blue-500">
        Register
      </a>
      </div>
      </form>
    </div>
  );
}

export default ResetPassword;
