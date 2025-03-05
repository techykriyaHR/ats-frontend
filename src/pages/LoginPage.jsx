import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/hr_ats");
  };

  return (
    <div className="bg-super-light-gray flex min-h-screen items-center justify-center">
      <div className="w-96 rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-teal-700">Login</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-600 py-2 text-white transition hover:bg-teal-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
