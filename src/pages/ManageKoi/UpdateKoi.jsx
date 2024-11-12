import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";

const UpdateKoi = ({ onUpdateSuccess }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: 0,
    size: "",
    color: "",
    dailyFeedAmount: "",
    price: 0,
    personality: "",
    origin: "",
    selectionRate: "",
    species: "",
    status: 0,

    image: null,
    originCertificate: null,
    healthCertificate: null,
    ownershipCertificate: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKoiData = async () => {
      try {
        const response = await api.get(`/koi/Koi/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching koi data:", error);
        alert("Failed to fetch koi data.");
      }
    };

    fetchKoiData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Initialize FormData
    const data = new FormData();

    // Append form data, stringifying objects as needed
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });


    try {
      const response = await api.put(`/koi/Koi/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Koi fish updated successfully!");
      onUpdateSuccess(response.data);
    } catch (error) {
      console.error("Error updating koi fish:", error);
    }
  };


  const isFileField = (fieldName) => fieldName.includes("Certificate") || fieldName === "image";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Update Koi Fish</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Daily Feed Amount</label>
        <input
          type="text"
          name="dailyFeedAmount"
          value={formData.dailyFeedAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Personality</label>
        <input
          type="text"
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Origin</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Selection Rate</label>
        <input
          type="text"
          name="selectionRate"
          value={formData.selectionRate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Species</label>
        <input
          type="text"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Status</label>
        <input
          type="number"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Origin Certificate</label>
        <input
          type="file"
          name="originCertificate"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Health Certificate</label>
        <input
          type="file"
          name="healthCertificate"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Ownership Certificate</label>
        <input
          type="file"
          name="ownershipCertificate"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mt-2">
        Update
      </button>
    </form>
  );
};

export default UpdateKoi;
