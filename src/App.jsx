import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Overview from "./components/Dashboard/pages/overview/Overview";
import HuntManagement from "./components/Dashboard/pages/Hunt_Mangement/HuntManagement";
import ClueManagement from "./components/Dashboard/pages/Clue_Management/ClueManagement";
import QrCodeManagement from "./components/Dashboard/pages/QrCode_Management/QrCodeManagement";
import PrizeClaim from "./components/Dashboard/pages/PrizeClaim/PrizeClaim";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/hunt-management" element={<HuntManagement />} />
        <Route path="/clue-management" element={<ClueManagement />} />
        <Route path="/qr-management" element={<QrCodeManagement />} />
        <Route path="/prize" element={<PrizeClaim />} />
      </Route>
    </Routes>
  );
}

export default App;
