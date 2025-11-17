import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// =================================================================================
// IMPORTANT: REPLACE WITH YOUR FIREBASE PROJECT CONFIGURATION
// To get this, go to your Firebase project, click the gear icon (Project settings),
// scroll down to "Your apps", and select the web app. You'll find the config object there.
// =================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyC5DClYbT11FeFnohPUcWDYcvhKAFS0a1Q",
  authDomain: "flowo-f25a2.firebaseapp.com",
  projectId: "flowo-f25a2",
  storageBucket: "flowo-f25a2.firebasestorage.app",
  messagingSenderId: "16726807744",
  appId: "1:16726807744:web:4e86c5e9015a8da6cd0925",
  measurementId: "G-S8Q54XEZLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
