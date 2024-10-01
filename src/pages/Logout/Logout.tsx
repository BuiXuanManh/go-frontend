import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'src/helpers/api';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log('logout');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
