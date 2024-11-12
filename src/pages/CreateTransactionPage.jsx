import React, { useState } from 'react';
import axios from '../config/axios'; // Make sure this path is correct for your Axios instance
import { TextField, Button, Snackbar, Alert } from '@mui/material';

const CreateTransactionPage = ({ token }) => {
  const [orderID, setOrderID] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async () => {
    try {
      await axios.post('/Transaction/createOffTransaction', orderID, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setNotification({ open: true, message: 'Transaction created successfully!', severity: 'success' });
      setOrderID(''); // Clear input field after successful submission
    } catch (error) {
      setNotification({ open: true, message: 'Failed to create transaction.', severity: 'error' });
      console.error(error);
    }
  };

  return (
    <>

    </>
  );
};

export default CreateTransactionPage;
