import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import MedicalShopDashboard from './components/MedicalShopDashboard.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import Login from './components/Login.jsx';
import RecipientDashboard from './components/RecipientDashboard.jsx';
import Registration from './components/Registration.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<App />} />
        <Route path="/medical-shop-dashboard" element={<MedicalShopDashboard />} />
        <Route path="/registaion" element={<Registration/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Donor" element={<DonorDashboard />} />
        <Route path="/recipientdeshboard" element={<RecipientDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);