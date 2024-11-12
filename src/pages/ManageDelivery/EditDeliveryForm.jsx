import React, { useState } from "react";
import api from "../../config/axios";

const EditDeliveryForm = ({ delivery, onSave, onCancel }) => {
  const [formData, setFormData] = useState(delivery);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/koi/Delivery/${formData.deliveryID}`, formData);
      onSave();
      alert("Delivery details updated successfully!");
    } catch (err) {
      alert("Failed to update delivery details");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Delivery</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Order ID</label>
        <input
          type="text"
          name="orderID"
          value={formData.orderID}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Customer ID</label>
        <input
          type="text"
          name="customerID"
          value={formData.customerID}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        >
          <option value={0}>Delivering</option>
          <option value={1}>Delivered</option>
          <option value={2}>Failed</option>
          <option value={3}>Cancelled</option>
        </select>
      </div>
      <div className="mt-4">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditDeliveryForm;