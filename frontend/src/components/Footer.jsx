import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PawSpace</h3>
            <ul className="space-y-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/booking">Booking</Link></li>
              <li><Link to="/pet-profile">Pet Profile</Link></li>
              <li><Link to="/user">User</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: info@pawspace.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Main St, Anytown USA</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          &copy; {new Date().getFullYear()} PawSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;