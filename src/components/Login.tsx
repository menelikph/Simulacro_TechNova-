'use client'; 

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Login: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); // Simple variable name
  const { login } = useAuth(); 

  

const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // CRITICAL: Use .trim() to clean whitespace from input
    const username = usernameInput.trim();
    const password = passwordInput.trim();

    if (username.length === 0 || password.length === 0) {
      setLoginError("Please enter both username and password.");
      return;
    }

    // Pass the cleaned variables to the login function
    const success = login(username, password); 

    if (!success) {
      setLoginError("Login failed. Check your credentials (e.g., admin/123).");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Login Screen</h2>
        
        <form onSubmit={handleLoginSubmit}>
          {loginError && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {loginError}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">User Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="username"
              type="text"
              placeholder="Username here"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Secret Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="primary" type="submit" size="medium" className="w-full">
              Log Me In!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;