import { useEffect, useState } from 'react';
import api from '../config/axios';
import { Tab, Tabs, Card, CardContent, Typography, Box, Dialog, CircularProgress, Button, DialogTitle, DialogContent, Table, TableBody, TableRow, TableCell, DialogActions, Select, MenuItem } from '@mui/material';
import { differenceInDays } from 'date-fns';
import { DatePicker } from 'antd';

const ConsignPage = ({ token }) => {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openKoiInfoModal, setOpenKoiInfoModal] = useState(false);
  const [openReconsignModal, setOpenReconsignModal] = useState(false);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [reconsignDetails, setReconsignDetails] = useState({
    startDate: null,
    endDate: null,
    priceListId: null,
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredConsignments, setFilteredConsignments] = useState([]);
  const dailyCostOptions = { 1: 150000, 2: 200000, 3: 500000 };
  const statusLabel = {
    0: "Awaiting Payment",
    1: "Available",
    2: "Finished",
    3: "Raising",
    4: "Pending",
    5: "Negotiate",
  };

  useEffect(() => {
    const fetchUserConsignments = async () => {
      try {
        const response = await api.get('/Consignment/CustomerConsignment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConsignments(response.data);
      } catch (err) {
        setError(err.response ? `API Error: ${err.response.status} - ${err.response.data.message}` : 'Error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserConsignments();
  }, [token]);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setFilteredConsignments(consignments);
    } else {
      const statusFilter = newValue - 1;
      setFilteredConsignments(consignments.filter(consignment => consignment.status === statusFilter));
    }
  };

  const handleReconsignClick = (consignment) => {
    setSelectedKoi(consignment.consignmentKois[0]);
    setOpenKoiInfoModal(true);
  };

  const handleConfirmKoiInfo = () => {
    setOpenKoiInfoModal(false);
    setOpenReconsignModal(true);
  };

  const handleStartDateChange = (date) => {
    setReconsignDetails((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    if (reconsignDetails.startDate && date < reconsignDetails.startDate) {
      alert("End date cannot be earlier than the start date");
    } else {
      setReconsignDetails((prev) => ({ ...prev, endDate: date }));
    }
  };

  const handlePriceListChange = (event) => {
    setReconsignDetails((prev) => ({ ...prev, priceListId: event.target.value }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ paddingBottom: 3, fontWeight: "bold", color: "#333" }}>
        Your Consignment
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        <Tab label="All" />
        <Tab label="Awaiting Payment" />
        <Tab label="Available" />
        <Tab label="Finished" />
        <Tab label="Raising" />
        <Tab label="Pending" />
        <Tab label="Negotiate" />
      </Tabs>
      {filteredConsignments.map(consignment => (
        <Card key={consignment.consignmentID} sx={{ marginBottom: 3, padding: 2, boxShadow: 3, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Table>
              <TableBody>
                {/* Consignment Details */}
                <TableRow>
                  <TableCell><strong>Consignment ID:</strong></TableCell>
                  <TableCell>{consignment.consignmentID}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Type:</strong></TableCell>
                  <TableCell>{consignment.type === 0 ? 'Sell' : 'Foster'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Foster Price:</strong></TableCell>
                  <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(consignment.fosterPrice)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Date:</strong></TableCell>
                  <TableCell>{new Date(consignment.startDate).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Date:</strong></TableCell>
                  <TableCell>{new Date(consignment.endDate).toLocaleDateString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {consignment.consignmentKois && consignment.consignmentKois.map(koi => (
              <Box key={koi.consignmentKoiID} sx={{ mt: 2 }}>
                <Typography variant="body2"><strong>Koi Name:</strong> {koi.name}</Typography>
                <Button variant="outlined" color="secondary" onClick={() => handleReconsignClick(consignment)} sx={{ mt: 1 }}>
                  View Koi Information
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Koi Information Modal */}
      <Dialog open={openKoiInfoModal} onClose={() => setOpenKoiInfoModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Koi Information</DialogTitle>
        <DialogContent>
          {selectedKoi && (
            <Box>
              <Typography variant="body1"><strong>Name:</strong> {selectedKoi.name}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedKoi.gender}</Typography>
              <Typography variant="body1"><strong>Age:</strong> {selectedKoi.age}</Typography>
              <Typography variant="body1"><strong>Size:</strong> {selectedKoi.size}</Typography>
              <Typography variant="body1"><strong>Color:</strong> {selectedKoi.color}</Typography>
              <Typography variant="body1"><strong>Origin:</strong> {selectedKoi.origin}</Typography>
              <Typography variant="body1"><strong>Species:</strong> {selectedKoi.species}</Typography>
              <Typography variant="body1">
                <strong>Price:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedKoi.price)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenKoiInfoModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmKoiInfo} color="primary">Proceed to Reconsign</Button>
        </DialogActions>
      </Dialog>

      {/* Reconsign Details Modal */}
      <Dialog open={openReconsignModal} onClose={() => setOpenReconsignModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reconsign Details</DialogTitle>
        <DialogContent>
          <DatePicker
            value={reconsignDetails.startDate}
            onChange={handleStartDateChange}
            placeholder="Start Date"
            style={{ width: "100%", marginBottom: 8 }}
          />
          <DatePicker
            value={reconsignDetails.endDate}
            onChange={handleEndDateChange}
            placeholder="End Date"
            style={{ width: "100%", marginBottom: 8 }}
          />
          <Select
            value={reconsignDetails.priceListId || ""}
            onChange={handlePriceListChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value={1}>Option 1 - 150,000 VND/day</MenuItem>
            <MenuItem value={2}>Option 2 - 200,000 VND/day</MenuItem>
            <MenuItem value={3}>Option 3 - 500,000 VND/day</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReconsignModal(false)} color="secondary">Cancel</Button>
          <Button color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConsignPage;
