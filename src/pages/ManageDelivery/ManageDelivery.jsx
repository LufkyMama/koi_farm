import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

const ManageDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDelivery, setNewDelivery] = useState({});
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const userRole = 1; // Assuming you have a way to get the user's role

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await api.get("/koi/Delivery");
      const sortedDeliveries = response.data.sort((a, b) => b.deliveryID - a.deliveryID);
      setDeliveries(sortedDeliveries);
    } catch (err) {
      setError("Failed to fetch deliveries");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDelivery = async () => {
    try {
      const response = await api.post("/koi/Delivery", newDelivery);
      setDeliveries([...deliveries, response.data]);
      setNewDelivery({});
    } catch (error) {
      setError("Failed to create delivery");
    }
  };

  const handleDeleteDelivery = async (deliveryID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/koi/Delivery/${deliveryID}`);
      setDeliveries(
        deliveries.filter((delivery) => delivery.deliveryID !== deliveryID)
      );
    } catch (error) {
      setError("Failed to delete delivery");
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Delivering";
      case 1:
        return "Delivered";
      case 2:
        return "Failed";
      case 3:
        return "Cancelled";
      default:
        return "Unknown Status";
    }
  };
  const filteredDeliveries = selectedStatus === 'All' 
  ? deliveries 
  : deliveries.filter(order => getStatusLabel(order.status) === selectedStatus);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Delivery Management
      </h1>      
      <div className="mb-4 text-center">
        <button onClick={() => setSelectedStatus('All')} className="bg-gray-500 text-white px-4 py-1 rounded mr-2">All</button>
        <button onClick={() => setSelectedStatus('Delivering')} className="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Delivering</button>
        <button onClick={() => setSelectedStatus('Delivered')} className="bg-green-500 text-white px-4 py-1 rounded mr-2">Delivered</button>
        <button onClick={() => setSelectedStatus('Failed')} className="bg-gray-950 text-white px-4 py-1 rounded mr-2">Failed</button>
        <button onClick={() => setSelectedStatus('Cancelled')} className="bg-red-500 text-white px-4 py-1 rounded mr-2">Cancelled</button>

      </div>
      <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Delivery ID</th>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Customer ID</th>
            <th className="p-2 border">Start Delivery Day</th>
            <th className="p-2 border">End Delivery Day</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeliveries.map((delivery) => (
            <tr key={delivery.deliveryID} className="text-center border-b">
              <td className="p-2 border">
                <button
                  onClick={() => {
                    const path = userRole === 1 
                      ? `/staff/manageDelivery/deliveryDetail/${delivery.deliveryID}`
                      : `/admin/managedelivery/deliveryDetail/${delivery.deliveryID}`;
                    navigate(path);
                  }}
                  className="text-blue-500 underline"
                >
                  {delivery.deliveryID}
                </button>
              </td>
              <td className="p-2 border">{delivery.orderID}</td>
              <td className="p-2 border">{delivery.customerID}</td>
              <td className="p-2 border">{new Date(delivery.startDeliDay).toLocaleString()}</td>
              <td className="p-2 border">{new Date(delivery.endDeliDay).toLocaleString()}</td>
              <td className="p-2 border">{delivery.address}</td>
              <td className="p-2 border">{delivery.order.totalAmount} VND</td>
              <td className="p-2 border">{getStatusLabel(delivery.status)}</td>
             
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default ManageDelivery;
