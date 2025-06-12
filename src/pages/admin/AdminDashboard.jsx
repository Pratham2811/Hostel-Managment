import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Building2, Users, AlertTriangle, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Hostels', value: '45', icon: Building2, color: 'bg-blue-500' },
    { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-green-500' },
    { label: 'Pending Approvals', value: '8', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Total Revenue', value: '₹2,45,000', icon: DollarSign, color: 'bg-purple-500' }
  ];

  const quickActions = [
    {
      title: 'Approve Hostels',
      description: 'Review and approve pending hostel listings',
      icon: CheckCircle,
      link: '/approve-hostels',
      color: 'bg-green-500',
      badge: '8'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      link: '/manage-users',
      color: 'bg-blue-500'
    },
    {
      title: 'Handle Complaints',
      description: 'Review and resolve user complaints',
      icon: AlertTriangle,
      link: '/complaints',
      color: 'bg-orange-500',
      badge: '3'
    },
    {
      title: 'View Transactions',
      description: 'Monitor all platform transactions',
      icon: DollarSign,
      link: '/transactions',
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    {
      type: 'hostel_approval',
      message: 'New hostel "Sunrise Hostel" submitted for approval',
      time: '2 hours ago',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      type: 'user_registration',
      message: '5 new users registered today',
      time: '4 hours ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      type: 'complaint',
      message: 'New complaint filed against "City Lodge"',
      time: '6 hours ago',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      type: 'transaction',
      message: 'Payment of ₹1,200 processed successfully',
      time: '8 hours ago',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}! Manage the platform efficiently.</p>
            </div>
          </div>
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
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow relative"
            >
              <div className="flex items-center">
                <div className={`${action.color} p-3 rounded-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
                {action.badge && (
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {action.badge}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`p-2 rounded-lg bg-gray-100 mr-3`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">Database</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">Payment Gateway</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">Email Service</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-900">File Storage</span>
                </div>
                <span className="text-sm text-yellow-600 font-medium">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;