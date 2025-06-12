import React, { useState } from 'react';
import { AlertTriangle, User, Building2, Calendar, MessageSquare, Check, X, Clock } from 'lucide-react';

const Complaints = () => {
  const [filter, setFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Mock data - replace with actual API call
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Poor hygiene conditions',
      description: 'The common areas are not being cleaned regularly and the bathrooms are in poor condition.',
      complainantName: 'John Doe',
      complainantEmail: 'john@example.com',
      hostelName: 'Sunrise Hostel',
      ownerName: 'Jane Smith',
      category: 'hygiene',
      priority: 'high',
      status: 'pending',
      submittedDate: '2024-02-15',
      images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg']
    },
    {
      id: 2,
      title: 'Noise complaints',
      description: 'There is excessive noise during night hours from other residents and no action is being taken.',
      complainantName: 'Sarah Wilson',
      complainantEmail: 'sarah@example.com',
      hostelName: 'Student Haven',
      ownerName: 'Mike Johnson',
      category: 'noise',
      priority: 'medium',
      status: 'in_progress',
      submittedDate: '2024-02-10',
      assignedTo: 'Admin Team',
      images: []
    },
    {
      id: 3,
      title: 'Overcharging for services',
      description: 'The owner is charging extra fees that were not mentioned in the original agreement.',
      complainantName: 'Mike Brown',
      complainantEmail: 'mike@example.com',
      hostelName: 'City Center Lodge',
      ownerName: 'David Lee',
      category: 'billing',
      priority: 'high',
      status: 'resolved',
      submittedDate: '2024-02-05',
      resolvedDate: '2024-02-12',
      resolution: 'Owner was contacted and agreed to refund the extra charges. Policy clarification sent to all parties.',
      images: []
    }
  ]);

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { 
              ...complaint, 
              status: newStatus,
              resolvedDate: newStatus === 'resolved' ? new Date().toISOString().split('T')[0] : undefined
            }
          : complaint
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'hygiene':
        return '🧽';
      case 'noise':
        return '🔊';
      case 'billing':
        return '💰';
      case 'maintenance':
        return '🔧';
      default:
        return '📝';
    }
  };

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === filter);

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3 text-indigo-600" />
            Manage Complaints
          </h1>
          <p className="text-gray-600 mt-1">Review and resolve user complaints</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{resolvedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All Complaints' },
              { key: 'pending', label: 'Pending' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'resolved', label: 'Resolved' }
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

        {/* Complaints List */}
        <div className="space-y-6">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getCategoryIcon(complaint.category)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {complaint.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {complaint.complainantName}
                      </div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {complaint.hostelName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(complaint.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{complaint.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace('_', ' ').charAt(0).toUpperCase() + complaint.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
              </div>

              {complaint.status === 'resolved' && complaint.resolution && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Resolution:</h4>
                  <p className="text-green-800 text-sm">{complaint.resolution}</p>
                  <p className="text-green-600 text-xs mt-1">
                    Resolved on {new Date(complaint.resolvedDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Owner:</span> {complaint.ownerName} | 
                  <span className="font-medium ml-2">Category:</span> {complaint.category}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    View Details
                  </button>
                  
                  {complaint.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'in_progress')}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Start Investigation
                      </button>
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'rejected')}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {complaint.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusChange(complaint.id, 'resolved')}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "No complaints have been submitted yet." 
                : `No ${filter.replace('_', ' ')} complaints found.`}
            </p>
          </div>
        )}

        {/* Complaint Details Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{selectedComplaint.title}</h2>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Complainant Details</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {selectedComplaint.complainantName}</p>
                        <p><span className="font-medium">Email:</span> {selectedComplaint.complainantEmail}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Hostel Details</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Hostel:</span> {selectedComplaint.hostelName}</p>
                        <p><span className="font-medium">Owner:</span> {selectedComplaint.ownerName}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Complaint Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Category:</span> {selectedComplaint.category}</p>
                      <p><span className="font-medium">Priority:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedComplaint.priority)}`}>
                          {selectedComplaint.priority}
                        </span>
                      </p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedComplaint.status)}`}>
                          {selectedComplaint.status.replace('_', ' ')}
                        </span>
                      </p>
                      <p><span className="font-medium">Submitted:</span> {new Date(selectedComplaint.submittedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 text-sm">{selectedComplaint.description}</p>
                  </div>

                  {selectedComplaint.resolution && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Resolution</h3>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">{selectedComplaint.resolution}</p>
                        <p className="text-green-600 text-xs mt-1">
                          Resolved on {new Date(selectedComplaint.resolvedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedComplaint.status !== 'resolved' && selectedComplaint.status !== 'rejected' && (
                    <div className="flex space-x-3 pt-4 border-t">
                      {selectedComplaint.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              handleStatusChange(selectedComplaint.id, 'in_progress');
                              setSelectedComplaint(null);
                            }}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Start Investigation
                          </button>
                          <button
                            onClick={() => {
                              handleStatusChange(selectedComplaint.id, 'rejected');
                              setSelectedComplaint(null);
                            }}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      {selectedComplaint.status === 'in_progress' && (
                        <button
                          onClick={() => {
                            handleStatusChange(selectedComplaint.id, 'resolved');
                            setSelectedComplaint(null);
                          }}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;