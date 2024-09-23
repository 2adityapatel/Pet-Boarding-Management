import React, { useState, useEffect, useContext } from "react";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { FacilityContext, UserContext } from "./Layout";
import axios from "axios";

const Modal = ({ isOpen, onClose, title, message, isError }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2
          className={`text-2xl font-bold mb-4 ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {title}
        </h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const BookingForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState([]);
  const [facilityId, setFacilityId] = useState("");
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const { facilities } = useContext(FacilityContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPets = async () => {
      const userId = user._id;

      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${userId}/pets`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPets(response.data);
        } catch (error) {
          setError(error.response?.data?.message || "An error occurred");
          setShowErrorModal(true);
        }
      }
    };

    fetchPets();
  }, [user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/booking",
        {
          petId,
          userId: user._id,
          startDate,
          endDate,
          specialRequirements,
          facilityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking successful:", response.data);
      // Handle successful booking
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Booking failed:", error);
      setError(error.response?.data?.message || "An error occurred");
      setShowErrorModal(true);
    }
  };

  const resetForm = () => {
    setPetId("");
    setEndDate("");
    setStartDate("");
    setSpecialRequirements("");
    setFacilityId("");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row items-stretch bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 bg-orange-500">
          <h2 className="text-3xl font-bold text-white mb-6">
            Book Your Pet's Stay
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <select
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>
                  Select Your Pet
                </option>
                {pets.map((pet) => (
                  <option key={pet._id} value={pet._id}>
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Calendar
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="relative">
              <Calendar
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="relative">
              <MessageSquare
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <textarea
                placeholder="Special Requirements"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
              />
            </div>
            <div>
              <select
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>
                  Select a Facility
                </option>
                {/* Add options dynamically based on available facilities */}
                {facilities.map((facility) => (
                  <option key={facility._id} value={facility._id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-md hover:bg-orange-100 transition duration-300"
            >
              Book Now
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-gray-100 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Why Choose Our Pet Boarding?
          </h3>
          <div className="space-y-6">
            <FeatureItem
              icon={
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/869/391/non_2x/family-house-glyph-icon-warm-comfort-and-safe-residence-silhouette-symbol-house-with-heart-inside-negative-space-isolated-illustration-free-vector.jpg"
                  alt="Comfortable Accommodations"
                  className="w-12 h-12"
                />
              }
              title="Comfortable Accommodations"
              description="Spacious, climate-controlled rooms designed for your pet's comfort and safety."
            />
            <FeatureItem
              icon={
                <img
                  src="https://t4.ftcdn.net/jpg/04/47/07/29/360_F_447072959_f1hJlfgozoXVcltWFPTcq60428kk78RI.jpg"
                  alt="24/7 Supervision"
                  className="w-12 h-12"
                />
              }
              title="24/7 Supervision"
              description="Our experienced staff provides round-the-clock care and attention to your pet."
            />
            <FeatureItem
              icon={
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSBVB3wiO1H19MsATtnX9shg3ajr0sTP3pKQ&s"
                  alt="Personalized Care"
                  className="w-12 h-12"
                />
              }
              title="Personalized Care"
              description="We cater to your pet's individual needs, including dietary requirements and exercise routines."
            />
            <FeatureItem
              icon={
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6btsXTwueH7IEMac3PzDsGOQMnnl1vNm7RA&s"
                  alt="Safe Environment"
                  className="w-12 h-12"
                />
              }
              title="Safe Environment"
              description="Our facilities are secure, sanitized, and designed with your pet's safety in mind."
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Booking Successful"
        message="Your pet's stay request has been sent. For furthur check profile. "
        isError={false}
      />

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message={errorMessage}
        isError={true}
      />
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default BookingForm;

/*

*/
