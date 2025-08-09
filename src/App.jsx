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
import Subscription from "./components/Dashboard/pages/subscribe/Subscription";
import DefaultLandingPage from "./components/DefaultLandingPage/DefaultLandingPage";

function App() {
  return (
<Routes>
  {/* Landing Page */}
  <Route path="/" element={<DefaultLandingPage />} />

  {/* Dashboard Pages */}
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="overview" element={<Overview />} />
    <Route path="hunt-management" element={<HuntManagement />} />
    <Route path="clue-management" element={<ClueManagement />} />
    <Route path="qr-management" element={<QrCodeManagement />} />
    <Route path="subscription" element={<Subscription />} />
    <Route path="prize" element={<PrizeClaim />} />
    <Route path="settings" element={<Settings />} />
    <Route path="settings/privacy" element={<Privacy />} />
    <Route path="settings/terms" element={<Terms />} />
  </Route>

  <Route path="/login" element={<Login />} />

  {/* Redirect unknown routes */}
  {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
</Routes>

  );
}

export default App;
