import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ShopPage/ProductsPage';
import ComparisonPage from './pages/ComparisonPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogPage from './pages/Blog/BlogPage';
import UserBlogPage from './pages/Blog/UserBlogPage';
import ConsignmentPage from './pages/Consignment/ConsignmentPage';
import UserProfilePage from './pages/User/UserProfilePage';
import EditUserPage from './pages/UserInformation';
import ViewDetailsPage from './pages/ShopPage/ViewDetailsPage';
import PaymentPage from './pages/ShopPage/PaymentPage';
import KoiBatchPage from './pages/KoiBatch/KoiBatchPage';
import OrderPage from './pages/OrderPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import RoleBasedRoutes from './Routes/AdminRoute';
import PaymentSuccess from './pages/ShopPage/PaymentSuccess';
import UserConsignmentsDetailPage from './pages/ConsignPage';
import FeedBackPage from './pages/Feedback/FeedbackPage'
import LandingPage from './pages/LandingPage';
function App() {
  const location = useLocation();
  const shouldRenderHeaderFooter = !(
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/staff")
  );

  return (
    <>
      <ScrollToTop />
      {shouldRenderHeaderFooter && (
        <Header  />
      )}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/comparison" element={<ComparisonPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/userBlog" element={<UserBlogPage />} />
          <Route path="/consign" element={<ConsignmentPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/user/edit/:id" element={<EditUserPage />} />
          <Route path="/view-details/:id" element={<ViewDetailsPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/koiBatch" element={<KoiBatchPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />        
          <Route path="/consigned" element={<UserConsignmentsDetailPage />} />    
          <Route path="/*" element={<RoleBasedRoutes />} />
          <Route path="/feedback" element={<FeedBackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {shouldRenderHeaderFooter && <Footer />}
    </>
  );
}

export default App;
