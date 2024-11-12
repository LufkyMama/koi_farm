import React, { useEffect, useState } from 'react';
import api from '../config/axios';
import { Tab, Tabs, Table, TableBody, TableRow, TableCell, Typography, Box, Button, Rating, TextField, Snackbar, Alert, Card, CardContent } from '@mui/material';

const OrderPage = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({}); // State to hold feedback for each order
  const [rating, setRating] = useState({}); // State to hold ratings for each order
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [filterStatus, setFilterStatus] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/Order/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort orders by creation date (most recent first)
        const sortedOrders = response.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        setOrders(sortedOrders);
      } catch (err) {
        if (err.response) {
          setError(`API Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          setError('No response received from API');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleFeedbackChange = (orderID, value) => {
    setFeedback(prev => ({ ...prev, [orderID]: value }));
  };

  const handleRatingChange = (orderID, value) => {
    setRating(prev => ({ ...prev, [orderID]: value }));
  };

  const submitFeedback = async (orderID, customerID) => {
    const feedbackData = {
      CustomerID: customerID,
      OrderID: orderID,
      Rating: rating[orderID] || 5,
      Comment: feedback[orderID] || '',
    };



    try {
      await api.post('/Feedback/CreateFeedback', feedbackData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedback(prev => ({ ...prev, [orderID]: '' }));
      setRating(prev => ({ ...prev, [orderID]: 5 }));
      setNotification({ open: true, message: 'Feedback submitted successfully!', severity: 'success' });
    } catch (err) {
      setNotification({ open: true, message: 'Failed to submit feedback.', severity: 'error' });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const getOrderLabel = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Completed";
      case 2:
        return "Cancelled";
      default:
        return "Unknown Status";
    }
  };
  const getDeliveryLabel = (status) => {
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
        return "Unknown Delivery Status";
    }
  };
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };
  const filteredOrders = filterStatus === null
    ? orders
    : orders.filter(order => order.status === filterStatus);

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 4 }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom>Your Order History</Typography>
        <Tabs
          value={filterStatus}
          onChange={(e, newValue) => handleFilterChange(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="All" value={null} />
          <Tab label="Pending" value={0} />
          <Tab label="Completed" value={1} />
          <Tab label="Cancelled" value={2} />
        </Tabs>
        <div>
          {filteredOrders.map(order => (
            <Card key={order.orderID} sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Order ID:</strong></TableCell>
                      <TableCell>{order.orderID}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total Amount:</strong></TableCell>
                      <TableCell>{order.totalAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Created At:</strong></TableCell>
                      <TableCell>{new Date(order.createAt).toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Customer ID:</strong></TableCell>
                      <TableCell>{order.customerID}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Order Status:</strong></TableCell>
                      <TableCell>{getOrderLabel(order.status)}</TableCell>
                    </TableRow>
                    {order.delivery ? (
                      <>
                        <TableRow>
                          <TableCell><strong>Delivery Status:</strong></TableCell>
                          <TableCell>{getDeliveryLabel(order.delivery.status)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Start Delivery Day:</strong></TableCell>
                          <TableCell>{new Date(order.delivery.startDeliDay).toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>End Delivery Day:</strong></TableCell>
                          <TableCell>{order.delivery.endDeliDay ? new Date(order.delivery.endDeliDay).toLocaleString() : 'Not Available'}</TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableRow>
                        <TableCell><strong>Delivery Information:</strong></TableCell>
                        <TableCell>Not available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>


                {order.status === 1 && (
                  <Box sx={{ mt: 2 }}>
                    <Rating
                      name={`rating-${order.orderID}`}
                      value={rating[order.orderID] || 5}
                      onChange={(event, newValue) => handleRatingChange(order.orderID, newValue)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="Your Feedback"
                      variant="outlined"
                      fullWidth
                      value={feedback[order.orderID] || ''}
                      onChange={(e) => handleFeedbackChange(order.orderID, e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => submitFeedback(order.orderID, order.customerID)}
                    >
                      Submit Feedback
                    </Button>
                  </Box>
                )}
                {/* Snackar use to display a brief messages and fades out*/}
                <Snackbar
                  open={notification.open}
                  autoHideDuration={3000}
                  onClose={() => setNotification({ ...notification, open: false })}
                >
                  <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                  </Alert>
                </Snackbar>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default OrderPage;
