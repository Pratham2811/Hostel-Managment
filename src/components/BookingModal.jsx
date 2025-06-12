import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard, Clock } from 'lucide-react';
import Button from './common/Button';
import Input from './common/Input';

const BookingModal = ({ isOpen, onClose, hostel, onBooking }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    duration: '1',
    occupants: '1',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const duration = parseInt(bookingData.duration);
    const basePrice = hostel?.price || 0;
    const subtotal = basePrice * duration;
    const tax = subtotal * 0.18; // 18% GST
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const booking = {
        id: Date.now().toString(),
        hostelId: hostel.id,
        hostelName: hostel.name,
        ...bookingData,
        ...calculateTotal(),
        status: 'pending',
        bookingDate: new Date().toISOString()
      };
      
      onBooking?.(booking);
      onClose();
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const pricing = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Book Your Stay</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hostel Info */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <img
              src={hostel?.image || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'}
              alt={hostel?.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{hostel?.name}</h3>
              <p className="text-gray-600 text-sm">{hostel?.location}</p>
              <p className="text-blue-600 font-semibold">₹{hostel?.price}/month</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Check-in Date */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                Check-in Date
              </label>
              <input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                Duration (months)
              </label>
              <select
                value={bookingData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 6, 12].map(month => (
                  <option key={month} value={month}>
                    {month} {month === 1 ? 'month' : 'months'}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Occupants */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 mr-2" />
                Number of Occupants
              </label>
              <select
                value={bookingData.occupants}
                onChange={(e) => handleInputChange('occupants', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows="3"
                placeholder="Any special requirements or requests..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Price Breakdown
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>₹{hostel?.price} x {bookingData.duration} months</span>
                <span>₹{pricing.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{pricing.tax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{pricing.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !bookingData.checkIn}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;