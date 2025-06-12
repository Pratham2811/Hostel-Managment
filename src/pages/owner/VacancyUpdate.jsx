import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, Users, Save, ArrowLeft } from 'lucide-react';

const VacancyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - replace with actual API call
  const [hostelData, setHostelData] = useState({
    id: 1,
    name: 'Sunrise Hostel',
    totalRooms: 20,
    occupiedRooms: 15,
    availableRooms: 5,
    roomDetails: [
      { roomNumber: '101', status: 'occupied', tenant: 'John Doe', checkIn: '2024-01-15' },
      { roomNumber: '102', status: 'available', tenant: '', checkIn: '' },
      { roomNumber: '103', status: 'occupied', tenant: 'Jane Smith', checkIn: '2024-02-01' },
      { roomNumber: '104', status: 'maintenance', tenant: '', checkIn: '' },
      { roomNumber: '105', status: 'available', tenant: '', checkIn: '' }
    ]
  });

  const [updatedRooms, setUpdatedRooms] = useState(hostelData.roomDetails);

  const handleRoomStatusChange = (roomNumber, newStatus) => {
    setUpdatedRooms(prev => 
      prev.map(room => 
        room.roomNumber === roomNumber 
          ? { ...room, status: newStatus, tenant: newStatus === 'available' ? '' : room.tenant }
          : room
      )
    );
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Updated rooms:', updatedRooms);
    navigate('/manage-hostels');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusOptions = [
    { value: 'occupied', label: 'Occupied' },
    { value: 'available', label: 'Available' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const availableCount = updatedRooms.filter(room => room.status === 'available').length;
  const occupiedCount = updatedRooms.filter(room => room.status === 'occupied').length;
  const maintenanceCount = updatedRooms.filter(room => room.status === 'maintenance').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/manage-hostels')}
            className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Manage Hostels
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Building2 className="w-8 h-8 mr-3 text-indigo-600" />
                Update Vacancy - {hostelData.name}
              </h1>
              <p className="text-gray-600 mt-1">Manage room availability and occupancy</p>
            </div>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{hostelData.totalRooms}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-red-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">{occupiedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">{availableCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">{maintenanceCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Management Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Room Details</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {updatedRooms.map((room) => (
                  <tr key={room.roomNumber} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Room {room.roomNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(room.status)}`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {room.tenant || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {room.checkIn ? new Date(room.checkIn).toLocaleDateString() : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={room.status}
                        onChange={(e) => handleRoomStatusChange(room.roomNumber, e.target.value)}
                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate('/manage-hostels')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacancyUpdate;