import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import UserTable from '../User/UserTable';
import EditUserForm from '../User/EditAndCreateForm';
import Modal from '../../components/Modal/Modal';

const ManageUserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({username: '',name: '',email: '',phone: '',address: '',role: '',password:''});
  const [editUserId, setEditUserId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await api.get('/User/profile/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Sort users by userID in descending order
      const sortedUsers = response.data.sort((a, b) => b.userID - a.userID);
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.delete(`/User/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(users.filter((user) => user.userID !== userId));
        alert('User deleted successfully');
    }
    } catch (err) {
        if (err.response) {
            // Server responded with a status code other than 2xx
            console.error('Server error:', err.response.data);
            alert(`Error deleting user: ${err.response.data.message || err.response.statusText}`);
        } else if (err.request) {
            // Request was made but no response received
            console.error('No response received:', err.request);
            alert('No response received from the server.');
        } else {
            // Something else happened in setting up the request
            console.error('Error setting up request:', err.message);
            alert('An unexpected error occurred.');
        }
    }
};

  const startEditing = (user) => {
    setNewUser({
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
    setEditUserId(user.userID);
    setShowEditForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }
      const payload = {
        ...newUser,
        userID: editUserId,
      };
       if (newUser.password) {
        payload.password = newUser.password;
      }else {
        delete payload.password; 
      }
      const response = await api.put(`/User/edit`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUsers(users.map((user) => (user.userID === editUserId ? { ...newUser, userID: editUserId } : user)));
        setShowEditForm(false);
        setEditUserId(null);
      } else {
        console.error("User edit failed:", response.status);
      }
    } catch (err) {
      console.error("Failed to edit user", err);
    }
  };
    // Filter consignments based on selected status
    const filteredUsersRole = filteredUsers !== null
    ? users.filter((user) => user.role === filteredUsers)
    : users;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profiles</h1>
      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setFilteredUsers(null)} className="bg-gray-300 text-black px-4 py-2 rounded">All</button>
        <button onClick={() => setFilteredUsers(0)} className="bg-yellow-500 text-white px-4 py-2 rounded">Admin</button>
        <button onClick={() => setFilteredUsers(1)} className="bg-green-500 text-white px-4 py-2 rounded">Staff</button>
        <button onClick={() => setFilteredUsers(2)} className="bg-blue-500 text-white px-4 py-2 rounded">Customer</button>
        </div>
      <UserTable users={filteredUsersRole} startEditing={startEditing} handleDeleteUser={handleDeleteUser} />

      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <EditUserForm user={newUser} handleChange={handleChange} handleSave={handleEdit} />
        </Modal>
      )}
    </div>
  );
};

export default ManageUserProfiles;
