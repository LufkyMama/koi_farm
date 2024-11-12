import React from 'react';

const EditConsignmentForm = ({ newConsignment, handleChange, handleSave,customerID }) => {
  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  return(
  <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
    <label>Customer ID</label>
    <input 
      type="text" 
      name="customerID" 
      value={customerID} 
      disabled
      className="w-full p-2 border" 
    />
    {/* Other fields */}
    <label>Type</label>
    <select 
      name="type" 
      value={newConsignment.type} 
      onChange={handleChange} 
      className="w-full p-2 border"
    >
      <option value="0">Sell</option>
      <option value="1">Foster</option>
    </select>

    <label>Foster Price</label>
    <input 
      type="number" 
      name="fosterPrice" 
      value={newConsignment.fosterPrice} 
      onChange={handleChange} 
      className="w-full p-2 border" 
    />

    <label>Status</label>
    <select 
  name="status" 
  value={newConsignment.status} 
  onChange={handleChange} 
  className="w-full p-2 border"
>
  <option value={0}>Awaiting Payment</option>
  <option value={1}>Available</option>
  <option value={2}>Finished</option>
  <option value={3}>Raising</option>
  <option value={4}>Pending</option>
  <option value={5}>Negotiate</option>
</select>

    <label>Start Date</label>
    <input
      type="date"
      name="startDate"
      value={formatDate(newConsignment.startDate)}
      onChange={handleChange}
      className="w-full p-2 border"
    />

    <label>End Date</label>
    <input
      type="date"
      name="endDate"
      value={formatDate(newConsignment.endDate)}
      onChange={handleChange}
      className="w-full p-2 border"
    />
    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Save</button>
  </form>
);
};
export default EditConsignmentForm;
