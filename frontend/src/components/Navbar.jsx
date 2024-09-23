import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './Layout'; // Assuming UserContext holds authentication state

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and logout user
    localStorage.removeItem('token');
    setUser({}); 
    navigate('/login'); 
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img className="h-9 w-auto" src="https://cdn-icons-png.flaticon.com/512/1596/1596810.png" alt="PawSpace" />
              </Link>
            </div>

            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/booking"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  Booking
                </Link>
                <Link
                  to="/pet-profile"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  Pet Profile
                </Link>
                <Link
                  to="/user"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  User
                </Link>
              </div>
            )}
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <>
                <span className="text-gray-700 font-medium mr-4">
                  Welcome, {user.username}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;