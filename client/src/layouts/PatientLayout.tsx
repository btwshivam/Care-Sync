import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SimpleLogoutButton from "../components/SimpleLogoutButton";
import { Routes, Route, useNavigate } from "react-router-dom";
import PatientHistory from '../pages/Patient/PatientHistory';
import PatientProfile from '../pages/Patient/PatientProfile';
import Map from '../pages/Patient/Map';
import PatientNotification from '../pages/Patient/PatientNotification';

const PatientLayout: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!token || !userString || role !== 'Patient') {
      navigate('/login');
    }
  }, [navigate]);

  const patientLinks = [
    { name: 'Map', path: '/patient/map' },
    { name: 'Medical History', path: '/patient/medical-history' },
    { name: 'Profile', path: '/patient/profile' },
    { name: 'Notification', path: '/patient/notification' },
  ];

  return (
    <div className="flex w-full">
      <Sidebar links={patientLinks} />
      <div className='w-full overflow-y-scroll h-screen pt-10 sm:pt-0 bg-gray-900'>
        <SimpleLogoutButton />
        <Routes>
          <Route path="map" element={<Map/>} />
          <Route path="medical-history" element={<PatientHistory/>} />
          <Route path="profile" element={<PatientProfile/>} />
          <Route path="notification" element={<PatientNotification/>} />
        </Routes>
      </div>
    </div>
  );
};

export default PatientLayout;
