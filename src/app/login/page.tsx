"use client";
import React, { useState } from "react";
import { login } from "@/services/accounts";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation
    if (!userName || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (userName && password) {
        const response = await login(userName, password);
        if (response.status === 200) {
            // Navigate to dashboard
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
        } else {
            setError("Login failed. Please check your credentials.");
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-600 font-montserrat">Welcome Back</h2>
        <p className="mb-6 text-center text-gray-500 font-montserrat">Sign in to your admin dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 font-montserrat">UserName</label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-montserrat"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 font-montserrat">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-montserrat"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <div className="text-red-500 text-sm font-montserrat">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition font-montserrat"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 font-montserrat">
          Forgot your password? <a href="#" className="text-blue-600 hover:underline">Reset here</a>
        </div>
      </div>
    </div>
  );
}