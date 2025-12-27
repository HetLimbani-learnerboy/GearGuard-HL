import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import Loginpage from "./Component/Loginpage";
import SignUppage from "./Component/SignUppage";
import DashboardPage from "./Component/DashboardPage";
import MaintenancePage from "./Component/MaintenancePage";

<Route path="/maintenance" element={<MaintenancePage />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
      </Routes>
    </BrowserRouter>
  );
}
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginpage" element={<Loginpage />} />
         <Route path="/signuppage" element={<SignUppage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} />  
        </Routes>
    );
};

export default App;
