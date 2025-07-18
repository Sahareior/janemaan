import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Overview from "./components/Dashboard/pages/overview/Overview";
import HuntManagement from "./components/Dashboard/pages/Hunt_Mangement/HuntManagement";
import ClueManagement from "./components/Dashboard/pages/Clue_Management/ClueManagement";
import QrCodeManagement from "./components/Dashboard/pages/QrCode_Management/QrCodeManagement";
import PrizeClaim from "./components/Dashboard/pages/PrizeClaim/PrizeClaim";
import Settings from "./components/Dashboard/pages/Settings/Settings";
import Privacy from "./components/Dashboard/pages/Settings/_components/Privacy";
import Terms from "./components/Dashboard/pages/Settings/_components/Terms";
import Login from './components/Authentications/Login';

function App() {
  return (
    <Routes>
  
      <Route path="/" element={<Login />} />

  
      <Route path="/" element={<Dashboard />}>
        <Route path="overview" element={<Overview />} />
        <Route path="hunt-management" element={<HuntManagement />} />
        <Route path="clue-management" element={<ClueManagement />} />
        <Route path="qr-management" element={<QrCodeManagement />} />
        <Route path="prize" element={<PrizeClaim />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/privacy" element={<Privacy />} />
        <Route path="settings/terms" element={<Terms />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
