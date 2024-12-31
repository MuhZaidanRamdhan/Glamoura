import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditCategories() {
  const [categories, setCategories] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/categories/${id}`);
        if (response.data.status === "success" && response.data.data) {
          const categories = response.data.data;
          setCategories({
            name: categories.name || "",
            description: categories.description || "",
          });
        }
      } catch (err) {
        setError("Failed to retrieve category data");
      }
    };
    fetchCategories();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategories({ ...categories, [name]: value });
  };

  // Handle form submission for updating product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.put(`/api/categories/${id}`, categories, {
        headers: {
        Authorization: `Bearer ${token}`
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Category updated successfully!",
        icon: "success",
        timer: 4000,
        draggable: true,
      });
      navigate("/admin/categories");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while updating the catagory!",
      });
      setError(err.response?.data?.message || "Update category failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Edit Category</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={categories.name}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Code
          </label>
          <input
            type="text"
            name="description"
            value={categories.description}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategories;
