import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const BookingsDisplay = ({ bookings, pets, facilities }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No bookings found.</p>
      </div>
    );
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 font-semibold">
          <div>Booking ID</div>
          <div>Pet Name</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {bookings.map((booking) => {
          const pet = pets.find(p => p._id === booking.petId._id);
          
          return (
            <div key={booking._id} className="grid grid-cols-4 gap-4 p-4 border-b items-center">
              <div className="text-sm text-gray-600">{booking._id}</div>
              <div>{pet ? pet.name : 'Unknown'}</div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${booking.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    booking.status === 'cancelled' ? 'bg-red-200 text-red-800' :
                    'bg-blue-200 text-blue-800'}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleViewDetails(booking)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Eye size={16} className="mr-1" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold">Booking Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="font-semibold mb-2">Booking Information</h4>
              <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Start Date:</strong> {new Date(selectedBooking.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(selectedBooking.endDate).toLocaleDateString()}</p>
              <p><strong>Special Requirements:</strong> {selectedBooking.specialRequirements || 'None'}</p>

              <h4 className="font-semibold mt-4 mb-2">Pet Information</h4>
              {pets.find(p => p._id === selectedBooking.petId._id) ? (
                <div>
                  <p><strong>Name:</strong> {pets.find(p => p._id === selectedBooking.petId._id).name}</p>
                  <p><strong>Species:</strong> {pets.find(p => p._id === selectedBooking.petId._id).species}</p>
                  <p><strong>Breed:</strong> {pets.find(p => p._id === selectedBooking.petId._id).breed}</p>
                </div>
              ) : (
                <p>Pet information not available</p>
              )}

              <h4 className="font-semibold mt-4 mb-2">Facility Information</h4>
              {facilities.find(f => f._id === selectedBooking.facilityId._id) ? (
                <div>
                  <p><strong>Name:</strong> {facilities.find(f => f._id === selectedBooking.facilityId._id).name}</p>
                  <p><strong>Address:</strong> {facilities.find(f => f._id === selectedBooking.facilityId._id).address}</p>
                </div>
              ) : (
                <p>Facility information not available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsDisplay;