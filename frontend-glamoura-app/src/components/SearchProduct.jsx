import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductImage1 from "../assets/images/red_tshirt.jpg";
import ProductImage2 from "../assets/images/black_jacket.jpg";
import ProductImage3 from "../assets/images/blue_jeans.jpg";
import ProductImage4 from "../assets/images/running_shoes.jpg";
import ProductImage5 from "../assets/images/summer_dress.jpg";
import ProductImage6 from "../assets/images/leather_wallet.jpg";
import ProductImage7 from "../assets/images/white_tshirt.jpg";
import ProductImage8 from "../assets/images/red_dress.jpg";
import ProductImage9 from "../assets/images/high_heels.jpg";
import ProductImage10 from "../assets/images/blue_scarf.jpg";
import ProductImage11 from "../assets/images/T-Shirt1.jpg";
import ProductImage12 from "../assets/images/T-Shirt2.jpg";
import ProductImage13 from "../assets/images/T-Shirt3.jpg";
import ProductImage14 from "../assets/images/T-Shirt4.jpg";
import ProductImage15 from "../assets/images/Jacket1.jpg";
import ProductImage16 from "../assets/images/Jacket2.jpg";
import ProductImage17 from "../assets/images/jacket3.jpg";
import ProductImage18 from "../assets/images/Jacket4.jpg";
import ProductImage20 from "../assets/images/Pant1.jpg";
import ProductImage21 from "../assets/images/Pant2.jpg";
import ProductImage22 from "../assets/images/Pant3.jpg";
import ProductImage23 from "../assets/images/Pant4.jpg";
import ProductImage24 from "../assets/images/Pant5.jpg";
import ProductImage25 from "../assets/images/shoes1.jpg";
import ProductImage26 from "../assets/images/shoes2.jpg";
import ProductImage27 from "../assets/images/shoes3.jpg";
import ProductImage29 from "../assets/images/Dresses1.jpg";
import ProductImage30 from "../assets/images/Dresses2.jpg";
import ProductImage31 from "../assets/images/Dresses3.jpg";
import ProductImage33 from "../assets/images/Kacamata-Hitam-Unisex.jpg";
import ProductImage34 from "../assets/images/cincin-emas.jpg";
import ProductImage35 from "../assets/images/gesper.jpg";
import ProductImage36 from "../assets/images/kalung.jpg";
import ProductImage37 from "../assets/images/topi.jpg";
import ProductImage38 from "../assets/images/topi3.jpg";
import ProductImage39 from "../assets/images/topi4.jpg";
import ProductImage40 from "../assets/images/topi5.jpg";
import ProductImage41 from "../assets/images/topi6.jpg";
import ProductImage42 from "../assets/images/topi7.jpg";

const SearchProducts = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const productImages = {
    "red_tshirt.jpg": ProductImage1,
    "black_jacket.jpg": ProductImage2,
    "blue_jeans.jpg": ProductImage3,
    "running_shoes.jpg": ProductImage4,
    "summer_dress.jpg": ProductImage5,
    "leather_wallet.jpg": ProductImage6,
    "white_tshirt.jpg": ProductImage7,
    "red_dress.jpg": ProductImage8,
    "high_heels.jpg": ProductImage9,
    "blue_scarf.jpg": ProductImage10,
    "T-Shirt1.jpg": ProductImage11,
    "T-Shirt2.jpg": ProductImage12,
    "T-Shirt3.jpg": ProductImage13,
    "T-Shirt4.jpg": ProductImage14,
    "Jacket1.jpg": ProductImage15,
    "Jacket2.jpg": ProductImage16,
    "jacket3.jpg": ProductImage17,
    "Jacket4.jpg": ProductImage18,
    "Pant1.jpg": ProductImage20,
    "Pant2.jpg": ProductImage21,
    "Pant3.jpg": ProductImage22,
    "Pant4.jpg": ProductImage23,
    "Pant5.jpg": ProductImage24,
    "shoes1.jpg": ProductImage25,
    "shoes2.jpg": ProductImage26,
    "shoes3.jpg": ProductImage27,
    "Dresses1.jpg": ProductImage29,
    "Dresses2.jpg": ProductImage30,
    "Dresses3.jpg": ProductImage31,
    "Kacamata-Hitam-Unisex.jpg": ProductImage33,
    "cincin-emas.jpg": ProductImage34,
    "gesper.jpg": ProductImage35,
    "kalung.jpg": ProductImage36,
    "topi.jpg": ProductImage37,
    "topi3.jpg": ProductImage38,
    "topi4.jpg": ProductImage39,
    "topi5.jpg": ProductImage40,
    "topi6.jpg": ProductImage41,
    "topi7.jpg": ProductImage42,
  };

  // Fungsi untuk mencari produk berdasarkan query
  const searchProducts = async (query) => {
    setIsLoading(true); // Mengaktifkan status loading sebelum pencarian
    setError(null); // Reset pesan error sebelum pencarian

    try {
      // Mengirimkan query ke endpoint pencarian
      const response = await axios.get(`/api/products/search/${query}`);

      if (response.data.status === "success") {
        setSearchResults(response.data.data); // Menyimpan hasil pencarian ke state jika berhasil
      } else {
        setSearchResults([]); // Mengosongkan hasil jika status tidak sukses
      }
    } catch (error) {
      console.error("Error searching products:", error); // Log error jika terjadi kesalahan
      setError("Product not found. Please try again."); // Menyimpan pesan error ke state
      setSearchResults([]); // Mengosongkan hasil pencarian jika ada error
    } finally {
      setIsLoading(false); // Menonaktifkan status loading setelah pencarian selesai
    }
  };

  // Untuk memantau perubahan pada searchQuery
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const debounceTimer = setTimeout(() => {
        searchProducts(searchQuery); // Memanggil fungsi pencarian setelah jeda (debounce)
      }, 300); // Mengatur jeda waktu 300ms sebelum pencarian dilakukan

      return () => clearTimeout(debounceTimer); // Membersihkan timer untuk mencegah pencarian berulang
    } else {
      setSearchResults([]); // Mengosongkan hasil pencarian jika query kurang dari 2 karakter
    }
  }, [searchQuery]); // Efek ini dijalankan setiap kali searchQuery berubah

  // Fungsi untuk menangani klik pada produk
  const handleProductClick = (id) => {
    onClose(); // Menutup modal pencarian
    navigate(`/products/${id}`); // Navigasi ke halaman detail produk berdasarkan ID
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-2 py-1 outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : searchResults.length > 0 ? (
            <div className="divide-y">
              {searchResults.map((product) => (
                <div
                  key={product.id} // Product ID as key
                  onClick={() => handleProductClick(product.id)} // Use product.id to navigate
                  className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={
                      productImages[product.image] ||
                      "https://via.placeholder.com/300x400"
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-blue-600">${product.price}</p>
                    {product.stock && (
                      <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
