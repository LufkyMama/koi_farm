// Testinominals.js
import React, { useEffect, useState } from 'react';
import api from '../config/axios';
import { format } from 'date-fns';

const Testinominals = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get('/Feedback');
        setFeedbackList(response.data);
      } catch (err) {
        setError('Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {feedbackList.length === 0 ? (
        <p className="text-center text-gray-500">There are no testimonials to display at the moment.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {feedbackList.slice(0, visibleCount).map((feedback, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
              <div className="bg-white border-solid rounded-md p-6 text-md shadow-md">
                <p className="italic">{feedback.comment}</p>
                <div className="flex mt-8 items-start">
                  <div className="ml-4">
                    <h6 className="font-bold">{feedback.customer?.user?.username || 'Anonymous'}</h6>
                    <span className="text-sm italic text-neutral-600">
                      {format(new Date(feedback.dateFb), 'MMMM dd, yyyy')}
                    </span>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">
                        {'★'.repeat(feedback.rating)}
                      </span>
                      <span className="text-gray-400">
                        {'☆'.repeat(5 - feedback.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {feedbackList.length > visibleCount && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Testinominals;
