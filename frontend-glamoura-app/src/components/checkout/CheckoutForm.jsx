import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ cartTotal, onOrderCreated }) => {
  // State untuk menyimpan alamat pengiriman dan pesan error
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState("");

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    // Validasi alamat pengiriman
    if (!shippingAddress) {
      setError("Shipping address is required"); // Menampilkan error jika alamat pengiriman kosong
      return;
    }

    try {
      // Mengirim data pesanan ke API
      const response = await axios.post(
        "/api/orders/create", // Endpoint untuk membuat pesanan baru
        {
          total_price: cartTotal, // Total harga dari cart
          shipping_address: shippingAddress, // Alamat pengiriman
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Menambahkan token untuk otentikasi
          },
        }
      );

      // Jika pesanan berhasil dibuat, jalankan callback onOrderCreated
      if (response.data.status === "success") {
        onOrderCreated(response.data.order);
      } else {
        setError(response.data.message || "Failed to create order"); // Menampilkan error jika gagal membuat pesanan
      }
    } catch (error) {
      setError("Failed to create order. Please try again."); // Menangani error jika terjadi kesalahan saat request
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipping Address
        </label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Order
      </button>
    </form>
  );
};

export default CheckoutForm;
