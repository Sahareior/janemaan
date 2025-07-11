import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Overview from './components/Dashboard/pages/Overview';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/overview" element={<Overview />} />
      </Route>
    </Routes>
  );
}

export default App;
