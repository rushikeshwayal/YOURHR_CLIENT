import { useState } from "react";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { handleGoogleUser } from "../../../utils/authUtils";

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.emailVerified) {
        alert("Login successful");
        navigate('/home');
      } else {
        alert("Please verify your email");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onGoogleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in database and create if not
      const dbResult = await handleGoogleUser(user);

      if (dbResult.success) {
        if (dbResult.isNew) {
          alert('Welcome! Your account has been created successfully.');
        } else {
          alert('Welcome back!');
        }
        navigate('/home');
      } else {
        setError(dbResult.error || 'Failed to process Google login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
      {/* <img className="size-24" src="https://websitedemos.net/plant-shop-04/wp-content/uploads/sites/160/2020/07/grow-plant-store-logo-green.svg" alt="Grow" /> */}
      <p className="font-bold text-3xl text-green-600">TalentVerse</p>
      <div className="flex flex-col gap-10 justify-center items-center">
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
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <a className="ml-44 text-blue-500" href="/reset-password">Forgot Password</a>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <button className="bg-black text-center text-white text-bold text-lg px-5 py-2 w-80" onClick={onSubmit}>Login</button>
        <div className="bg-black flex items-center justify-center gap-5 text-white text-lg px-5 py-2 w-80 cursor-pointer" onClick={onGoogleSubmit}>
          <img className="w-8 bg-cover object-cover" src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="Google" />
          <span className="text-white">Login using Google</span>
        </div>
      </div>
      <a href="/register" className="text-blue-500">Go to Register</a>
    </div>
  );
}

export default Login;
