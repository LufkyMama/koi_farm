import React from 'react';

const EditOrderForm = ({ order, handleChange, handleSave, handleFileChange }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Order</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Customer ID</label>
          <input
            type="text"
            name="customerID"
            value={order.customerID || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Staff ID</label>
          <input
            type="text"
            name="staffID"
            value={order.staffID || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={order.totalAmount || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={order.status || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          >
            <option value="0">Pending</option>
            <option value="1">Completed</option>
            <option value="2">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Reason</label>
          <input
            type="text"
            name="reason"
            value={order.reason || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Reason Image</label>
          <input
            type="file"
            name="reasonImage"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditOrderForm;