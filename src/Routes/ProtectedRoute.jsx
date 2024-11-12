  import { Navigate } from 'react-router-dom';
  import React from 'react';

  // Protected route for admin
  const AdminProtectedRoute = ({ children , requiredRole}) => {
    const userRole = localStorage.getItem('userRole'); 
    const userAddress = localStorage.getItem('userAddress'); 

    const userPhone = localStorage.getItem('userAddress'); 


    if (userRole !== requiredRole) {  
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userAddress');
      localStorage.removeItem('userPhone');
      return <Navigate to="/login" />;
    }

    return children;
  };

  export default AdminProtectedRoute;