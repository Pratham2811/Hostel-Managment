import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Users, Check, X, Eye, Calendar } from 'lucide-react';

const ApproveHostels = () => {
  const [filter, setFilter] = useState('pending');
  const [selectedHostel, setSelectedHostel] = useState(null);

  // Mock data - replace with actual API call
  const [hostels, setHostels] = useState([
    {
      id: 1,
      name: 'Sunrise Hostel',
      ownerName: 'John Smith',
      location: 'Downtown Area, Mumbai',
      price: 1200,
      totalRooms: 20,
      amenities: ['wifi', 'parking', 'meals'],
      status: 'pending',
      submittedDate: '2024-02-15',
      images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'],
      description: 'A modern hostel with all necessary amenities for students and professionals.',
      address: '123 Main Street, Downtown, Mumbai - 400001',
      phone: '+91 9876543210',
      email: 'john@example.com'
    },
    {
      id: 2,
      name: 'Student Haven',
      ownerName: 'Sarah Johnson',
      location: 'University District, Delhi',
      price: 800,
      totalRooms: 15,
      amenities: ['wifi', 'meals'],
      status: 'pending',
      submittedDate: '2024-02-10',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
      description: 'Perfect for university students with affordable pricing and good facilities.',
      address: '456 College Road, University Area, Delhi - 110001',
      phone: '+91 9876543211',
      email: 'sarah@example.com'
    },
    {
      id: 3,
      name: 'City Center Lodge',
      ownerName: 'Mike Wilson',
      location: 'City Center, Bangalore',
      price: 1500,
      totalRooms: 25,
      amenities: ['wifi', 'parking', 'meals', 'gym'],
      status: 'approved',
      submittedDate: '2024-02-01',
      approvedDate: '2024-02-05',
      images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'],
      description: 'Premium hostel with excellent facilities in the heart of the city.',
      address: '789 Central Avenue, City Center, Bangalore - 560001',
      phone: '+91 9876543212',
      email: 'mike@example.com'
    }
  ]);

  const handleApproval = (hostelId, action) => {
    setHostels(prev => 
      prev.map(hostel => 
        hostel.id === hostelId 
          ? { 
              ...hostel, 
              status: action,
              approvedDate: action === 'approved' ? new Date().toISOString().split('T')[0] : undefined
            }
          : hostel
      )
    );
    setSelectedHostel(null);
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

  const filteredHostels = hostels.filter(hostel => 
    filter === 'all' ? true : hostel.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-indigo-600" />
            Approve Hostels
          </h1>
          <p className="text-gray-600 mt-1">Review and approve hostel listings</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' },
              { key: 'all', label: 'All' }
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

        {/* Hostels List */}
        <div className="space-y-6">
          {filteredHostels.map((hostel) => (
            <div key={hostel.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={hostel.images[0]}
                    alt={hostel.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {hostel.name}
                    </h3>
                    <p className="text-gray-600 mb-1">Owner: {hostel.ownerName}</p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hostel.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ₹{hostel.price}/month
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {hostel.totalRooms} rooms
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(hostel.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(hostel.status)}`}>
                    {hostel.status.charAt(0).toUpperCase() + hostel.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm">{hostel.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {hostel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedHostel(hostel)}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  
                  {hostel.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproval(hostel.id, 'approved')}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(hostel.id, 'rejected')}
                        className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "No hostels have been submitted yet." 
                : `No ${filter} hostels found.`}
            </p>
          </div>
        )}

        {/* Hostel Details Modal */}
        {selectedHostel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedHostel.name}</h2>
                  <button
                    onClick={() => setSelectedHostel(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedHostel.images[0]}
                      alt={selectedHostel.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">Description</h3>
                        <p className="text-gray-600">{selectedHostel.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">Address</h3>
                        <p className="text-gray-600">{selectedHostel.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Owner Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {selectedHostel.ownerName}</p>
                        <p><span className="font-medium">Email:</span> {selectedHostel.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedHostel.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Hostel Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Monthly Rent:</span> ₹{selectedHostel.price}</p>
                        <p><span className="font-medium">Total Rooms:</span> {selectedHostel.totalRooms}</p>
                        <p><span className="font-medium">Submitted:</span> {new Date(selectedHostel.submittedDate).toLocaleDateString()}</p>
                        {selectedHostel.approvedDate && (
                          <p><span className="font-medium">Approved:</span> {new Date(selectedHostel.approvedDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHostel.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedHostel.status === 'pending' && (
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={() => handleApproval(selectedHostel.id, 'approved')}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(selectedHostel.id, 'rejected')}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveHostels;