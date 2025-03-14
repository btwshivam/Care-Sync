import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SimpleLogoutButton from "../components/SimpleLogoutButton";
import { Routes, Route, useNavigate } from "react-router-dom";
import DoctorProfile from "../pages/Doctor/DoctorProfile";
import DoctorNotification from "../pages/Doctor/DoctorNotification";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";

const DoctorLayout: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!token || !userString || role !== 'Doctor') {
      navigate('/login');
    }
  }, [navigate]);

  const doctorLinks = [
    { name: "Appointment", path: "/doctor/appointment" },
    { name: "Notification", path: "/doctor/notification" },
    { name: "Profile", path: "/doctor/profile" },
  ];

  return (
    <div className="flex">
      <Sidebar links={doctorLinks} />
      <div className="flex-1 overflow-y-scroll h-screen pt-10 sm:pt-0 bg-gray-900">
        <SimpleLogoutButton />
        <Routes>
          <Route path="appointment" element={<DoctorAppointment />} />
          <Route path="notification" element={<DoctorNotification />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorLayout;
