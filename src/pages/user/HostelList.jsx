import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Wifi, Car, Coffee } from 'lucide-react';
import Navbar from '../../components/Navbar';

const HostelList = () => {
  <Navbar/>
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: '',
    amenities: [],
    rating: ''
  });

  // Mock data - replace with actual API call
  const hostels = [
    {
      id: 1,
      name: 'Sunrise Hostel',
      location: 'Downtown Area',
      price: 1200,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      amenities: ['wifi', 'parking', 'meals'],
      availableRooms: 5
    },
    {
      id: 2,
      name: 'Student Haven',
      location: 'University District',
      price: 800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      amenities: ['wifi', 'meals'],
      availableRooms: 3
    },
    {
      id: 3,
      name: 'City Center Lodge',
      location: 'City Center',
      price: 1500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['wifi', 'parking', 'meals', 'gym'],
      availableRooms: 8
    },
    {
      id: 1,
      name: 'Sunrise Hostel',
      location: 'Downtown Area',
      price: 1200,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      amenities: ['wifi', 'parking', 'meals'],
      availableRooms: 5
    },
    {
      id: 2,
      name: 'Student Haven',
      location: 'University District',
      price: 800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      amenities: ['wifi', 'meals'],
      availableRooms: 3
    },
    {
      id: 3,
      name: 'City Center Lodge',
      location: 'City Center',
      price: 1500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['wifi', 'parking', 'meals', 'gym'],
      availableRooms: 8
    },
    {
      id: 1,
      name: 'Sunrise Hostel',
      location: 'Downtown Area',
      price: 1200,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      amenities: ['wifi', 'parking', 'meals'],
      availableRooms: 5
    },
    {
      id: 2,
      name: 'Student Haven',
      location: 'University District',
      price: 800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      amenities: ['wifi', 'meals'],
      availableRooms: 3
    },
    {
      id: 3,
      name: 'City Center Lodge',
      location: 'City Center',
      price: 1500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['wifi', 'parking', 'meals', 'gym'],
      availableRooms: 8
    },
    {
      id: 1,
      name: 'Sunrise Hostel',
      location: 'Downtown Area',
      price: 1200,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      amenities: ['wifi', 'parking', 'meals'],
      availableRooms: 5
    },
    {
      id: 2,
      name: 'Student Haven',
      location: 'University District',
      price: 800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      amenities: ['wifi', 'meals'],
      availableRooms: 3
    },
    {
      id: 3,
      name: 'City Center Lodge',
      location: 'City Center',
      price: 1500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['wifi', 'parking', 'meals', 'gym'],
      availableRooms: 8
    }
  ];

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    meals: Coffee
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Hostel</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by location, name, or amenities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Prices</option>
              <option value="0-1000">Under ₹1,000</option>
              <option value="1000-1500">₹1,000 - ₹1,500</option>
              <option value="1500+">Above ₹1,500</option>
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Ratings</option>
              <option value="4+">4+ Stars</option>
              <option value="3+">3+ Stars</option>
            </select>
          </div>
        </div>

        {/* Hostel Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <div key={hostel.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{hostel.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{hostel.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{hostel.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-indigo-600">
                    ₹{hostel.price}<span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {hostel.availableRooms} rooms available
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {hostel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return Icon ? (
                      <div key={amenity} className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                    ) : null;
                  })}
                </div>

                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelList;