import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import BookingsDisplay from './BookingDisplay';
import UserProfile from './UserProfile';
import { FacilityContext, UserContext } from './Layout';

function User() {
  const [bookings, setBookings] = useState([]);
  const [pets, setPets] = useState([]);
  const {facilities } = useContext(FacilityContext)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!user || !user._id) return;

      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const userId = user._id;

      try {
        const [bookingsRes, petsRes] = await Promise.all([
          axios.get(`http://localhost:5000/bookings/${userId}`, { headers }),
          axios.get(`http://localhost:5000/users/${userId}/pets`, { headers }),
        ]);

        if (isMounted) {
            console.log(bookingsRes.data);
            console.log(petsRes.data);
            console.log(facilities);
            
          setBookings(bookingsRes.data);
          setPets(petsRes.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('An error occurred while fetching data. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?._id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <UserProfile user={user} />
      <BookingsDisplay bookings={bookings} pets={pets} facilities={facilities} />
    </div>
  );
}

export default User;