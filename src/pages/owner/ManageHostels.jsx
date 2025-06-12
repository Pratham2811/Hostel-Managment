import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Edit, Eye, MapPin, Users, DollarSign, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const ManageHostels = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - replace with actual API call
  const hostels = [
    {
      id: 1,
      name: 'Sunrise Hostel',
      location: 'Downtown Area',
      price: 1200,
      totalRooms: 20,
      occupiedRooms: 15,
      status: 'approved',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Student Haven',
      location: 'University District',
      price: 800,
      totalRooms: 15,
      occupiedRooms: 12,
      status: 'pending',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      name: 'City Center Lodge',
      location: 'City Center',
      price: 1500,
      totalRooms: 25,
      occupiedRooms: 0,
      status: 'rejected',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      createdAt: '2024-01-20'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHostels = filter === 'all' 
    ? hostels 
    : hostels.filter(hostel => hostel.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-indigo-600" />
              Manage Hostels
            </h1>
            <p className="text-gray-600 mt-1">View and manage your hostel listings</p>
          </div>
          <Link
            to="/add-hostel"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Hostel
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All Hostels' },
              { key: 'approved', label: 'Approved' },
              { key: 'pending', label: 'Pending' },
              { key: 'rejected', label: 'Rejected' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hostels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHostels.map((hostel) => (
            <div key={hostel.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{hostel.name}</h3>
                  <div className="flex items-center">
                    {getStatusIcon(hostel.status)}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hostel.status)}`}>
                      {hostel.status.charAt(0).toUpperCase() + hostel.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{hostel.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">₹{hostel.price}</div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">
                      {hostel.occupiedRooms}/{hostel.totalRooms}
                    </div>
                    <div className="text-xs text-gray-500">occupied</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  {hostel.status === 'approved' && (
                    <Link
                      to={`/vacancy-update/${hostel.id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Update
                    </Link>
                  )}
                </div>

                {hostel.status === 'rejected' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">
                      Your hostel was rejected. Please review the requirements and resubmit.
                    </p>
                  </div>
                )}

                {hostel.status === 'pending' && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Your hostel is under review. You'll be notified once approved.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
            <p className="text-gray-500 mb-4">
              {filter === 'all' 
                ? "You haven't added any hostels yet." 
                : `No ${filter} hostels found.`}
            </p>
            <Link
              to="/add-hostel"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Hostel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHostels;