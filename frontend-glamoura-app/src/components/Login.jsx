import axios from "axios";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { role } = await login(email, password);

      // Redirect berdasarkan role
      if (role === "admin") {
        Swal.fire({
          title: "Success!",
          text: "Welcome back, Admin!",
          icon: "success",
          confirmButtonText: "Continue",
        });
        navigate("/admin/dashboard");
      } else {
        Swal.fire({
          title: "Success!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "Continue",
        });
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        title: "Error",
        text: err.message || "Login failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full my-36 sm:mt-[100px]">
        <h1 className="text-2xl font-semibold text-center mb-2">Log in</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="space-y-4 mb-6">
          <button className="w-full flex items-center justify-center bg-blue-100 text-blue-700 font-medium py-2 rounded-md hover:bg-blue-200 transition">
            <FaFacebookF className="mr-2" size={16} /> Log in with Facebook
          </button>
          <button className="w-full flex items-center justify-center bg-red-100 text-red-700 font-medium py-2 rounded-md hover:bg-red-200 transition">
            <FaGoogle className="mr-2" size={16} /> Log in with Google
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">OR</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Your email"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline text-right block"
          >
            Forget your password
          </a>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
          >
            Log in
          </button>
          <p className="text-sm text-gray-600 text-center mb-6">
            <Link to={"/"} className="text-blue-500 hover:underline">
              Back To Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;