import React, { useState } from 'react';
import { DollarSign, Calendar, User, Building2, Download, Filter, TrendingUp, CreditCard } from 'lucide-react';

const Transactions = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  const transactions = [
    {
      id: 1,
      transactionId: 'TXN123456789',
      studentName: 'John Doe',
      ownerName: 'Jane Smith',
      hostelName: 'Sunrise Hostel',
      amount: 1200,
      platformFee: 60,
      ownerAmount: 1140,
      date: '2024-02-15',
      month: 'February 2024',
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 2,
      transactionId: 'TXN123456790',
      studentName: 'Sarah Wilson',
      ownerName: 'Mike Johnson',
      hostelName: 'Student Haven',
      amount: 800,
      platformFee: 40,
      ownerAmount: 760,
      date: '2024-02-10',
      month: 'February 2024',
      status: 'completed',
      paymentMethod: 'Credit Card'
    },
    {
      id: 3,
      transactionId: 'TXN123456791',
      studentName: 'Mike Brown',
      ownerName: 'David Lee',
      hostelName: 'City Center Lodge',
      amount: 1500,
      platformFee: 75,
      ownerAmount: 1425,
      date: '2024-02-08',
      month: 'February 2024',
      status: 'pending',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 4,
      transactionId: 'TXN123456792',
      studentName: 'Emily Davis',
      ownerName: 'Jane Smith',
      hostelName: 'Sunrise Hostel',
      amount: 1200,
      platformFee: 60,
      ownerAmount: 1140,
      date: '2024-01-15',
      month: 'January 2024',
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 5,
      transactionId: 'TXN123456793',
      studentName: 'Alex Johnson',
      ownerName: 'Sarah Connor',
      hostelName: 'Tech Hub Hostel',
      amount: 900,
      platformFee: 45,
      ownerAmount: 855,
      date: '2024-01-20',
      month: 'January 2024',
      status: 'failed',
      paymentMethod: 'Credit Card'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || transaction.status === filter;
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      
      switch (dateRange) {
        case 'thisMonth':
          matchesDate = transactionDate.getMonth() === now.getMonth() && 
                       transactionDate.getFullYear() === now.getFullYear();
          break;
        case 'lastMonth':
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
          matchesDate = transactionDate.getMonth() === lastMonth.getMonth() && 
                       transactionDate.getFullYear() === lastMonth.getFullYear();
          break;
        case 'last3Months':
          const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3);
          matchesDate = transactionDate >= threeMonthsAgo;
          break;
      }
    }
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  // Calculate statistics
  const totalRevenue = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const platformRevenue = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.platformFee, 0);
    
  const totalTransactions = filteredTransactions.length;
  const completedTransactions = filteredTransactions.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <DollarSign className="w-8 h-8 mr-3 text-indigo-600" />
              Transaction Management
            </h1>
            <p className="text-gray-600 mt-1">Monitor all platform transactions and revenue</p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{platformRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalTransactions > 0 ? Math.round((completedTransactions / totalTransactions) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center flex-1 min-w-64">
              <input
                type="text"
                placeholder="Search by student, hostel, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Filter className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700 mr-3">Filters:</span>
              </div>
              
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Time</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hostel & Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Breakdown
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.transactionId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.month}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.studentName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.hostelName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Building2 className="w-3 h-3 mr-1" />
                        {transaction.ownerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        Total: ₹{transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Platform: ₹{transaction.platformFee} | Owner: ₹{transaction.ownerAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.paymentMethod}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">No transactions match your current search and filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;