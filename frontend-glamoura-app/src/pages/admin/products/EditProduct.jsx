import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditProduct() {
  const [product, setProduct] = useState({
    name: "",
    code: "",
    categories: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        if (response.data.status === "success" && response.data.data) {
          const product = response.data.data;
          setProduct({
            name: product.name || "",
            code: product.code || "",
            categories: product.categories.id || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            image: product.image || "",
          });
        }
      } catch (err) {
        setError("Failed retrieving product");
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  // Fetch categories for the select dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (err) {
      setError("Failed to fetch categories.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission for updating product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Membuat objek produk baru dengan category_id sebagai ID kategori
    const updatedProduct = {
      ...product,
      category_id: product.categories, // Kirim category_id sebagai ID kategori
    };

    try {
      if(role === 'admin') {
        const response = await axios.put(`/api/products/${id}`, updatedProduct, {
          headers: {
            "Authorization" : `Bearer ${token}`
          },
        });
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          timer: 4000,
          draggable: true,
        });
        navigate("/admin/products");
      }else{
        Swal.fire({
          title: "sorry!",
          text: "You are not allowed to edit this product",
          icon: "error",
          timer: 4000,
          draggable: true,
        });
        navigate("/admin/products");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while updating the product!",
      });
      setError(err.response?.data?.message || "Update product failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Edit Product</h2>

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
            value={product.name}
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
            value={product.code}
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
            name="categories"
            value={product.categories}
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
            value={product.description}
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
            value={product.price}
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
            value={product.stock}
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
            value={product.image}
            onChange={handleInputChange}
            className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
