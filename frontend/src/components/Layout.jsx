import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const UserContext = createContext();
const FacilityContext = createContext();

function Layout() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [facilities, setFacilities] = useState([]);
 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        const facilityRes = await axios.get(
          "http://localhost:5000/facilities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFacilities(facilityRes.data);
       
        
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchUserData();
   
  }, [setUser, setFacilities]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <FacilityContext.Provider value={{ facilities }}>
            <Navbar />
            <Outlet />        
            <Footer />
        </FacilityContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default Layout;
export { UserContext, FacilityContext};
