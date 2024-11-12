import React from 'react';

const EditUserForm = ({ user, handleChange, handleSave }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="text"
        name="Password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="address"
        value={user.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="0">Admin</option>
        <option value="1">Staff</option>
        <option value="2">Customer</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditUserForm;
