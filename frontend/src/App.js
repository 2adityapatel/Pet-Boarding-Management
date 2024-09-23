import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetProfiles from "./components/PetProfiles";
import PetCard from "./components/PetCard";
import Layout from "./components/Layout";
import { LoginPage, SignupPage } from "./components/AuthPages";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./components/UserProfile";
import Bookings from "./components/Bookings";
import User from "./components/User";
import AdminPanelLayout from "./components/admin/AdminPanel";
import AdminHandleBookings from "./components/admin/AdminHandleBookings";
import Dashboard from "./components/admin/Dashboard";
import HomePage from "./components/LandingPage/HomePage";

function App() {
  return (
    <div className="App">
      {/* <h1 className="text-4xl p-6 m-6 inline-block border-fuchsia-900 border-4 font-bold text-red-400 ">
      Hello world!
    </h1> */}
      {/* <PetProfile/> */}
      {/* <PetProfiles/> */}
      {/* <PetCard/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path=""
              element={
                <ProtectedRoute requiredRole="USER">
                  <HomePage/>
                </ProtectedRoute>
              }
            />
             <Route
              path="pet-profile"
              element={
                <ProtectedRoute requiredRole="USER">
                  <PetProfiles/>
                </ProtectedRoute>
              }
            />
            <Route
              path="user"
              element={
                <ProtectedRoute requiredRole="USER">
                  <User/>
                </ProtectedRoute>
              }
            />

            <Route  
              path="booking"
              element={
                <ProtectedRoute requiredRole="USER">
                  <Bookings/>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/admin" element={<AdminPanelLayout />}>

          <Route index element={
            <ProtectedRoute requiredRole="ADMIN">
              <Dashboard />
            </ProtectedRoute>} />
          <Route path="bookings" element={
            <ProtectedRoute requiredRole="ADMIN">
            <AdminHandleBookings/>
            </ProtectedRoute>} />
        </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
