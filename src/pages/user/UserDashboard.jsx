import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Calendar, MapPin, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
<Navbar/>
const UserDashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Find Hostels',
      description: 'Browse available hostels in your area',
      icon: Search,
      link: '/hostels',
      color: 'bg-blue-500'
    },
    {
      title: 'Booking History',
      description: 'View your past and current bookings',
      icon: Calendar,
      link: '/booking-history',
      color: 'bg-green-500'
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
          <p className="text-gray-600">Ready to find your next perfect stay?</p>
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
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No recent bookings</p>
            <Link
              to="/hostels"
              className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Find Hostels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;