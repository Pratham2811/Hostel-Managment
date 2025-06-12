import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const BookingHistory = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - replace with actual API call
  const bookings = [
    {
      id: 1,
      hostelName: 'Sunrise Hostel',
      location: 'Downtown Area',
      checkIn: '2024-01-15',
      checkOut: '2024-04-15',
      duration: '3 months',
      amount: 3600,
      status: 'active',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    },
    {
      id: 2,
      hostelName: 'Student Haven',
      location: 'University District',
      checkIn: '2023-09-01',
      checkOut: '2023-12-01',
      duration: '3 months',
      amount: 2400,
      status: 'completed',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    },
    {
      id: 3,
      hostelName: 'City Center Lodge',
      location: 'City Center',
      checkIn: '2024-03-01',
      checkOut: '2024-06-01',
      duration: '3 months',
      amount: 4500,
      status: 'cancelled',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking History</h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'active', label: 'Active' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
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

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You haven't made any bookings yet." 
                  : `No ${filter} bookings found.`}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={booking.image}
                        alt={booking.hostelName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.hostelName}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex items-center">
                          {getStatusIcon(booking.status)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                        ₹{booking.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{booking.duration}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Check-in</div>
                        <div className="text-sm text-gray-600">
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Check-out</div>
                        <div className="text-sm text-gray-600">
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.status === 'active' && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Contact Owner
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;