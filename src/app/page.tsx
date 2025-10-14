// src/app/page.tsx
'use client'; 

import React from 'react';
import ProductDashboard from '../components/ProductDashboard';
import Login from '../components/Login'; // Necesitas este componente
import { useAuth } from '../context/AuthContext'; 

const HomePage = () => {
  const { isAuthenticated } = useAuth(); // <--- CHECKS IF THERE IS AN ACTIVE SESSION

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditional Rendering Logic */}
      {isAuthenticated ? (
        <ProductDashboard />
      ) : (
        <Login /> // <--- If not authenticated, show Login
      )}
    </div>
  );
};

export default HomePage;