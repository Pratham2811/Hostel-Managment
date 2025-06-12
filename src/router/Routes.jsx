import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public Pages
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

// User Pages
import UserDashboard from '../pages/user/UserDashboard.jsx';
import HostelList from '../pages/user/HostelList.jsx';
import HostelDetails from '../pages/user/HostelDetails.jsx';
import BookingHistory from '../pages/user/BookingHistory.jsx';

// Owner Pages
import OwnerDashboard from '../pages/owner/OwnerDashboard.jsx';
import AddHostel from '../pages/owner/AddHostel.jsx';
import ManageHostels from '../pages/owner/ManageHostels.jsx';
import VacancyUpdate from '../pages/owner/VacancyUpdate.jsx';
import BookingRequests from '../pages/owner/BookingRequests.jsx';
import PaymentHistory from '../pages/owner/PaymentHistory.jsx';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import ApproveHostels from '../pages/admin/ApproveHostels.jsx';
import ManageUsers from '../pages/admin/ManageUsers.jsx';
import Complaints from '../pages/admin/Complaints.jsx';
import Transactions from '../pages/admin/Transactions.jsx';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={`/dashboard/${user?.role}`} /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to={`/dashboard/${user?.role}`} /> : <Register />} 
      />

      {/* User Routes */}
      <Route 
        path="/dashboard/user" 
        element={
          
            <UserDashboard />
         
        } 
      />
      <Route 
        path="/hostels" 
        element={
         
            <HostelList />
          
        } 
      />
      <Route 
        path="/hostels/:id" 
        element={
          
            <HostelDetails />
          
        } 
      />
      <Route 
        path="/booking-history" 
        element={
           <BookingHistory />
        } 
      />

      {/* Owner Routes */}
      <Route 
        path="/dashboard/owner" 
        element={
          <OwnerDashboard />
        } 
      />
      <Route 
        path="/add-hostel" 
        element={
            <AddHostel />
        } 
      />
      <Route 
        path="/manage-hostels" 
        element={
          <ManageHostels />
        } 
      />
      <Route 
        path="/vacancy-update/:id" 
        element={
         <VacancyUpdate />
        } 
      />
      <Route 
        path="/booking-requests" 
        element={
          <BookingRequests />
        } 
      />
      <Route 
        path="/payment-history" 
        element={
          <PaymentHistory />
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/dashboard/admin" 
        element={
             <AdminDashboard />
        } 
      />
      <Route 
        path="/approve-hostels" 
        element={
           <ApproveHostels />
        } 
      />
      <Route 
        path="/manage-users" 
        element={
          <ManageUsers />
        } 
      />
      <Route 
        path="/complaints" 
        element={
            <Complaints />
        } 
      />
      <Route 
        path="/transactions" 
        element={
            <Transactions />
        } 
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;