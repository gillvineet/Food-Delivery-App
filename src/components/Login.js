import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../utils/constants';

const users = [
  { username: "admin", password: "admin123" },
  { username: "test", password: "test123" }
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const matched = users.find(user => user.username === username && user.password === password);
    if (matched) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("❌ Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={LOGO_URL} alt="Logo" className="w-28 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Food Delivery</h1>
          <p className="text-sm text-gray-500">Please login to continue</p>
        </div>

        <div className="space-y-5">
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(""); // Clear error on input change
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // Clear error on input change
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
