// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useAdminBookingsData = () => {
//   const [bookings, setBookings] = useState([]);
//   const [pets, setPets] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [facilities, setFacilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const headers = {Authorization : `Bearer ${token}`}

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [bookingsResponse, petsResponse, usersResponse, facilitiesResponse] = await Promise.all([
//           axios.get('http://localhost:8000/admin/bookings' , {headers}),
//           axios.get('http://localhost:8000/admin/pets',{headers}),
//           axios.get('http://localhost:8000/admin/users',{headers}),
//           axios.get('http://localhost:8000/admin/facilities',{headers})
//         ]);

//         setBookings(bookingsResponse.data);
//         setPets(petsResponse.data);
//         setUsers(usersResponse.data);
//         setFacilities(facilitiesResponse.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const refetchBookings = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/admin/bookings',{
//         headers
//       });
//       setBookings(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return { bookings, pets, users, facilities, loading, error, refetchBookings };
// };

// export default useAdminBookingsData;