import React, { useState } from 'react';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { Screen, User, NavigationPayload } from '../types';
import { ChevronLeftIcon } from '../components/icons';

interface ProfileScreenProps {
  onNavigate: (screen: Screen, payload?: NavigationPayload) => void;
  user: User;
  onUpdateUser: (updatedUser: Partial<User>) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, user, onUpdateUser }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // UI only for now
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const currentUser = auth.currentUser;

  const handleUpdate = async () => {
    if (!currentUser) {
      setError("Not authenticated.");
      return;
    }
    setError(null);
    setSuccess(null);

    try {
      let updateOccurred = false;

      // Update display name
      if (displayName !== user.displayName) {
        await updateProfile(currentUser, { displayName });
        onUpdateUser({ displayName });
        updateOccurred = true;
      }

      // Update email
      if (email !== user.email) {
        await updateEmail(currentUser, email);
        onUpdateUser({ email });
        updateOccurred = true;
      }

      // Update password
      if (password) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        if (password.length < 6) {
            setError("Password should be at least 6 characters.");
            return;
        }
        await updatePassword(currentUser, password);
        setPassword('');
        setConfirmPassword('');
        updateOccurred = true;
      }

      if (updateOccurred) {
        setSuccess("Profile updated successfully!");
      } else {
        setError("No changes were made.");
      }

    } catch (e: any) {
      console.error(e);
      if (e.code === 'auth/requires-recent-login') {
        setError("This action is sensitive and requires recent authentication. Please sign out and sign in again to continue.");
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <header className="flex items-center p-6 bg-white border-b sticky top-0 z-10">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold mx-auto">Manage Profile</h1>
        <div className="w-6"></div> {/* Spacer */}
      </header>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{success}</div>}

        <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
          <div className="flex flex-col items-center space-y-2">
              <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-24 h-24 rounded-full" />
              <p className="font-semibold text-lg">{user.displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
          <div>
            <label htmlFor="displayName" className="text-sm font-medium text-gray-700">Display Name</label>
            <input type="text" id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number (Optional)</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="e.g. +1 555-555-5555" className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
            <p className="text-xs text-gray-500 mt-1">Note: Phone number update is not yet connected to authentication.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
            <h3 className="font-semibold">Change Password</h3>
            <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">New Password</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
            </div>
            <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
            </div>
        </div>
        
        <button onClick={handleUpdate} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg mt-4">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
