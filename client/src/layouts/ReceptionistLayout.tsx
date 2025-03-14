import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import ReceptionistRegistration from '../pages/Receptionist/ReceptionistRegistration';

const ReceptionistLayout: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!token || !userString || role !== 'Receptionist') {
      navigate('/login');
    }
  }, [navigate]);

  const initialRegistrations = [
    {
      name: "Saswat Kumar Dash",
      date: "10/10/2024",
      gender: "female",
      register: "10:30 a.m.",
      visit: "10:30 a.m.",
    },
    // Other entries...
  ];

  const receptionistLinks = [
    { name: 'Dashboard', path: '/receptionist/dashboard' },
  ];

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader title="Receptionist Dashboard" role="Receptionist" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar links={receptionistLinks} />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="dashboard" element={<ReceptionistRegistration registrations={initialRegistrations} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
