import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { GoogleIcon } from '../components/icons';

const TopoPattern: React.FC = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05]" preserveAspectRatio="none">
        <path d="M-20 40 Q 80 150, 250 80 T 500 80" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-50 80 Q 50 200, 300 100 T 550 100" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-10 120 Q 100 250, 350 120 T 600 120" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-100 20 Q 100 180, 300 80 T 500 60" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-150 150 Q 50 300, 350 180 T 650 150" stroke="white" strokeWidth="2" fill="none" />
    </svg>
);


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
    <div className="w-full h-full flex flex-col bg-[#F0F2F5] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[45%] bg-[#253745]">
            <TopoPattern />
        </div>
        <svg
            className="absolute top-[calc(45%-1px)] left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 220"
        >
            <path
              fill="#F0F2F5"
              d="M0,96 C480,200,960,80,1440,160 L1440,320 L0,320 Z"
            ></path>
        </svg>

        <div className="relative flex-1 flex flex-col p-8 justify-between">
            <div className="pt-16">
                <h1 className="text-4xl font-bold text-[#253745]">Sign in</h1>
                <div className="w-12 h-1 bg-[#253745] mt-2 rounded-full"></div>
            </div>

            <div className="w-full space-y-4">
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-[#253745] text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 transition-transform duration-200 active:scale-95"
                >
                    <GoogleIcon className="w-6 h-6" />
                    <span>Sign in with Google</span>
                </button>
            </div>

            <p className="text-center text-sm text-[#4A5C6A]">
                Don't have an account? <span className="font-semibold text-[#253745] cursor-pointer" onClick={handleGoogleSignIn}>Sign up</span>
            </p>
        </div>
    </div>
  );
};

export default LoginScreen;