import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage.jsx";
import Signuppage from "./Component/Signuppage.jsx";
import Loginpage from "./Component/Loginpage.jsx";
 import DashboardPage from "./Component/DashboardPage.jsx";
import MaintenancePage from "./Component/MaintenancePage.jsx";
import ForgotPassword from "./Component/ForgotPassword.jsx";
import WorkCenterPage from "./Component/WorkCenterPage.jsx";
import TeamsPage from "./Component/TeamsPage.jsx";

export default function App() {
  return (
    <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path='/signuppage' element={<Signuppage />} />
        <Route path='/loginpage' element={<Loginpage />} />
         <Route path='/dashboard' element={<DashboardPage />} /> 
        <Route path='/maintenance' element={<MaintenancePage />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/workcenter' element={<WorkCenterPage />} />
        <Route path='/teams' element={<TeamsPage />} />
    </Routes>
  );
}
    
