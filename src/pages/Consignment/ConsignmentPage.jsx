import { useState } from 'react';
import { Form, Input, Button, Select, Radio, Upload, InputNumber, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../config/axios';

const ConsignmentPage = () => {
    const [loading, setLoading] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const dailyCostOptions = {
        1: 150000,
        2: 200000,
        3: 500000
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };
    const [selectedPricePerDay, setSelectedPricePerDay] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const calculateTotalCost = (start, end, pricePerDay) => {
        if (start && end && pricePerDay) {
            const days = end.diff(start, 'days');
            setTotalCost(days * pricePerDay);
        } else {
            setTotalCost(0);
        }
    };
    const handlePriceListChange = (value) => {
        const pricePerDay = dailyCostOptions[value] || 0;
        setSelectedPricePerDay(pricePerDay);
        calculateTotalCost(startDate, endDate, pricePerDay);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        if (startDate && date.isBefore(startDate)) {
            message.error('End date cannot be earlier than the start date');
        } else {
            setEndDate(date);
        }
    };


    const handleSubmit = async (values) => {
        if (startDate && endDate && endDate.isBefore(startDate)) {
            message.error('End date cannot be earlier than the start date');
            return; // Prevent submission
        }
        setLoading(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'image' || key === 'originCertificate' || key === 'healthCertificate' || key === 'ownershipCertificate') {
                formData.append(key, value?.file);
            } else {
                formData.append(key, value);
            }
        });

        formData.append('priceListId', 1);
        formData.append('startDate', startDate ? startDate.toISOString() : '');
        formData.append('endDate', endDate ? endDate.toISOString() : '');
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                message.error('You must be logged in to consign.');
                return;
            }

            await api.post('/Consignment/pending', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            message.success('Consignment submitted successfully and is pending approval.');
            setTotalCost(0); // Reset total cost
        } catch (error) {
            console.log(error)
            message.error('Failed to consign fish. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
            <Form
                onFinish={handleSubmit}
                layout="vertical"
                style={{ width: '100%', maxWidth: 600 }}
            >
                <Form.Item label="Type" name="type" >
                    <Select placeholder="Select type">
                        <Select.Option value={0}>Sell</Select.Option>
                        <Select.Option value={1}>Foster</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Foster Name" name="name" rules={[{ required: true }]}>
                    <Input placeholder="Enter name" />
                </Form.Item>

                <Form.Item label="Foster Gender" name="gender" rules={[{ required: true }]}>
                    <Input placeholder="Enter gender" />
                </Form.Item>

                <Form.Item label="Foster Age" name="age" rules={[{ required: true, type: 'number' }]}>
                    <InputNumber placeholder="Enter age" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Foster Size (cm)" name="size">
                    <InputNumber placeholder="Enter size" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Daily Feed Amount (grams)" name="dailyFeedAmount">
                    <InputNumber placeholder="Enter daily feed amount" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Foster Personality" name="personality">
                    <Input placeholder="Enter personality" />
                </Form.Item>

                <Form.Item label="Foster Origin" name="origin">
                    <Input placeholder="Enter origin" />
                </Form.Item>

                <Form.Item label="Foster Species" name="species" rules={[{ required: true }]}>
                    <Input placeholder="Enter species" />
                </Form.Item>

                <Form.Item label="Foster Color" name="color" >
                    <Input placeholder="Enter color" />
                </Form.Item>

                <Form.Item label="Foster Selection Rate" name="selectionRate" >
                    <Input placeholder="Enter rate" />
                </Form.Item>

                <Form.Item label="Foster Price" name="price" >
                    <Input placeholder="Enter price" />
                </Form.Item>

                <Form.Item label="Price Per Day Option" name="priceListId" rules={[{ required: true }]}>
                    <Select placeholder="Select price per day option" onChange={handlePriceListChange}>
                        <Select.Option value={1}>Option 1 - 150,000 VND/day</Select.Option>
                        <Select.Option value={2}>Option 2 - 200,000 VND/day</Select.Option>
                        <Select.Option value={3}>Option 3 - 500,000 VND/day</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select a start date' }]}>
                    <DatePicker onChange={handleStartDateChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please select an end date' }]}>
                    <DatePicker onChange={handleEndDateChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Estimated Total Cost" colon={false}>
                    <span>{formatCurrency(totalCost)}</span>
                </Form.Item>

                <Form.Item label="Upload Image" name="image" valuePropName="file">
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Origin Certificate" name="originCertificate" valuePropName="file">
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Health Certificate" name="healthCertificate" valuePropName="file">
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Ownership Certificate" name="ownershipCertificate" valuePropName="file">
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Submit Consignment
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ConsignmentPage;
