import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import api from '../../config/axios'; // Assuming you have axios instance set up
import 'tailwindcss/tailwind.css'; // For styling

export default function UserProfilePage() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch the user profile by ID
        const response = await api.get(`/User/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data); // Set the fetched user data
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id, navigate]); 

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!user) {
    return <div className="text-center">Loading...</div>; 
  }

  return (
    <div className="p-6 min-h-screen flex justify-center items-center bg-gradient-to-r from-slate-500 to-orange-300">
      <Card className="w-full max-w-lg shadow-lg rounded-lg bg-white">
        <CardContent className="p-6">
          <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
            {user.name}'s Profile
          </Typography>
          <div className="text-center mb-4">
            <img
              className="w-32 h-32 rounded-full mx-auto shadow-lg border-4 border-white"
              src="https://via.placeholder.com/150"
              alt="Profile Avatar"
            />
          </div>
          <Typography variant="h6" className="mb-4 text-center text-gray-700">
            Name: <span className="font-bold">{user.name}</span>
          </Typography>
          <Typography variant="body1" className="text-center text-gray-600 mb-2">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" className="text-center text-gray-600 mb-2">
            Phone Number: {user.phone}
          </Typography>
          <Typography variant="body1" className="text-center text-gray-600 mb-2">
            Address: {user.address}
          </Typography>
          <div className="text-center">
            <Button
              variant="contained"
              color="primary"
              className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={() => navigate(`/user/edit/${user.userID}`)}
            >
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
