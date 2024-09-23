import React, { useState, useEffect, useContext } from 'react';
import { Plus, Eye, Edit2, Trash2, FileText, Save ,X as XIcon} from 'lucide-react';
import axios from 'axios';
import { UserContext } from './Layout';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const PetProfile = ({ pet, onEdit, onDelete ,onAddMedicalRecord}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState(pet);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    setEditedPet(pet);
  }, [pet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPet({ ...editedPet, [name]: value });
  };

  const handleNameChange = (e) => {
    setEditedPet({ ...editedPet, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedPet);
    setIsEditing(false);
  };

  const handleEditRecord = (record) => {
    setEditingRecord({ ...record });
  };
  
  const handleSaveRecord = () => {
    const updatedRecords = editedPet.medicalRecords.map(r => 
      r.id === editingRecord.id ? editingRecord : r
    );
    setEditedPet({ ...editedPet, medicalRecords: updatedRecords });
    setEditingRecord(null);
    onEdit({ ...editedPet, medicalRecords: updatedRecords });
  };
  
  const handleDeleteRecord = (recordId) => {
    const updatedRecords = editedPet.medicalRecords.filter(r => r.id !== recordId);
    setEditedPet({ ...editedPet, medicalRecords: updatedRecords });
    onEdit({ ...editedPet, medicalRecords: updatedRecords });
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-6 m-6 relative overflow-hidden">
      {/* <svg className="absolute top-0 right-0 w-24 h-24 text-orange-400 transform translate-x-1/3 -translate-y-1/3" viewBox="0 0 100 100">
        <path d="M0,100 C30,90 70,90 100,100 C90,70 90,30 100,0 C70,10 30,10 0,0 C10,30 10,70 0,100 Z" fill="currentColor" />
      </svg> */}

      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
          {isEditingName ? (
            <input
              type="text"
              value={editedPet.name}
              onChange={handleNameChange}
              className="text-2xl font-bold text-orange-500 bg-transparent border-none"
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <h2
              className="text-2xl font-bold text-orange-500 cursor-pointer"
              onClick={() => setIsEditingName(true)}
            >
              {editedPet.name}
            </h2>
          )}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300 z-10"
          >
            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
          </button>
          <button
            onClick={() => onDelete(pet._id)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300 z-10"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Species', name: 'species' },
            { label: 'Breed', name: 'breed' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Weight', name: 'weight', type: 'number' },
            { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female'] },
            { label: 'Microchip Number', name: 'microchipNumber' },
          ].map((field) => (
            <div key={field.name} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              {isEditing ? (
                field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={editedPet[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={editedPet[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                )
              ) : (
                <p className="text-gray-600 bg-white p-2 rounded-md shadow-sm">
                  {pet[field.name]} {field.name === 'age' ? 'years' : field.name === 'weight' ? 'kg' : ''}
                </p>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            type="submit"
            className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Save Changes
          </button>
        )}
      </form>

      <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-orange-500">Medical Records</h3>
          <button
            onClick={() => onAddMedicalRecord(pet)}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-300"
          >
            <Plus size={20} />
          </button>
        </div>
        <ul className="space-y-2">
          {editedPet.medicalRecords.map((record) => (
            <li key={record.id} className="bg-white p-3 rounded-md shadow-sm">
              {editingRecord && editingRecord.id === record.id ? (
                <div className="space-y-2">
                  <input
                    value={editingRecord.recordType}
                    onChange={(e) => setEditingRecord({...editingRecord, recordType: e.target.value})}
                    className="w-full p-1 border rounded"
                  />
                  <input
                    type="date"
                    value={editingRecord.date}
                    onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})}
                    className="w-full p-1 border rounded"
                  />
                  <textarea
                    value={editingRecord.description}
                    onChange={(e) => setEditingRecord({...editingRecord, description: e.target.value})}
                    className="w-full p-1 border rounded"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={handleSaveRecord} className="bg-green-500 text-white p-1 rounded">
                      <Save size={16} />
                    </button>
                    <button onClick={() => setEditingRecord(null)} className="bg-gray-500 text-white p-1 rounded">
                      <XIcon size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-semibold">{record.recordType} - {new Date(record.date).toLocaleDateString()}</div>
                  <p className="text-gray-600">{record.description}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => handleEditRecord(record)} className="text-blue-500 hover:text-blue-700">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteRecord(record.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PetProfiles = () => {

  const {user} = useContext(UserContext)

  const [pets, setPets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddMedicalRecordModalOpen, setIsAddMedicalRecordModalOpen] = useState(false);
  const [err,setError] = useState("")
  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    gender: '',
    microchipNumber: '',
    medicalRecords: [],
  });
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    recordType: '',
    date: '',
    description: '',
    veterinarian: '',
    file: null,
  });
  const [selectedPetForMedicalRecord, setSelectedPetForMedicalRecord] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('token');
      const userId = user._id
      
      if (token) {
        try {
          const response = await axios.get(`http://localhost:5000/users/${userId}/pets`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPets(response.data);
        } catch (error) {
          setError(error.response?.data?.message || "An error occurred");
        }
      }
    };
  
    fetchPets();
  }, [user._id]);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  const handleMedicalRecordInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setNewMedicalRecord({ ...newMedicalRecord, [name]: files[0] });
    } else {
      setNewMedicalRecord({ ...newMedicalRecord, [name]: value });
    }
  };

  const handleAddPet = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost:5000/pets', { ...newPet, userId: user._id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets([...pets, response.data]);
        setNewPet({
          name: '',
          species: '',
          breed: '',
          age: '',
          weight: '',
          gender: '',
          microchipNumber: '',
          medicalRecords: [],
        });
        setIsAddModalOpen(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    }
  };
  
  const handleUpdatePet = async (updatedPet) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.put(`http://localhost:5000/pets/${updatedPet._id}`, updatedPet, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets(pets.map(p => p._id === response.data._id ? response.data : p));
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    }
  };
  

  const handleDeletePet = async (petId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Send the delete request
        const response = await axios.delete(`http://localhost:5000/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setPets(pets.filter(p => p._id !== petId));
        } else {
          setError("Failed to delete the pet.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    }
  };
  
  const handleAddMedicalRecord = () => {
    const newRecord = { ...newMedicalRecord, id: Date.now() };
    const updatedPets = pets.map(pet => {
      if (pet.id === selectedPetForMedicalRecord.id) {
        return {
          ...pet,
          medicalRecords: [...pet.medicalRecords, newRecord]
        };
      }
      return pet;
    });
    setPets(updatedPets);
    setNewMedicalRecord({
      recordType: '',
      date: '',
      description: '',
      veterinarian: '',
      file: null,
    });
    setIsAddMedicalRecordModalOpen(false);
    setSelectedPetForMedicalRecord(null);
  };

  const handleAddMedicalRecordClick = (pet) => {
    setSelectedPetForMedicalRecord(pet);
    setIsAddMedicalRecordModalOpen(true);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Pet Profiles</h1>
      
      <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-center">
        <p className="text-lg text-gray-600">
          {pets.length === 0 ? "No pets added yet" : `You have ${pets.length} pet(s)`}
        </p>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Plus className="mr-2" /> Add Your Pet
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pets.map(pet => (
          <PetProfile
            key={pet._id}
            pet={pet}
            onEdit={handleUpdatePet}
            onDelete={handleDeletePet}
            onAddMedicalRecord={handleAddMedicalRecordClick}
          />
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Pet"
      >
        <form onSubmit={e => { e.preventDefault(); handleAddPet(); }}>
          <div className="space-y-4">
            <input
              name="name"
              value={newPet.name}
              onChange={handleInputChange}
              placeholder="Pet Name"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="species"
              value={newPet.species}
              onChange={handleInputChange}
              placeholder="Species"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="breed"
              value={newPet.breed}
              onChange={handleInputChange}
              placeholder="Breed"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="age"
              type="number"
              value={newPet.age}
              onChange={handleInputChange}
              placeholder="Age"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="weight"
              type="number"
              value={newPet.weight}
              onChange={handleInputChange}
              placeholder="Weight (kg)"
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="gender"
              value={newPet.gender}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              name="microchipNumber"
              value={newPet.microchipNumber}
              onChange={handleInputChange}
              placeholder="Microchip Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Pet
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isAddMedicalRecordModalOpen}
        onClose={() => {
          setIsAddMedicalRecordModalOpen(false);
          setSelectedPetForMedicalRecord(null);
        }}
        title="Add Medical Record"
      >
        <form onSubmit={e => { e.preventDefault(); handleAddMedicalRecord(); }}>
          <div className="space-y-4">
            <input
              name="recordType"
              value={newMedicalRecord.recordType}
              onChange={handleMedicalRecordInputChange}
              placeholder="Record Type (e.g., Vaccination, Check-up)"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="date"
              type="date"
              value={newMedicalRecord.date}
              onChange={handleMedicalRecordInputChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="description"
              value={newMedicalRecord.description}
              onChange={handleMedicalRecordInputChange}
              placeholder="Description"
              required
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
            <input
              name="veterinarian"
              value={newMedicalRecord.veterinarian}
              onChange={handleMedicalRecordInputChange}
              placeholder="Veterinarian"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              name="file"
              onChange={handleMedicalRecordInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Medical Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PetProfiles;