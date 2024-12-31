import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateProduct() {
  const [FormData, setFormData] = useState({
    name: "",
    code: "",
    categories: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const response = await axios.get("/api/categories");
    setCategories(response.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...FormData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/products/create", FormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Product created successfully!",
        icon: "success",
        timer: 4000,
        draggable: true,
      });
      navigate("/admin/products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while creating the product!",
      });
      setError(err.response?.data?.message || "Failed to create product");
      console.log(err);
      
    }
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Create Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
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

        {/* Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Code
          </label>
          <input
            type="text"
            name="code"
            value={FormData.code}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <select
            name="category_id"
            value={FormData.category_id}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={FormData.price}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={FormData.stock}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>  
          <input
            type="text"
            name="image"
            value={FormData.image}
            onChange={handleFileChange}
             className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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

export default CreateProduct;
