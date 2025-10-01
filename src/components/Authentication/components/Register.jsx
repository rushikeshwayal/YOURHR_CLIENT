import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { createRegularUser } from "../../../utils/authUtils";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const [success, setSuccess] = useState(""); // To store success messages

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError(""); // Clear previous errors if validation passes
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user in database
      const dbResult = await createRegularUser(user, password);
      if (!dbResult.success) {
        console.error('Failed to create user in database:', dbResult.error);
        // Continue with Firebase flow even if database creation fails
      }

      // Send email verification
      await sendEmailVerification(user);
      alert("Please Check your Email To get Verified ")

      // Sign out the user after sending the verification email
      await signOut(auth);

      setSuccess("Verification email sent! Please check your inbox.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMsg = error.message;
      setError(errorMsg); // Display error message to user
      console.error("Error:", errorCode, errorMsg);
    }
  };


  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
      <p className="font-bold text-3xl text-green-600">YourHR</p>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
      <input
        className="px-5 py-3 border-2 w-80 border-black rounded-lg"
        placeholder="Email"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="px-5 py-3 border-2 w-80 border-black rounded-lg"
        placeholder="Password"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="px-5 py-3 border-2 w-80 border-black rounded-lg"
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-black text-center text-white text-bold text-lg px-5 py-2 w-80"
        onClick={onSubmit}
      >
        Register Now
      </button>
      <a href="/" className="text-blue-500">
        Go to Login
      </a>
    </div>
  );
}

export default Register;
