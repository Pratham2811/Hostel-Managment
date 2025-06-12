import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, Plus, Settings, Calendar, DollarSign, Users } from 'lucide-react';

const OwnerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Hostels', value: '3', icon: Building2, color: 'bg-blue-500' },
    { label: 'Active Bookings', value: '12', icon: Users, color: 'bg-green-500' },
    { label: 'Monthly Revenue', value: '₹45,000', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Pending Requests', value: '5', icon: Calendar, color: 'bg-orange-500' }
  ];

  const quickActions = [
    {
      title: 'Add New Hostel',
      description: 'List a new hostel property',
      icon: Plus,
      link: '/add-hostel',
      color: 'bg-indigo-500'
    },
    {
      title: 'Manage Hostels',
      description: 'View and edit your hostel listings',
      icon: Settings,
      link: '/manage-hostels',
      color: 'bg-blue-500'
    },
    {
      title: 'Booking Requests',
      description: 'Review pending booking requests',
      icon: Calendar,
      link: '/booking-requests',
      color: 'bg-green-500'
    },
    {
      title: 'Payment History',
      description: 'View your earnings and transactions',
      icon: DollarSign,
      link: '/payment-history',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your hostel properties and bookings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${action.color} p-3 rounded-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">New booking request</p>
                <p className="text-sm text-gray-600">Sunrise Hostel - Room 101</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Payment received</p>
                <p className="text-sm text-gray-600">₹1,200 from John Doe</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Hostel approved</p>
                <p className="text-sm text-gray-600">City Center Lodge is now live</p>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;