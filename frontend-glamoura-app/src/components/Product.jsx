import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  
  // Fungsi untuk mengambil data kategori dari API dan menyimpannya ke state
const fetchCategories = async () => {
  try {
      const response = await axios.get("/api/categories");
      // Memetakan data dari API ke format yang diinginkan dan menambahkan opsi "All"
      const categoriesData = response.data.data.map(category => ({
          id: category.id,
          name: category.name
      }));
      setCategories([{ id: 'all', name: 'All' }, ...categoriesData]);
  } catch (error) {
      console.error("Gagal mengambil data kategori:", error); // Log error jika gagal mengambil data
  }
};

// Fungsi untuk mengambil data produk dari API dan menyimpannya ke state
const fetchProducts = async () => {
  setIsLoading(true); // Mengaktifkan status loading sebelum mengambil data
  try {
      const { data } = await axios.get("/api/products");
      setAllProducts(data.data || []); // Menyimpan semua produk untuk proses filter
      setProducts(data.data || []); // Menampilkan semua produk secara default
  } catch (err) {
      console.error("Gagal mengambil data produk:", err); // Log error jika gagal mengambil data
  } finally {
      setIsLoading(false); // Menonaktifkan status loading setelah selesai
  }
};

// Fungsi untuk menangani pemilihan kategori
const handleCategorySelection = (category) => {
  setSelectedCategory(category.name); // Menyimpan kategori yang dipilih

  if (category.name === 'All') {
      setProducts(allProducts); // Tampilkan semua produk jika kategori "All" dipilih
  } else {
      // Filter produk berdasarkan kategori yang dipilih
      const filteredProducts = allProducts.filter(
        // Cek apakah kategori produk (product.categories) mengandung nama kategori yang dipilih (category.name)
          product => product.categories.includes(category.name)
      );
      setProducts(filteredProducts); // Tampilkan produk yang sudah difilter
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our latest collection across different categories.
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelection(category)}
            className={`px-6 py-2 rounded-full transition-all m-2 ${
              selectedCategory === category.name
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              category_id={product.category_id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;