// src/pages/ManagePromotion/CreatePromotion.jsx

import React, { useState } from "react";
import api from "../../config/axios";

const CreatePromotion = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountRate: 0,
    startDate: '',
    endDate: '',
    remainingRedeem: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/Promotion', formData);
      alert("Promotion created successfully!");
      onSuccess(response.data);
    } catch (error) {
      console.error("Error creating promotion:", error);
      alert("Failed to create promotion.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Promotion</h2>
      {Object.keys(formData).map((key) => (
        <div className="mb-2" key={key}>
          <label className="block text-sm font-medium">{key}</label>
          <input
            type={typeof formData[key] === "number" ? "number" : "text"}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 mt-2">
        Create
      </button>
    </form>
  );
};

export default CreatePromotion;

