import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../../config/axios';

const ManagePromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/Promotion");
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      alert("Failed to fetch promotions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleDeleteProduct = async (promotionID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/Promotion/${promotionID}`);
      console.log("Delete response:", response);
      alert("Product deleted successfully!");
      setPromotions(promotions.filter((promotion) => promotion.promotionID !== promotionID));
    } catch (error) {
      console.error("Error deleting product:", error.response || error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Promotion</h1>
      <div className="mb-4 text-center">
        <button
          onClick={() => navigate("/admin/managePromotion/createPromotion")}
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Create Promotion
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Code</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Discount Rate</th>
                <th className="py-2 px-4 border">Start Date</th>
                <th className="py-2 px-4 border">End Date</th>
                <th className="py-2 px-4 border">Remaining Redeem</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion.promotionID} className="text-center border-b">
                  <td className="py-2 px-4 border">{promotion.code}</td>
                  <td className="py-2 px-4 border">{promotion.description}</td>
                  <td className="py-2 px-4 border">{promotion.discountRate}%</td>
                  <td className="py-2 px-4 border">
                    {new Date(promotion.startDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(promotion.endDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border">{promotion.remainingRedeem}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDeleteProduct(promotion.promotionID)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/admin/managePromotion/updatePromotion/${promotion.promotionID}`)}
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

export default ManagePromotion;
