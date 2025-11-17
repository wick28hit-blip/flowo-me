import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AnimatedBackground from '../components/AnimatedBackground';
import { GoogleIcon } from '../components/icons';

const LoginScreen: React.FC = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Error during Google sign-in:", error);
      if (error.code === 'auth/unauthorized-domain') {
          alert("Authentication failed: This app's domain is not authorized for OAuth operations. Please add it to the list of authorized domains in your Firebase project's authentication settings.");
      } else {
          alert("Could not sign in with Google. Please check the console for more details and ensure your Firebase config is correct.");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 bg-zinc-900 text-white relative">
      <AnimatedBackground />
      <div className="text-left">
        <h1 className="text-4xl font-bold tracking-tighter">Flowo</h1>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-white/70 max-w-xs mx-auto">
          Sign in to manage your properties and stay on top of maintenance.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 transition-transform duration-200 active:scale-95"
        >
          <GoogleIcon className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
