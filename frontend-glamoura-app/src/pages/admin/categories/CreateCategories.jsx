import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateCategories() {
  const [FormData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/categories/create", FormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Categories created successfully!",
        icon: "success",
        timer: 4000,
        draggable: true,
      });
      navigate("/admin/categories");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while creating the category!",
      });
      setError(err.response?.data?.message || "Failed to create category");
    }
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Create Category</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={FormData.name}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={FormData.description}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategories;
