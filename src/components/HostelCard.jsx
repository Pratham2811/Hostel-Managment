import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Users, 
  Wifi, 
  Car, 
  Coffee,
  Shield,
  Heart
} from 'lucide-react';
import Button from './common/Button';

const HostelCard = ({ hostel, showActions = false, onEdit, onDelete, onUpdateVacancy }) => {
  const {
    id,
    name,
    location,
    price,
    rating,
    reviews,
    capacity,
    available,
    image,
    amenities = [],
    gender,
    status = 'approved'
  } = hostel;

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

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'cafeteria':
        return <Coffee className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            {gender === 'male' ? 'Boys' : gender === 'female' ? 'Girls' : 'Co-ed'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
          </div>
          <span className="text-gray-500 text-sm ml-2">({reviews} reviews)</span>
        </div>

        {/* Capacity and Availability */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>{available}/{capacity} available</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">₹{price}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            {amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-600"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {amenities.length > 4 && (
              <span className="text-xs text-gray-500">+{amenities.length - 4} more</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {showActions ? (
            <>
              <Button size="sm" onClick={() => onEdit?.(hostel)} className="flex-1">
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onUpdateVacancy?.(hostel)}
                className="flex-1"
              >
                Update Vacancy
              </Button>
              <Button 
                size="sm" 
                variant="danger" 
                onClick={() => onDelete?.(hostel)}
              >
                Delete
              </Button>
            </>
          ) : (
            <Link to={`/hostels/${id}`} className="w-full">
              <Button className="w-full">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelCard;