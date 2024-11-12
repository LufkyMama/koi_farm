import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute"; // Unified protected route
import AdminLayout from "../layouts/AdminLayout";
import StaffLayout from "../layouts/StaffLayout";
import AdminPage from "../pages/AdminPage";
import StaffPage from "../pages/StaffPage";
import ManageDelivery from "../pages/ManageDelivery/ManageDelivery";
import ManageConsignmentPage from "../pages/Admin/ManageConsign";
import ManageUserProfiles from "../pages/Admin/ManageUserProfile";
import ManagePromotion from "../pages/Admin/ManagePromotion";
import ManageKoi from "../pages/Admin/ManageKoi";
import ManageKoiBatch from "../pages/Admin/ManageKoiBatch";
import ManageOrder from "../pages/Admin/ManageOrder";
import ManageFeedback from "../pages/Admin/ManageFeedBack";
import UpdateKoi from "../pages/ManageKoi/UpdateKoi";
import CreateKoi from "../pages/ManageKoi/CreateKoi";
import UpdatePromotion from "../pages/ManagePromotion/UpdatePromotion";
import CreatePromotion from "../pages/ManagePromotion/CreatePromotion";
import UpdateOrder from "../pages/ManageOrder/UpdateOrder";
import UpdateDelivery from "../pages/ManageDelivery/UpdateDelivery";
import ManageConsignKoi from "../pages/Admin/ManageConsignKoi"
import CreateTransactionPage from '../pages/CreateTransactionPage'
import OrderDetail from '../pages/ManageOrder/OrderDetail';
import DeliveryDetail from '../pages/ManageDelivery/DeliveryDetail';
function RoleBasedRoutes() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="0"> {/* Role '0' for Admin */}
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-user"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageUserProfiles />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageKoi"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageKoi />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageKoi/updateKoi/:id"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <UpdateKoi />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageKoi/createKoi"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <CreateKoi />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/managePromotion"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManagePromotion />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/managePromotion/updatePromotion/:id"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <UpdatePromotion />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/managePromotion/createPromotion"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <CreatePromotion />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageKoiBatch"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageKoiBatch />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageFeedback"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageFeedback />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageOrder"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageOrder />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageOrder/orderDetail/:id"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <OrderDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageOrder/updateOrder/:id"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <UpdateOrder />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageConsign"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageConsignmentPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageDelivery"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageDelivery />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
         <Route
        path="/admin/manageDelivery/deliveryDetail/:id"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <DeliveryDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageDelivery/updateDelivery/:id"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <UpdateDelivery />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageConsignKoi"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageConsignKoi />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageFeedback"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <ManageFeedback />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageTrans"
        element={
          <ProtectedRoute requiredRole="0">
            <AdminLayout>
              <CreateTransactionPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Staff Routes */}
      <Route
        path="/staff/manageTrans"
        element={
          <ProtectedRoute requiredRole="1"> {/* Role '1' for Staff */}
            <StaffLayout>
              <CreateTransactionPage />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <ProtectedRoute requiredRole="1"> {/* Role '1' for Staff */}
            <StaffLayout>
              <StaffPage />
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff/manageDelivery"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageDelivery />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageDelivery/DeliveryDetail/:id"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <DeliveryDetail />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageDelivery/updateDelivery/:id"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <UpdateDelivery />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageConsign"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageConsignmentPage />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manage-user"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageUserProfiles />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/managePromotion"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManagePromotion />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageKoi"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageKoi />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageKoiBatch"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageKoiBatch />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageOrder"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageOrder />
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff/manageOrder/orderDetail/:id"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <OrderDetail />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageOrder/updateOrder/:id"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <UpdateOrder />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageFeedback"
        element={
          <ProtectedRoute requiredRole="1">
            <StaffLayout>
              <ManageFeedback />
            </StaffLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/manageConsignKoi"
        element={
          <ProtectedRoute requiredRole="1">
            <AdminLayout>
              <ManageConsignKoi />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default RoleBasedRoutes;
