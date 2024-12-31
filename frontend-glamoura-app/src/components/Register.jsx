import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/register", FormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        timer: 4000,
        draggable: true,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "An error occurred while creating the account!",
      });
      setError(err.response?.data?.message || "Failed to create account");
      console.log('Error response:', err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full my-36 sm:mt-[100px]">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-2 space-y-2 sm:space-y-0 mb-2">
          <h1 className="text-lg">Welcome to</h1>
          <img
            src="../src/assets/images/header-glamoura.png"
            alt="Glamoura"
            className="w-40"
          />
        </div>
        <p className="text-sm text-gray-600 text-center mb-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={FormData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={FormData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p className="text-sm text-gray-600">Use 8 or more characters</p>
            <p className="text-sm text-gray-600">One uppercase character</p>
            <p className="text-sm text-gray-600">One lowercase character</p>
            <p className="text-sm text-gray-600">One special character</p>
            <p className="text-sm text-gray-600">One number</p>
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 border-gray-300 rounded"
              id="confirmed"
              required
            />
            <label className="text-sm text-gray-600" for="confirmed">
              I want to receive emails about the product, feature updates,
              events, and marketing promotions.
            </label>
          </div>
          <p className="text-xs text-gray-600 text-center">
            By creating an account, you agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
