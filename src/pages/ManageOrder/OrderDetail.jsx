import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/axios';
import EditOrderForm from './EditOrderForm';
import Modal from '../../components/Modal/Modal';
import Stepper from '../../components/Stepper';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reason, setReason] = useState('');
  const [reasonImage, setReasonImage] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [newStatus, setNewStatus] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/Order/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setErrorMessage("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedOrder = { ...order, updateAt: new Date().toISOString() };
    console.log('Order data being sent:', updatedOrder);
    try {
      await api.put(`/Order/${id}`, updatedOrder);
      alert("Order updated successfully!");
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          reasonImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = ["Pending", "Completed", "Cancelled"];

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setShowReasonModal(true);
  };

  const updateOrderStatus = async (newStatus) => {
    const updatedOrder = {
      ...order,
      status: newStatus,
      reason,
      reasonImage,
      updateAt: new Date().toISOString(),
    };
    try {
      await api.put(`/Order/${id}`, updatedOrder);
      setOrder(updatedOrder);
      alert(`Order status updated to ${steps[newStatus]}!`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Order Details</h1>

      <Stepper steps={steps} currentStep={order ? order.status : 0} />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Basic Order Information</h2>
        <p><strong>Order ID:</strong> {order?.orderID}</p>
        <p><strong>Customer ID:</strong> {order?.customerID || 'N/A'}</p>
        <p><strong>Staff ID:</strong> {order?.staffID || 'N/A'}</p>
        <p><strong>Date of Purchase:</strong> {order ? new Date(order.createAt).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Last Updated:</strong> {order ? new Date(order.updateAt).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Total Amount:</strong> {order ? order.totalAmount.toLocaleString() : 'N/A'} VND</p>
        <p><strong>Type:</strong> {order?.type === 0 ? "Online" : "Offline"}</p>
        <p><strong>Status:</strong> {order ? steps[order.status] : 'N/A'}</p>
        <p><strong>Reason:</strong> {order?.reason || 'N/A'}</p>
        {order?.reasonImage && <img src={order.reasonImage} alt="Reason" className="mt-2"/>}
      </section>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleStatusChange(1)} // Complete
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Complete
        </button>
        <button
          onClick={() => handleStatusChange(2)} // Cancelled
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancelled
        </button>
      </div>

      <button onClick={() => setShowEditForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Edit Order
      </button>

      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <EditOrderForm
            order={order}
            handleChange={handleChange}
            handleSave={handleSave}
            handleFileChange={handleFileChange}
          />
        </Modal>
      )}

      {showReasonModal && (
        <Modal onClose={() => setShowReasonModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Provide Reason and Image</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Reason Image</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setReasonImage(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={() => {
                updateOrderStatus(newStatus);
                setShowReasonModal(false);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </Modal>
      )}

      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
    </div>
  );
};

export default OrderDetail;
