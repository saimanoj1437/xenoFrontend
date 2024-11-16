import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUP from './pages/SignUP';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={isAuthenticated ? (
            <Dashboard />
          ) : (
            <SignUP />
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
