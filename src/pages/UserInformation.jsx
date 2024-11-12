import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import api from '../config/axios';

export default function EditUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', username: '',password: '', email: '', phone: '', address: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get(`/User/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await api.put(`/User/edit`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/profile`); 
    } catch (error) {
      setError('Failed to update user profile');
      console.error('Error updating user profile:', error);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen flex justify-center items-center bg-gradient-to-r from-slate-500 to-orange-300">
      <Card className="w-full max-w-lg shadow-lg rounded-lg bg-white">
        <CardContent className="p-6">
          <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
            {user.name}'s Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={user.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <div className="text-center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}