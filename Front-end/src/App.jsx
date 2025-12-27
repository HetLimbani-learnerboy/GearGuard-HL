import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default App;
