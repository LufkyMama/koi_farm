// ManageConsignKoi.js
import React, { useState, useEffect } from 'react';
import api from '../../config/axios';
import ConsignKoiTable from '../ConsignmentKoi/ConsignKoiTable';
import EditAndCreateConsignForm from '../ConsignmentKoi/EditAndCreateConsignKoi';
import Modal from '../../components/Modal/Modal';

const ManageConsignKoi = () => {
  const [consignKois, setConsignKois] = useState([]);
  const [editKoiId, setEditKoiId] = useState(null);
  const [newKoi, setNewKoi] = useState({
    name: '',
    gender: '',
    age: '',
    size: '',
    color: '',
    dailyFeedAmount: '',
    personality: '',
    origin: '',
    selectionRate: '',
    species: '',
    price: '',
    consignmentID: '',
    image: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchConsignKois();
  }, []);

  const fetchConsignKois = async () => {
    try {
      const response = await api.get('/ConsignmentKoi');
      setConsignKois(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch consignment koi');
    }
  };

  const handleDeleteKoi = async (id) => {
    try {
      await api.delete(`/ConsignmentKoi/${id}`);
      setConsignKois(consignKois.filter((koi) => koi.consignmentKoiID !== id));
    } catch (error) {
      setErrorMessage('Failed to delete consignment koi');
    }
  };

  const startEditing = (koi) => {
    setNewKoi({ ...koi });
    setEditKoiId(koi.consignmentKoiID);
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Consignment Koi</h1>
      <div className="text-center mb-6">
        <button onClick={() => setShowCreateForm(true)} className="bg-green-500 text-white px-4 py-2 rounded">Create New Consignment Koi</button>
      </div>

      <ConsignKoiTable
        consignKois={consignKois}
        startEditing={startEditing}
        handleDelete={handleDeleteKoi}
      />

      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <EditAndCreateConsignForm
            koi={newKoi}
            setKoi={setNewKoi}
            fetchConsignKois={fetchConsignKois}
            editKoiId={editKoiId}
          />
        </Modal>
      )}

      {showCreateForm && (
        <Modal onClose={() => setShowCreateForm(false)}>
          <EditAndCreateConsignForm
            koi={newKoi}
            setKoi={setNewKoi}
            fetchConsignKois={fetchConsignKois}
            isCreating={true}
          />
        </Modal>
      )}

      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
    </div>
  );
};

export default ManageConsignKoi;
