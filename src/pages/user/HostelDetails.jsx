import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Coffee, Users, Calendar, Phone, Mail } from 'lucide-react';

const HostelDetails = () => {
  const { id } = useParams();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data - replace with actual API call
  const hostel = {
    id: 1,
    name: 'Sunrise Hostel',
    location: 'Downtown Area, City Center',
    price: 1200,
    rating: 4.5,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['wifi', 'parking', 'meals', 'laundry'],
    availableRooms: 5,
    description: 'A comfortable and modern hostel located in the heart of the city. Perfect for students and young professionals looking for affordable accommodation with all necessary amenities.',
    rules: [
      'No smoking inside the premises',
      'Quiet hours from 10 PM to 7 AM',
      'Visitors allowed until 9 PM',
      'Keep common areas clean'
    ],
    owner: {
      name: 'John Doe',
      phone: '+91 9876543210',
      email: 'john@example.com'
    }
  };

  const amenityIcons = {
    wifi: { icon: Wifi, label: 'Free WiFi' },
    parking: { icon: Car, label: 'Parking' },
    meals: { icon: Coffee, label: 'Meals Included' },
    laundry: { icon: Users, label: 'Laundry Service' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img
              src={hostel.images[0]}
              alt={hostel.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {hostel.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${hostel.name} ${index + 2}`}
                className="w-full h-44 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{hostel.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-lg font-semibold">{hostel.rating}</span>
                    <span className="ml-2 text-gray-500">(24 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600">
                    ₹{hostel.price}
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{hostel.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hostel.amenities.map((amenity) => {
                  const amenityData = amenityIcons[amenity];
                  return amenityData ? (
                    <div key={amenity} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <amenityData.icon className="w-5 h-5 text-indigo-600 mr-3" />
                      <span className="text-sm font-medium">{amenityData.label}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Hostel Rules</h2>
              <ul className="space-y-2">
                {hostel.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  ₹{hostel.price}/month
                </div>
                <div className="text-green-600 font-medium">
                  {hostel.availableRooms} rooms available
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-4"
              >
                Book Now
              </button>

              <div className="text-center text-sm text-gray-500">
                Free cancellation within 24 hours
              </div>
            </div>

            {/* Owner Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="font-medium">{hostel.owner.name}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{hostel.owner.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{hostel.owner.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (months)
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="1">1 month</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold text-indigo-600">₹{hostel.price}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelDetails;