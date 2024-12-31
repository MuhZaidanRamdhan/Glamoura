import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Category1Image from "../assets/images/product-1.png";
import Category2Image from "../assets/images/product-18.png";
import Category3Image from "../assets/images/product-17.png";
import Category41Image from "../assets/images/product-09.png";
import Category5Image from "../assets/images/product-19.png";
import Category6Image from "../assets/images/product-15.png";
import Category7Image from "../assets/images/product-20.webp";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hoveredBanner, setHoveredBanner] = useState(null);

  const categoryImages = {
    "T-shirts": Category1Image,
    "Jackets": Category2Image,
    "Pants": Category3Image,
    "Shoes": Category41Image,
    "Dresses": Category5Image,
    "Accessories": Category6Image,
    "Hats & Caps": Category7Image,  
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        const updatedCategories = response.data.data.map((category) => ({
          ...category,
          image:
            categoryImages[category.name] ||
            "https://via.placeholder.com/400x300",
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Tampilkan loading jika data masih diproses
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Tampilkan pesan jika tidak ada kategori
  if (categories.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-600">
        No categories found
      </div>
    );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection across different categories.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id || index}
              className="relative overflow-hidden rounded-lg shadow-lg group transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredBanner(index)}
              onMouseLeave={() => setHoveredBanner(null)}
            >
              <img
                src={category.image}
                alt={`${category.name} Category`}
                className="w-full h-96 object-contain bg-transparent transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay dengan informasi kategori */}
              <div
                className={`absolute inset-0 bg-black/20 transition-opacity duration-300 
                hover:opacity-100 opacity-0 flex flex-col justify-between p-6 backdrop-blur-md`}
              >
                <div>
                  {/* Judul kategori dengan animasi */}
                  <h2
                    className="text-4xl font-bold text-white mb-2 transform transition-transform duration-300 
                    translate-y-4 group-hover:translate-y-0"
                  >
                    {category.name}
                  </h2>
                  {/* Deskripsi kategori dengan animasi */}
                  <p
                    className="text-white font-light transform transition-transform duration-300 
                    translate-y-8 group-hover:translate-y-0 line-clamp-3"
                  >
                    {category.description}
                  </p>
                </div>

                {/* Tombol Shop Now dengan ikon panah */}
                <a
                  href={`/categories/${category.id}`}
                  className="flex items-center text-white font-semibold group/link hover:text-gray-200 transition-colors"
                >
                  Shop Now
                  <ArrowRight
                    className="ml-2 transition-transform group-hover/link:translate-x-2"
                    size={20}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
