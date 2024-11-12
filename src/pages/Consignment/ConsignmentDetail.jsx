import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/axios';

function ConsignmentDetailPage() {
    const { id } = useParams(); // Get the consignment ID from the URL
    const [loading, setLoading] = useState(false);
    const [consignment, setConsignment] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchConsignment = async () => {
            setLoading(true);
            setErrorMessage('');

            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setErrorMessage('You must be logged in to view this consignment.');
                    return;
                }

                // Fetch consignment details by ID
                const response = await api.get(`/Consignment/CustomerConsignment`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setConsignment(response.data);
            } catch (error) {
                console.error('Error fetching consignment:', error);
                setErrorMessage('Failed to load consignment details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchConsignment();
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Consignment Details</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : errorMessage ? (
                <p className="text-center text-red-600">{errorMessage}</p>
            ) : consignment ? (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-2">{consignment.name}</h2>
                    <p><strong>Type:</strong> {consignment.type === 0 ? 'Sell' : 'Foster'}</p>
                    <p><strong>Gender:</strong> {consignment.gender}</p>
                    <p><strong>Age:</strong> {consignment.age}</p>
                    <p><strong>Size:</strong> {consignment.size} cm</p>
                    <p><strong>Color:</strong> {consignment.color}</p>
                    <p><strong>Daily Feed Amount:</strong> {consignment.dailyFeedAmount} grams</p>
                    <p><strong>Personality:</strong> {consignment.personality}</p>
                    <p><strong>Origin:</strong> {consignment.origin}</p>
                    <p><strong>Species:</strong> {consignment.species}</p>
                    {consignment.type === 1 && (
                        <p><strong>Fostering Days:</strong> {consignment.fosteringDays}</p>
                    )}
                    <p><strong>Status:</strong> {consignment.status}</p> {/* Assuming there's a status field */}
                </div>
            ) : (
                <p className="text-center">No consignment details found.</p>
            )}
        </div>
    );
}

export default ConsignmentDetailPage;
