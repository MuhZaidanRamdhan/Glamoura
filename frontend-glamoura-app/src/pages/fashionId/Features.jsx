  import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Lock, Loader2, AlertCircle } from 'lucide-react';
import CartList from '../../components/cart/CartList';
import CheckoutFlow from '../../components/checkout/CheckoutFlow';

const Features = () => {
  const [cartItems, setCartItems] = useState(null); // State untuk menyimpan item keranjang
  const [loading, setLoading] = useState(true); // State untuk status loading saat mengambil data
  const [error, setError] = useState(null); // State untuk menangani error
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk status autentikasi
  const navigate = useNavigate();

  // Fungsi untuk memeriksa apakah pengguna sudah login
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return !!token; // Mengembalikan true jika token ada
  };

  // Fungsi untuk mengambil item keranjang dari API
  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/user/carts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Menyertakan token di header
        },
      });

      // Jika statusnya 401 (tidak terautentikasi), set status autentikasi ke false
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      setCartItems(data.data); // Set item keranjang
      setIsAuthenticated(true); // Set status autentikasi ke true
      setError(null); // Menghapus error jika berhasil
    } catch (err) {
      // Menangani error jika statusnya 401 atau error lainnya
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      } else {
        setError(err.response?.data?.message || 'Error fetching cart items');
      }
    } finally {
      setLoading(false); // Set loading ke false setelah data diambil
    }
  };

  // useEffect untuk mengambil item keranjang saat komponen dipasang
  useEffect(() => {
    if (!checkAuth()) {
      setIsAuthenticated(false); // Jika belum login, set status autentikasi ke false
      setLoading(false); // Stop loading
      return;
    }
    fetchCartItems(); // Ambil item keranjang jika sudah login
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="text-lg text-gray-600">Loading cart items...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please log in to view your cart and checkout
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <p className="text-center text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow my-36 sm:mt-[100px]">
          <div className="px-6 py-4 border-b border-gray-200 ">
            <div className="flex items-center justify-center" >
              <ShoppingCart className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Shopping Cart
              </h2>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6">
            <CartList cartItems={cartItems} fetchCartItems={fetchCartItems} />
            
            {cartItems && cartItems.total_price > 0 && (
              <div className="mt-6">
                <CheckoutFlow
                  cartTotal={cartItems.total_price}
                  initialStep="checkout"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;