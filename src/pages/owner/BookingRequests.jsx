import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Check, X, Clock } from 'lucide-react';

const BookingRequests = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - replace with actual API call
  const [requests, setRequests] = useState([
    {
      id: 1,
      hostelName: 'Sunrise Hostel',
      studentName: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      checkIn: '2024-03-01',
      duration: '6 months',
      amount: 7200,
      status: 'pending',
      requestDate: '2024-02-15',
      roomPreference: 'Single occupancy'
    },
    {
      id: 2,
      hostelName: 'Student Haven',
      studentName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      checkIn: '2024-03-15',
      duration: '3 months',
      amount: 2400,
      status: 'approved',
      requestDate: '2024-02-10',
      roomPreference: 'Shared room'
    },
    {
      id: 3,
      hostelName: 'City Center Lodge',
      studentName: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      checkIn: '2024-04-01',
      duration: '12 months',
      amount: 18000,
      status: 'rejected',
      requestDate: '2024-02-12',
      roomPreference: 'Single occupancy'
    }
  ]);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <X className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(request => request.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Requests</h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All Requests' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
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

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "No booking requests yet." 
                  : `No ${filter} requests found.`}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {request.hostelName}
                    </h3>
                    <p className="text-gray-600">
                      Request from {request.studentName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(request.status)}
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Student</div>
                      <div className="text-sm text-gray-600">{request.studentName}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Check-in</div>
                      <div className="text-sm text-gray-600">
                        {new Date(request.checkIn).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Duration</div>
                      <div className="text-sm text-gray-600">{request.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 text-gray-400 mr-2">₹</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Amount</div>
                      <div className="text-sm text-gray-600">₹{request.amount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{request.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{request.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-1">Room Preference</div>
                  <div className="text-sm text-gray-600">{request.roomPreference}</div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => handleStatusChange(request.id, 'approved')}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </div>
                )}

                {request.status !== 'pending' && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Request {request.status} on {new Date(request.requestDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRequests;