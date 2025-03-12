import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Cookies from "js-cookie";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        user_email: email,
        user_password: password,
      });
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 7 }); // Set cookie to expire in 7 days
        navigate("/hr_ats");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleCopyCredentials = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-super-light-gray">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-teal-700">Login</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">For debugging:</p>
          <div className="flex flex-col items-center space-y-2">
            <div>
              <p className="text-gray-600">Email: testuser@example.com</p>
              <p className="text-gray-600">Password: password</p>
              <button
                onClick={() => handleCopyCredentials("testuser@example.com", "password")}
                className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Copy Credentials
              </button>
            </div>
            <div>
              <p className="text-gray-600">Email: ats_hr@example.com</p>
              <p className="text-gray-600">Password: password</p>
              <button
                onClick={() => handleCopyCredentials("ats_hr@example.com", "password")}
                className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Copy Credentials
              </button>
            </div>
            <div>
              <p className="text-gray-600">Email: ats_interviewer@example.com</p>
              <p className="text-gray-600">Password: password</p>
              <button
                onClick={() => handleCopyCredentials("ats_interviewer@example.com", "password")}
                className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Copy Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;