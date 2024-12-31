import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, Loader, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ productId, onAddSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fungsi untuk menambah produk ke keranjang
  const handleAddToCart = async () => {
    setLoading(true); // Mengatur status loading saat proses dimulai
    setError(null); // Menghapus pesan error sebelumnya
    setSuccess(false); // Mengatur status sukses ke false

    try {
      // Mengirim request untuk menambah produk ke keranjang
      await axios.post(
        "/api/carts/create",
        { product_id: productId, quantity: quantity }, // Data produk dan jumlah yang ditambahkan
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Menambahkan token otentikasi
          },
        }
      );

      setSuccess(true); // Menandakan bahwa produk berhasil ditambahkan
      setShowModal(true); // Menampilkan modal sukses
      if (onAddSuccess) {
        onAddSuccess(); // Menjalankan callback jika ada
      }
      setQuantity(1); // Reset kuantitas ke 1 setelah berhasil

      // Menunggu modal ditampilkan selama 1 detik sebelum mengarahkan ke halaman keranjang
      setTimeout(() => {
        navigate("/user/carts"); // Mengarahkan pengguna ke halaman keranjang
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding to cart"); // Menangani error jika gagal menambah ke keranjang
    } finally {
      setLoading(false); // Menghentikan status loading setelah proses selesai
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="px-6 py-2 bg-[#001219] text-white rounded-3xl shadow-xl hover:bg-[#e0e1dd] hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
        >
          {loading ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Successfully Added to Cart
            </h2>
            <div className="flex justify-center items-center">
              <CheckCircle className="text-green-500 h-8 w-8" />
            </div>
            <p className="text-gray-600 mt-4">
              You will be redirected to your cart shortly.
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-1 text-green-500">
          <CheckCircle className="h-5 w-5" />
          <span>Added to cart!</span>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AddToCart;
