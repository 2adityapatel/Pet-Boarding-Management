import React, { useState ,useEffect , createContext} from 'react';
import { NavLink, Outlet ,useNavigate} from 'react-router-dom';
import { Menu, X, Home, Calendar, LogOut } from 'lucide-react';
import axios from 'axios';

// Create contexts
export const BookingsContext = createContext();
export const PetsContext = createContext();
export const UsersContext = createContext();
export const FacilitiesContext = createContext();

const AdminPanelLayout = () => {
  const [bookings, setBookings] = useState([]);
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}` // Adjust this based on your authentication setup
        };
        
        const [bookingsResponse, petsResponse, usersResponse, facilitiesResponse] = await Promise.all([
          axios.get('http://localhost:5000/admin/bookings', { headers }),
          axios.get('http://localhost:5000/admin/pets', { headers }),
          axios.get('http://localhost:5000/admin/users', { headers }),
          axios.get('http://localhost:5000/admin/facilities', { headers })
        ]);

        setBookings(bookingsResponse.data);
        setPets(petsResponse.data);
        setUsers(usersResponse.data);
        setFacilities(facilitiesResponse.data);
        console.log(bookingsResponse.data);
        console.log(petsResponse.data);
        console.log(usersResponse.data);
        console.log(facilitiesResponse.data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Remove token and logout user
    localStorage.removeItem('token');
    setBookings({});
    setFacilities({});
    setUsers({})
    setPets({}) 
    navigate('/login'); 
  };

  return (
    <BookingsContext.Provider value={{ bookings, setBookings }}>
      <PetsContext.Provider value={{ pets, setPets }}>
        <UsersContext.Provider value={{ users, setUsers }}>
          <FacilitiesContext.Provider value={{ facilities, setFacilities }}>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0 mt-16' : '-translate-x-full '} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Panel</h2>
        <nav>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            <Home className="inline-block mr-2" size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            <Calendar className="inline-block mr-2" size={20} /> Bookings
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-lg p-4 z-30 relative">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden z-30 relative"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center">
              <span className="text-gray-700 text-lg font-semibold">Welcome, Admin</span>
              <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <LogOut size={20} className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Outlet />
        </main>
      </div>
    </div>
    </FacilitiesContext.Provider>
        </UsersContext.Provider>
      </PetsContext.Provider>
    </BookingsContext.Provider>
  );
};

export default AdminPanelLayout;
