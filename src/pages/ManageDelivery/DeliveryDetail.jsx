import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import EditDeliveryForm from "./EditDeliveryForm";
import Modal from "../../components/Modal/Modal";
import Stepper from "../../components/Stepper";

const DeliveryDetail = () => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonImage, setReasonImage] = useState('');
  const [newStatus, setNewStatus] = useState(null);

  useEffect(() => {
    const fetchDeliveryDetail = async () => {
      try {
        const response = await api.get(`/koi/Delivery/${id}`);
        setDelivery(response.data);
      } catch (err) {
        setError("Failed to fetch delivery details");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryDetail();
  }, [id]);

  const handleSave = () => {
    setShowEditForm(false);
    window.location.reload();
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setShowReasonModal(true);
  };

  const updateDeliveryStatus = async (newStatus) => {
    const updatedDelivery = {
      ...delivery,
      status: newStatus,
      reason,
      reasonImage,
    };
    try {
      await api.put(`/koi/Delivery/${id}`, updatedDelivery);
      setDelivery(updatedDelivery);
      alert(`Delivery status updated to ${getStatusLabel(newStatus)}!`);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const steps = ["Delivering", "Delivered", "Failed", "Cancelled"];
  const currentStep = delivery ? delivery.status : 0;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Delivery Details
      </h1>
      {delivery ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <Stepper steps={steps} currentStep={currentStep} />
          <div>
            <p><strong>Delivery ID:</strong> {delivery.deliveryID}</p>
            <p><strong>Order ID:</strong> {delivery.orderID}</p>
            <p><strong>Customer ID:</strong> {delivery.customerID}</p>
            <p><strong>Start Delivery Day:</strong> {new Date(delivery.startDeliDay).toLocaleString()}</p>
            <p><strong>End Delivery Day:</strong> {new Date(delivery.endDeliDay).toLocaleString()}</p>
            <p><strong>Address:</strong> {delivery.address}</p>
            <p><strong>Total Amount:</strong> {delivery.order.totalAmount} VND</p>
            <p><strong>Status:</strong> {getStatusLabel(delivery.status)}</p>
            <p><strong>Reason:</strong> {delivery.reason || 'N/A'}</p>
            {delivery.reasonImage && <img src={delivery.reasonImage} alt="Reason" className="mt-2"/>}

            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleStatusChange(1)} // Delivered
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Delivered
              </button>
              <button
                onClick={() => handleStatusChange(2)} // Failed
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Failed
              </button>
              <button
                onClick={() => handleStatusChange(3)} // Cancelled
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Cancelled
              </button>
            </div>

            <button onClick={() => setShowEditForm(true)} className="bg-blue-500 text-white p-2 mt-2">
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div>No delivery details available.</div>
      )}

      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <EditDeliveryForm
            delivery={delivery}
            onSave={handleSave}
            onCancel={() => setShowEditForm(false)}
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
                updateDeliveryStatus(newStatus);
                setShowReasonModal(false);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
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

export default DeliveryDetail;
