import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./Component/LandingPage.jsx";
import Signuppage from "./Component/SignUppage.jsx";
import Loginpage from "./Component/Loginpage.jsx";
import DashboardPage from "./Component/DashboardPage.jsx";
import MaintenancePage from "./Component/MaintenancePage.jsx";
import MaintenanceDetailPage from "./Component/MaintenanceDetailPage";
import ForgotPassword from "./Component/ForgotPassword.jsx";
import WorkCenterPage from "./Component/WorkCenterPage.jsx";
import TeamsPage from "./Component/TeamsPage.jsx";
import WorkCenterPageall from "./Component/WorkCenterPageAll.jsx";
import TeamsPageall from "./Component/TeamsPageall.jsx";
import CreateRequestModal from "./Component/CreateRequestModal.jsx";
import TestActivityPage from "./Component/TestActivityPage.jsx";
import EquipmentPage from "./Component/EquipmentPage.jsx";
import MaintenanceCalendar from "./Component/MaintenanceCalendar.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/signuppage' element={<Signuppage />} />
      <Route path='/loginpage' element={<Loginpage />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/maintenance' element={<MaintenancePage />} />
        <Route path="/maintenance/:id" element={<MaintenanceDetailPage />} />
        <Route path='/workcenter' element={<WorkCenterPage />} />
        <Route path='/teams' element={<TeamsPage />} />
        <Route path='/equipmentpage' element={<EquipmentPage />} />
        <Route path='/workcenterpageall' element={<WorkCenterPageall />} />
        <Route path='/workcenterpage' element={<WorkCenterPage />} />
        <Route path='/teampageall' element={<TeamsPageall />} />
        <Route path='/createrequest' element={<CreateRequestModal />} />
        <Route path='/test-activity/:id' element={<TestActivityPage />} />
        <Route path='/equipmentdetails' element={<EquipmentPage />} />
        <Route path='/maintenancecalendar' element={<MaintenanceCalendar />} />
      </Route>
    </Routes>
  );
}