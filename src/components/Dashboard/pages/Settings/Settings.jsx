import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard/settings') {
      navigate('/dashboard/settings/privacy');
    }
  }, [location.pathname, navigate]);

  return <div></div>;
};

export default Settings;