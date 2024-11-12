// src/pages/PaymentSuccess.jsx
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const transactionID = searchParams.get('transactionID');
  const amount = searchParams.get('amount');
  const status_text = searchParams.get('status_text');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-md w-full">
        <div className="text-center">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 text-green-500 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-2">transaction ID: #{transactionID}</p>
            <p className="text-gray-300 mb-2">Amount Paid: {amount} VNĐ</p>
            {/* <p className="text-gray-300">Payment Method: {paymentMethod}</p> */}
            <p className="text-gray-300">{status_text}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/orders')}
              className="bg-blue-600 w-full py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View Orders
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="bg-gray-700 w-full py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
