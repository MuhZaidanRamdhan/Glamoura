import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, CheckCircle } from "lucide-react";
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
import AddToCart from "./cart/AddToCart";

const ProductCard = ({ id, image, name, description, price }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false); // State buat login modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State buat success modal

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
    "topi7.jpg": ProductImage42
  };

  const displayImage = productImages[image] || "https://via.placeholder.com/300x400";

  const handleProductClick = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
    } else {
      setShowSuccessModal(true); // Menampilkan success modal setelah adding to cart
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/user/carts"); // Menuju halaman cart setelah adding to cart 
      }, 2000); // Menunggu 2 detik sebelum menuju halaman cart
    }
  };

  return (
    <div className="relative group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105">
      <div 
        className="relative w-full h-96 cursor-pointer" 
        onClick={handleProductClick}
      >
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-contain bg-white"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
            <Heart size={20} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 
          className="text-lg font-semibold truncate hover:text-blue-600 cursor-pointer"
          onClick={handleProductClick}
        >
          {name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-gray-800">${price}</span>
          <button
            className="text-white px-4 py-2 rounded-full flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all"
            onClick={handleAddToCart}
          >
            <AddToCart
              productId={id}
              onAddSuccess={() => {
                setShowSuccessModal(true); // Menampilkan success modal setelah adding to cart
              }}
            />
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Successfully Added to Cart
            </h2>
            <div className="flex justify-center items-center">
              <CheckCircle className="text-green-500 h-8 w-8" />
            </div>
            <p className="text-gray-600 mt-4">You will be redirected to your cart shortly.</p>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please log in to proceed.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;