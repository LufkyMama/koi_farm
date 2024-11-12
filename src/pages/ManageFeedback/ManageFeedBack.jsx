import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../config/axios';

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/Feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Failed to fetch feedback.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleDeleteFeedback = async (feedbackID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/Feedback/${feedbackID}`);
      alert("Feedback deleted successfully!");
      setFeedbacks(feedbacks.filter((feedback) => feedback.feedbackID !== feedbackID));
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete the feedback.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Feedbacks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Feedback ID</th>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Customer ID</th>
                <th className="py-2 px-4 border">Rating</th>
                <th className="py-2 px-4 border">Comment</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.feedbackID} className="text-center border-b">
                  <td className="py-2 px-4 border">{feedback.feedbackID}</td>
                  <td className="py-2 px-4 border">{feedback.orderID}</td>
                  <td className="py-2 px-4 border">{feedback.customerID}</td>
                  <td className="py-2 px-4 border">{feedback.rating}</td>
                  <td className="py-2 px-4 border">{feedback.comment}</td>
                  <td className="py-2 px-4 border">{new Date(feedback.dateFb).toLocaleString()}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDeleteFeedback(feedback.feedbackID)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/update-feedback/${feedback.feedbackID}`)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageFeedback;
