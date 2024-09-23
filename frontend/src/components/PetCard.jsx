// PetCard.jsx
import React from 'react';
import {  User, Calendar } from 'react-feather';
import { Link } from 'react-router-dom';
import { MdPets as Paw } from 'react-icons/md';  // For a paw icon



const pet = {
    _id: "60d5ecb8b98c7a2b9cfa6e8f",
    userId: {
      _id: "60d5ec98b98c7a2b9cfa6e8e",
      firstName: "John",
      lastName: "Doe"
    },
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: 5,
    weight: 30,
    gender: "Male",
    microchipNumber: "985141000123456",
    medicalRecords: [
      {
        _id: "60d5ecf0b98c7a2b9cfa6e90",
        recordType: "Vaccination",
        date: new Date("2023-05-15"),
        description: "Annual vaccinations",
        veterinarian: "Dr. Smith"
      },
      {
        _id: "60d5ed10b98c7a2b9cfa6e91",
        recordType: "Check-up",
        date: new Date("2023-03-01"),
        description: "Routine health check",
        veterinarian: "Dr. Johnson"
      }
    ],
    createdAt: new Date("2023-01-01T10:00:00Z"),
    updatedAt: new Date("2023-06-15T14:30:00Z")
  };


const PetCard = () => {
  return (
    <div className="bg-orange-200 rounded-lg shadow-md p-6 max-w-sm mx-auto">
      <div className="flex items-center mb-6">
        <div className="mr-6">
          <Paw className="text-orange-500" size={60} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-2">{pet.name}</h2>
          <p className="flex items-center text-gray-600 mb-2">
            <Paw className="mr-2 text-orange-500" size={16} />
            {pet.species}, {pet.breed}
          </p>
          <p className="flex items-center text-gray-600">
            <User className="mr-2 text-orange-500" size={16} />
            {pet.age} years old
          </p>
        </div>
      </div>
      <div className="mt-4">
        {/* <Link to={`/pet/${pet._id}`} className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
          View Details
        </Link> */}
        <p className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
          View Details
        </p>
      </div>
    </div>
  );
};

export default PetCard;