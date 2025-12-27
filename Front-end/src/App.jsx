import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage.jsx";
import Signuppage from "./Component/Signuppage.jsx";
import Loginpage from "./Component/Loginpage.jsx";
 import DashboardPage from "./Component/DashboardPage.jsx";
import MaintenancePage from "./Component/MaintenancePage.jsx";
import MaintenanceDetailPage from "./Component/MaintenanceDetailPage";
import ForgotPassword from "./Component/ForgotPassword.jsx";
import WorkCenterPage from "./Component/WorkCenterPage.jsx";
import TeamsPage from "./Component/TeamsPage.jsx";
import EquipmentPage from "./Component/EquipmentPage.jsx";
import WorkCenterPageall from "./Component/WorkCenterPageAll.jsx";
import TeamsPageall from "./Component/TeamsPageall.jsx";

export default function App() {
  return (
    <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path='/signuppage' element={<Signuppage />} />
        <Route path='/loginpage' element={<Loginpage />} />
         <Route path='/dashboard' element={<DashboardPage />} /> 
        <Route path='/maintenance' element={<MaintenancePage />} />
        <Route path="/maintenance/:id" element={<MaintenanceDetailPage />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/workcenter' element={<WorkCenterPage />} />
        <Route path='/teams' element={<TeamsPage />} />
        <Route path='/equipmentpage' element={<EquipmentPage />} />
        <Route path='/workcenterpageall' element={<WorkCenterPageall />} />
        <Route path='/teampageall' element={<TeamsPageall />} />
    </Routes>
  );
}
    
