import React from 'react';
import { FileText } from 'lucide-react';

const PetBookingSection = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 bg-orange-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Manage Your Pet's Stay
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 max-w-md">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-center">Book Your Pet's Stay</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="petName" className="block mb-2 font-semibold">
                    Pet's Name
                  </label>
                  <input
                    type="text"
                    id="petName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block mb-2 font-semibold">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endDate" className="block mb-2 font-semibold">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-center">Manage Pet Profiles</h3>
              <p className="mb-4 text-center">
                Keep your pet's information up to date for the best care experience.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FileText className="mr-2 text-orange-600" size={20} />
                  <span>Update medical records</span>
                </li>
                <li className="flex items-center">
                  <FileText className="mr-2 text-orange-600" size={20} />
                  <span>Add vaccination history</span>
                </li>
                <li className="flex items-center">
                  <FileText className="mr-2 text-orange-600" size={20} />
                  <span>Set dietary requirements</span>
                </li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">
                Manage Profiles
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetBookingSection;