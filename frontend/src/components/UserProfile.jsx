import React, { useState, useEffect } from 'react';
import { Edit2, Save, X as XIcon } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  },[userData]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/user/user-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserData(response.data[0]);
      } else {
        setError('Failed to load user profile. Please try again later.');
      }
    } catch (err) {
      setError('Failed to load user profile. Please try again later.');
      console.error('Error fetching user profile:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/user/user-profile',
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData(response.data);

        setEditData(null);
        setIsEditing(false);
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    }
  };

  const startEditing = () => {
    setEditData({...userData});
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditData(null);
    setIsEditing(false);
  };

  if (!userData) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 m-10 border-2 border-gray-200 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">User Profile</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}

      <form  className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Username', name: 'username' },
            { label: 'Email', name: 'email', type: 'email', disabled: true },
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
            { label: 'Address', name: 'address' },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                name={field.name}
                id={field.name}
                value={isEditing ? (editData[field.name] || '') : (userData[field.name] || '')}
                onChange={handleInputChange}
                disabled={!isEditing || field.disabled}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center"
              >
                <Save size={20} className="mr-2" /> Save Changes
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 flex items-center"
              >
                <XIcon size={20} className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={startEditing}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <Edit2 size={20} className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;