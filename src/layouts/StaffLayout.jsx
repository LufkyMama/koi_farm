import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Avatar } from '@mui/material';
import { MdDashboard } from 'react-icons/md';
import { FaFish, FaShoppingCart } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaBox, FaTags, FaComments, FaTruck,FaHome } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; // Đảm bảo đã import useNavigate

const StaffLayout = ({ children }) => {
  const navigate = useNavigate(); // Khởi tạo navigate

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 flex flex-col bg-gray-800 text-white p-4 h-full fixed overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">F Koi Staff</h2>
        <ul>
          {[
            { label: 'Dashboard', icon: <MdDashboard size={24} />, link: '/staff' },
            { label: 'Users', icon: <FaUsers size={24} />, link: '/staff/manage-user' },
            { label: 'Orders', icon: <FaShoppingCart size={24} />, link: '/staff/manageOrder' },
            { label: 'Koi Inventory', icon: <FaFish size={24} />, link: '/staff/manageKoi' },
            { label: 'Batches', icon: <FaBox size={24} />, link: '/staff/manageKoiBatch' },  
            { label: 'Promotions', icon: <FaTags size={24} />, link: '/staff/managePromotion' },  
            { label: 'Feedback', icon: <FaComments size={24} />, link: '/staff/manageFeedback' },  
            { label: 'Consignments', icon: <FaTruck size={24} />, link: '/staff/manageConsign' },  
            { label: 'Deliveries', icon: <FaTruck size={24} />, link: '/staff/manageDelivery' },  
            { label: 'Consigned Koi', icon: <FaFish size={24} />, link: '/staff/manageConsignKoi' }, 
            { label: 'Transactions', icon: <FaTruck size={24} />, link: '/staff/manageTrans' }  
          ].map((item, index) => (
            <li key={index} className="mb-4">
              <Link to={item.link}>
                <Button
                  startIcon={
                    <Avatar
                      sx={{
                        backgroundColor: '#0288d1',
                        height: 48,
                        width: 48,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  }
                >
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Button
            color="inherit"
            startIcon={
              <Avatar
                sx={{
                  backgroundColor: '#0288d1',
                  height: 48,
                  width: 48,
                }}
              >
                <FaHome size={24} color="white" /> 
              </Avatar>
            }
            className="mt-4"
            onClick={() => navigate('/')} // Thêm sự kiện onClick để điều hướng về trang chủ

          >
            Home Page
          </Button>
        </div>

      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
};
StaffLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StaffLayout;
