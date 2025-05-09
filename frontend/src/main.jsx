// 

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import MedicalShopDashboard from "./components/MedicalShopDashboard.jsx";
import DonorDashboard from "./components/DonorDashboard.jsx";
import Login from "./components/Login.jsx";
import RecipientDashboard from "./components/RecipientDashboard.jsx";
import Registration from "./components/Register.jsx";
import FindDonor from "./components/FindDonor.jsx";
import SetLocation from "./components/SetLocation.jsx";
import AboutUs from "./components/AboutUs.jsx";
import BuyMedicine from "./components/BuyMedicine.jsx";
import BeADonorPage from "./components/BeADonorPage.jsx";
import MedicineExchangePage from "./components/ExchangeMed.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<App isLoggedIn={false} />} />

        {/* Authentication */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/:username/recipient-dashboard" element={<RecipientDashboard />} />
        <Route path="/:username/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/:username/medical-shop-dashboard" element={<MedicalShopDashboard />} />

        {/* Other Pages */}
        <Route path="/:username/find-donor" element={<FindDonor />} />
        <Route path="/set-location" element={<SetLocation />} />
        <Route path="/:username/about" element={<AboutUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/:username" element={<App />} />
        <Route path="/:username/buy-medicine" element={<BuyMedicine />} />
        <Route path="/:username/be-a-donor" element={<BeADonorPage />} />
        <Route path="/:username/medicine-exchange" element={<MedicineExchangePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
