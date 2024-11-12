import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";

const ViewDetailsPage = () => {
  const { id } = useParams(); // Get koiID from the URL
  const [koiFish, setKoiFish] = useState(null);

  useEffect(() => {
    const fetchKoiFishDetails = async () => {
      try {
        const response = await api.get(`/koi/Koi/${id}`);
        setKoiFish(response.data);
      } catch (error) {
        console.error("Error fetching koi fish details:", error);
        try {
          const response = await api.get(`/ConsignmentKoi/${id}`);
          setKoiFish(response.data);
        } catch (error) {
          console.error("Error fetching koi fish details:", error);
        }
      }
    };

    fetchKoiFishDetails();
  }, [id]);

  if (!koiFish) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row space-x-0 md:space-x-8">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
          <img
            src={koiFish.image ?? "https://www.kodamakoifarm.com/wp-content/uploads/2024/05/w0503s054-re-260x421.jpg"}
            alt={koiFish.name}
            className="w-full h-auto max-w-xs object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{koiFish.name} - #{koiFish.koiID || koiFish.consignmentKoiID}</h1>
          <p className="text-3xl text-red-600 mb-4">${koiFish.price.toFixed(2)}</p>
          <div className="space-y-2">
            <p className="text-lg"><strong>Gender:</strong> {koiFish.gender}</p>
            <p className="text-lg"><strong>Age:</strong> {koiFish.age} years</p>
            <p className="text-lg"><strong>Size:</strong> {koiFish.size}</p>
            <p className="text-lg"><strong>Color:</strong> {koiFish.color}</p>
            <p className="text-lg"><strong>Daily Feed Amount:</strong> {koiFish.dailyFeedAmount}</p>
            <p className="text-lg"><strong>Personality:</strong> {koiFish.personality}</p>
            <p className="text-lg"><strong>Origin:</strong> {koiFish.origin}</p>
            <p className="text-lg"><strong>Selection Rate:</strong> {koiFish.selectionRate}</p>
            <p className="text-lg text-red-600"><strong>Species:</strong> {koiFish.species}</p>
            <p className="text-lg"><strong>Status:</strong> {koiFish.status}</p>

          </div>

          {/* Add-On Information */}
          {koiFish.addOn && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Add-On Information</h2>
              <p className="text-lg"><strong>Origin Certificate:</strong> 
              <img
            src={koiFish?.addOn?.originCertificate ?? "https://www.kodamakoifarm.com/wp-content/uploads/2024/05/w0503s054-re-260x421.jpg"}
            alt={koiFish.name}
            className="w-full h-auto max-w-xs object-cover rounded-lg shadow-lg"
          /></p>
              <p className="text-lg"><strong>Health Certificate:</strong> 
              <img
            src={koiFish.addOn.healthCertificate}
            alt={koiFish.name}
            className="w-full h-auto max-w-xs object-cover rounded-lg shadow-lg"
          />
              </p>
              <p className="text-lg"><strong>Ownership Certificate:</strong> 
              <img
            src={koiFish.addOn.ownershipCertificate}
            alt={koiFish.name}
            className="w-full h-auto max-w-xs object-cover rounded-lg shadow-lg"
          />
              </p>
            </div>
          )}

          <div className="mt-6 flex space-x-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300">Add to Cart</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPage;
