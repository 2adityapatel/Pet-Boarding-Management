import React, { useContext, useState } from 'react';
import { Eye, X, Check, X as XIcon } from 'lucide-react';
import { BookingsContext, FacilitiesContext, PetsContext, UsersContext } from './AdminPanel';
import axios from 'axios';

const AdminBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { facilities } = useContext(FacilitiesContext);
  const { bookings , setBookings } = useContext(BookingsContext);
  const { pets } = useContext(PetsContext);
  const [error, setError] = useState(null);
  const { users } = useContext(UsersContext);

  const handleBooking = async (bookingId, status) => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.put('http://localhost:5000/admin/bookings/update-status', { bookingId, status },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        setSelectedBooking(prev => prev ? { ...prev, status } : null);
        // Update the bookings state to reflect the change
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId ? { ...booking, status } : booking
          )
        );
        console.log(`Booking ${bookingId} updated to ${status}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError('An error occurred while updating the booking status. Please try again.');
    }
  };

  const closeModal = () => setSelectedBooking(null);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Bookings</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => {
                const pet = pets.find(p => p._id === booking.petId._id);
                const user = users.find(u => u._id === booking.userId._id);
                return (
                  <tr key={booking._id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{booking._id.slice(-4)}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user ? `${user.firstName} ${user.lastName}` : 'Unknown'}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet ? `${pet.name} (${pet.species})` : 'Unknown'}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <Eye size={16} className="mr-1" />
                        Handle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-semibold">Booking Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 sm:p-6">
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

              <h4 className="font-semibold mt-4 mb-2">User Information</h4>
              {users.find(u => u._id === selectedBooking.userId._id) ? (
                <div>
                  <p><strong>Name:</strong> {`${users.find(u => u._id === selectedBooking.userId._id).firstName} ${users.find(u => u._id === selectedBooking.userId._id).lastName}`}</p>
                  <p><strong>Email:</strong> {users.find(u => u._id === selectedBooking.userId._id).email}</p>
                  <p><strong>Phone:</strong> {users.find(u => u._id === selectedBooking.userId._id).phone}</p>
                </div>
              ) : (
                <p>User information not available</p>
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

              {selectedBooking.status === 'pending' && (
                <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => handleBooking(selectedBooking._id, 'confirmed')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                  >
                    <Check size={16} className="mr-2" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleBooking(selectedBooking._id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                  >
                    <XIcon size={16} className="mr-2" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminBookings;