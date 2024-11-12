import React from 'react';

const UserTable = ({ users, startEditing, handleDeleteUser }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">User Id</th>
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Password</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID} className="text-center border-b">
              <td className="py-2 px-4 border">{user.userID}</td>
              <td className="py-2 px-4 border">{user.username}</td>
              <td className="py-2 px-4 border">{"********"}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.phone}</td>
              <td className="py-2 px-4 border">{user.address}</td>
              <td className="py-2 px-4 border">
                {user.role === 0 ? 'Admin' : user.role === 1 ? 'Staff' : 'Customer'}
              </td>
              <td className="py-2 px-4 border">
              <button onClick={() => startEditing(user)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                Edit
              </button>
                <button onClick={() => handleDeleteUser(user.userID)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
