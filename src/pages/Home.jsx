import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Shield, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-indigo-600 block">Hostel Stay</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover comfortable, affordable hostels with verified owners and seamless booking experience. 
              Your next adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HostelHub?</h2>
            <p className="text-lg text-gray-600">Everything you need for a perfect hostel experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Building2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Verified Hostels</h3>
              <p className="text-gray-600">All hostels are verified and approved by our admin team for quality assurance</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure booking process with instant confirmation</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-600">Your data and payments are protected with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">Join thousands of travelers who trust HostelHub</p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;