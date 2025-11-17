import React, { useState } from 'react';
import type { Screen, Property, User } from '../types';
import { ChevronLeftIcon, BellIcon } from '../components/icons';

interface AddPropertyScreenProps {
  onNavigate: (screen: Screen) => void;
  onAddProperty: (property: Property) => void;
  user: User;
}

const AddPropertyScreen: React.FC<AddPropertyScreenProps> = ({ onNavigate, onAddProperty, user }) => {
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');

  const handleSubmit = () => {
    if (!propertyName || !propertyAddress) {
      alert("Please fill out all property details.");
      return;
    }
    const newProperty: Property = {
      id: `p-${Date.now()}`,
      name: propertyName,
      address: propertyAddress,
    };
    onAddProperty(newProperty);
  };

  return (
    <div className="flex-1 flex flex-col bg-black text-white">
      <header className="flex justify-between items-center p-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Add New Property</h1>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6" />
          <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-9 h-9 rounded-full" />
        </div>
      </header>

      <div className="flex-1 bg-gray-100 text-black rounded-t-3xl p-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
            <div>
              <label htmlFor="propertyName" className="text-sm font-medium text-gray-700">Property Name</label>
              <input 
                type="text" 
                id="propertyName" 
                value={propertyName} 
                onChange={e => setPropertyName(e.target.value)} 
                placeholder="e.g. Main Residence" 
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700">Property Address</label>
              <input 
                type="text" 
                id="propertyAddress" 
                value={propertyAddress} 
                onChange={e => setPropertyAddress(e.target.value)} 
                placeholder="e.g. 123 Maple St" 
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg mt-6">
          Save Property
        </button>
      </div>
    </div>
  );
};

export default AddPropertyScreen;