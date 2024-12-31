import React, { useState, useEffect } from "react";
import axios from "axios";

const CartItems = () => {
  // State untuk menyimpan item keranjang, status loading, dan error
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil item keranjang dari API
  const fetchCartItems = async () => {
    try {
      // Mengambil data keranjang dari API dengan autentikasi token
      const { data } = await axios.get("/api/users/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Menggunakan token dari localStorage
        },
      });
      setCartItems(data); // Menyimpan data item keranjang ke state
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred."); // Menangani error dan menyimpan pesan kesalahan
    } finally {
      setLoading(false); // Menghentikan status loading setelah selesai
    }
  };

  // Mengambil item keranjang saat komponen pertama kali dimuat
  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-700">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <p className="text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => console.log("Removing item...")} // Handle item removal
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
                <p className="font-semibold text-gray-700">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
