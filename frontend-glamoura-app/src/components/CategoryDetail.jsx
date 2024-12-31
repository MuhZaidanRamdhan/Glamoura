import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Category1Image from "../assets/images/product-1.png";
import Category2Image from "../assets/images/product-18.png";
import Category3Image from "../assets/images/product-17.png";
import Category41Image from "../assets/images/product-09.png";
import Category5Image from "../assets/images/product-19.png";
import Category6Image from "../assets/images/product-15.png";
import Category7Image from "../assets/images/product-20.webp";

const CategoryById = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const navigate = useNavigate(); // Untuk navigasi
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryImages = {
    "T-shirts": Category1Image,
    Jackets: Category2Image,
    Pants: Category3Image,
    Shoes: Category41Image,
    Dresses: Category5Image,
    Accessories: Category6Image,
    "Hats & Caps": Category7Image,
  };

  useEffect(() => {
    const getCategoryById = async (id) => {
      try {
        const response = await axios.get(`/api/categories/${id}`);
        if (response.data.status === "success" && response.data.data) {
          setCategory(response.data.data);
        } else {
          throw new Error("Category not found");
        }
      } catch (err) {
        console.error("Error fetching category by ID:", err);
        setError("Failed to fetch category. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getCategoryById(id);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-2xl">
        Category not found
      </div>
    );
  }

  const handleShopClick = (e) => {
    e.preventDefault();
    navigate("/shop");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Detail Kategori */}
          <div className="md:order-1 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">{category.name}</h2>
            <p className="text-gray-600 max-w-lg mx-auto md:mx-0 mb-6">
              {category.description}
            </p>
            <a
              href="/shop"
              onClick={handleShopClick}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
            >
              Shop {category.name}
            </a>
          </div>

          {/* Gambar Kategori */}
          <div className="flex justify-center md:order-2">
            <img
              src={
                categoryImages[category.name] ||
                category.image ||
                "https://via.placeholder.com/400x300"
              }
              alt={category.name}
              className="w-full max-w-md rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryById;
