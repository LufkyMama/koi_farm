import React, { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    orderID: 0,
    customerID: 0,
    staffID: 0,
    createAt: '',
    updateAt: '',
    totalAmount: 0,
    type: 0,
    status: 0,
    promotionID: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deliveryStatuses = [
    { value: 0, label: "Pending" },
    { value: 1, label: "Completed" },
    { value: 2, label: "Cancelled" },
  ];

  const orderTypes = [
    { value: 0, label: "Online" },
    { value: 1, label: "Offline" },
  ];

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/Order/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = { ...order, updateAt: new Date().toISOString() };
    console.log('Order data being sent:', updatedOrder);
    try {
      await api.put(`/Order/${id}`, updatedOrder);
      alert("Promotion updated successfully!");
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-orange-100">
      <h1 className="text-2xl font-bold mb-4">Update Order</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Order ID</label>
          <input
            type="number"
            name="orderID"
            value={order.orderID}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer ID</label>
          <input
            type="number"
            name="customerID"
            value={order.customerID}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Staff ID</label>
          <input
            type="number"
            name="staffID"
            value={order.staffID}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Create At</label>
          <input
            type="text"
            name="createAt"
            value={order.createAt}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded p-2 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Update At</label>
          <input
            type="text"
            name="updateAt"
            value={order.updateAt}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded p-2 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
                      type="number"

            name="status"
            value={order.status}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          >
            {deliveryStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={order.type}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          >
            {orderTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Promotion ID</label>
          <input
            type="number"
            name="promotionID"
            value={order.promotionID}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Order
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
