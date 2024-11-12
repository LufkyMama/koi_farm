// ManageFeedbackPage.js
import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, Snackbar } from '@mui/material';

const ManageFeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await api.get('/Feedback');
      setFeedbackList(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch feedback');
      setLoading(false);
    }
  };

  const handleDelete = async (feedbackID) => {
    try {
      await api.delete(`/Feedback/${feedbackID}`);
      setFeedbackList(feedbackList.filter(feedback => feedback.id !== feedbackID));
      setSnackbarMessage('Feedback deleted successfully');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to delete feedback');
      setSnackbarOpen(true);
      console.log("Can not fetch feedback"+ err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <Typography variant="h4" align="center" gutterBottom>Manage User Feedback</Typography>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-md rounded-lg">
          <TableHead>
            <TableRow className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <TableCell>User</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackList.map(feedback => (
              <TableRow key={feedback.id} className="border-b border-gray-200 hover:bg-gray-100">
                <TableCell>{feedback.userName || 'Anonymous'}</TableCell>
                <TableCell>{feedback.comment}</TableCell>
                <TableCell>{feedback.rating} / 5</TableCell>
                <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(feedback.id)}
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Snackbar for delete notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ManageFeedbackPage;
