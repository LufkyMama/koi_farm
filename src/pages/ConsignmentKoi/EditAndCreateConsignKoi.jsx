// EditAndCreateConsignForm.js
import React from 'react';
import api from '../../config/axios';

const EditAndCreateConsignForm = ({ koi, setKoi, fetchConsignKois, editKoiId, isCreating }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const intFields = ['age', 'pricePerDay', 'fosteringDays', 'consignmentId', 'ConsignmentKoiID'];
    const newValue = intFields.includes(name) ? parseInt(value, 10) : value;

    setKoi((prevKoi) => ({ ...prevKoi, [name]: newValue }));
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setKoi((prevKoi) => ({ ...prevKoi, [name]: files[0] }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCreating) {
        await api.post('/ConsignmentKoi', koi);
      } else {
        await api.put(`/ConsignmentKoi/${editKoiId}`, koi);
      }
      fetchConsignKois();
    } catch (error) {
      console.error('Error saving consignment koi:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" value={koi.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="gender" value={koi.gender} onChange={handleChange} placeholder="Gender" required />
      <input type="number" name="age" value={koi.age} onChange={handleChange} placeholder="Age" required />
      <input type="text" name="size" value={koi.size} onChange={handleChange} placeholder="Size" />
      <input type="text" name="color" value={koi.color} onChange={handleChange} placeholder="Color" />
      <input type="number" name="pricePerDay" value={koi.price} onChange={handleChange} placeholder="Price Per Day" required />
      <input
        type="text"
        name="dailyFeedAmount"
        value={koi.dailyFeedAmount}
        onChange={handleChange}
        placeholder="Daily Feed Amount"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="personality"
        value={koi.personality}
        onChange={handleChange}
        placeholder="Personality"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="origin"
        value={koi.origin}
        onChange={handleChange}
        placeholder="Origin"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="selectionRate"
        value={koi.selectionRate}
        onChange={handleChange}
        placeholder="Selection Rate"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="species"
        value={koi.species}
        onChange={handleChange}
        placeholder="Species"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="fosteringDays"
        value={koi.fosteringDays}
        onChange={handleChange}
        placeholder="Fostering Days"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isCreating ? 'Create Consignment Koi' : 'Save Changes'}
      </button>
    </form>
  );
};

export default EditAndCreateConsignForm;
