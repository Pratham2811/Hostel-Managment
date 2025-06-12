import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Building2,
  Search,
  Calendar,
  Settings,
  Bell,
  CreditCard,
  Users,
  Shield,
  FileText,
  Plus
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getSidebarLinks = () => {
    switch (user?.role) {
      case 'user':
        return [
          { to: '/dashboard/user', label: 'Dashboard', icon: Home },
          { to: '/hostels', label: 'Find Hostels', icon: Search },
          { to: '/booking-history', label: 'My Bookings', icon: Calendar }
        ];
      case 'owner':
        return [
          { to: '/dashboard/owner', label: 'Dashboard', icon: Home },
          { to: '/add-hostel', label: 'Add Hostel', icon: Plus },
          { to: '/manage-hostels', label: 'Manage Hostels', icon: Building2 },
          { to: '/booking-requests', label: 'Booking Requests', icon: Bell },
          { to: '/payment-history', label: 'Payment History', icon: CreditCard }
        ];
      case 'admin':
        return [
          { to: '/dashboard/admin', label: 'Dashboard', icon: Home },
          { to: '/approve-hostels', label: 'Approve Hostels', icon: Shield },
          { to: '/manage-users', label: 'Manage Users', icon: Users },
          { to: '/complaints', label: 'Complaints', icon: FileText },
          { to: '/transactions', label: 'Transactions', icon: CreditCard }
        ];
      default:
        return [];
    }
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="bg-white shadow-lg h-screen w-64 fixed left-0 top-16 z-30 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;