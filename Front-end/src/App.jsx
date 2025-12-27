import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./Component/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
