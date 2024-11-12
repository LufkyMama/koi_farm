import React, { useState } from "react";
import api from "../../config/axios";

const CreateKoi = ({ onCreateSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    size: "",
    color: "",
    dailyFeedAmount: "",
    price: "",
    personality: "",
    origin: "",
    selectionRate: "",
    species: "",
    addOn: "",
    image: null,
    originCertificate: null,
    healthCertificate: null,
    ownershipCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await api.post("/koi/Koi", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Koi fish created successfully!");
      onCreateSuccess(response.data);
      setFormData({
        name: "",
        gender: "",
        age: "",
        size: "",
        color: "",
        dailyFeedAmount: "",
        price: "",
        personality: "",
        origin: "",
        selectionRate: "",
        species: "",
        addOn: "",
        image: null,
        originCertificate: null,
        healthCertificate: null,
        ownershipCertificate: null,
      });
    } catch (error) {
      console.error("Error creating koi fish:", error);
      alert("Failed to create koi fish.");
    }
  };

  const isFileField = (fieldName) => fieldName.includes("Certificate") || fieldName === "image";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Koi Fish</h2>
      {Object.keys(formData).map((key) => (
        <div className="mb-2" key={key}>
          <label className="block text-sm font-medium">{key}</label>
          <input
            type={["age", "price"].includes(key) ? "number" : isFileField(key) ? "file" : "text"}
            name={key}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={!isFileField(key)} // Adjust required as needed
          />
          {isFileField(key) && formData[key] && (
            <p className="text-sm text-gray-600 mt-1">Selected file: {formData[key].name}</p>
          )}
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 mt-2">
        Create
      </button>
    </form>
  );
};

export default CreateKoi;
