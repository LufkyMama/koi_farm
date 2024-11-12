import React, { useState, useEffect,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import BatchTable from '../KoiBatch/BatchTable';
import EditBatchForm from '../KoiBatch/EditAndCreateForm';
import Modal from '../../components/Modal/Modal';

const ManageKoiBatch = () => {
  const [batches, setBatches] = useState([]);
  const [editBatchId, setEditBatchId] = useState(null);
  const [newBatch, setNewBatch] = useState({ name: '', species: '',remainBatch:'', price: '', quantity: '', description: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await api.get('/batch');
        const sortedBatches = response.data.sort((a, b) => b.batchID - a.batchID);
        setBatches(sortedBatches);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, [navigate]);

    const handleEdit = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const payload = {
          ...newBatch,
          batchID: editBatchId,
          pricePerBatch: parseFloat(newBatch.pricePerBatch),     
          quantityPerBatch: parseInt(newBatch.quantityPerBatch, 10)
        };
        const response = await api.put(`/Batch/${editBatchId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          setBatches(batches.map((batch) => (batch.batchID === editBatchId ? { ...newBatch, batchID: editBatchId } : batch)));
          setShowEditForm(false);
          setEditBatchId(null);
        } else {
          console.error("Batch edit failed:", response.status);
        }
      } catch (err) {
        console.error("Failed to edit batch", err);
      }
    };
    const startEditing = (batch) => {
      setNewBatch({
        name: batch.name,
        species: batch.species,
        remainBatch: batch.remainBatch,
        pricePerBatch: batch.pricePerBatch,
        quantityPerBatch: batch.quantityPerBatch,
        description: batch.description,
      });
      setEditBatchId(batch.batchID);
      setShowEditForm(true);
      setShowCreateForm(false);
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewBatch((prevBatch) => ({
        ...prevBatch,
        [name]: value,
      }));
    };
  const handleDelete = async (batchId) => {
    try {
      if (!window.confirm('Are you sure you want to delete this batch?')) return;

      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await api.delete(`/Batch/${batchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setBatches(batches.filter((batch) => batch.batchID !== batchId));
      } else {
        console.error("Batch deletion failed:", response.status);
      }
    } catch (err) {
      console.error("Failed to delete batch", err);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [name, species, minPrice, maxPrice]);

  const handleFilter = async () => {
    if (name.trim() === '' && species.trim() === '' && minPrice === '' && maxPrice === '') {
      try {
        const response = await api.get('/batch');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
      return;
    }

    try {
      const response = await api.get('/Batch/Search', {
        params: {
          species: species.trim() !== '' ? species : undefined,
          minPrice: minPrice !== '' ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : undefined,
          name: name.trim() !== '' ? name : undefined,
        },
      });
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching filtered batches:', error);
    }
  };


  const handleCreateBatch = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await api.post('/Batch', newBatch, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setBatches([...batches, response.data]);
        setShowCreateForm(false);
      } else {
        console.error("Batch creation failed:", response.status);
      }
    } catch (err) {
      console.error("Failed to create batch", err);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Koi Batches Available</h1>
      <div className="text-center mb-6">
      <div className="text-center mb-6">
        <button onClick={() => setShowCreateForm(true)}>Create New Batch</button>
      </div>
      </div>

      {filterVisible && <FilterForm {...{ name, species, minPrice, maxPrice, setName, setSpecies, setMinPrice, setMaxPrice, handleFilter }} />}

      <BatchTable batches={batches} startEditing={startEditing} handleDelete={handleDelete}
      />
      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <EditBatchForm newBatch={newBatch} handleChange={handleChange} handleSave={handleEdit}
          />
        </Modal>)}

        {showCreateForm && (
        <Modal onClose={() => setShowCreateForm(false)}>
          <EditBatchForm newBatch={newBatch} handleChange={handleChange} handleSave={handleCreateBatch} 
          />
        </Modal>
      )}
    </div>
  );
};

export default ManageKoiBatch;
