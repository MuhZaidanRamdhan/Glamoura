import { useState } from "react";
import { FaCreditCard, FaUniversity, FaWallet } from "react-icons/fa"; // Import ikon dari react-icons

const PaymentForm = ({ onSubmit, loading }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(""); // Menampilkan pesan kesalahan
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method."); // Kesalahan tampilan jika tidak ada metode yang dipilih
      return;
    }

    try {
      setError(""); // Hapus pesan kesalahan sebelum mengirim
      await onSubmit(paymentMethod); // Panggil fungsi onSubmit yang diteruskan melalui props
    } catch (error) {
      setError("Failed to process payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display error if there's any */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="space-y-4">
        {[
          { method: "credit_card", label: "Credit Card", icon: <FaCreditCard size={24} /> },
          { method: "bank_transfer", label: "Bank Transfer", icon: <FaUniversity size={24} /> },
          { method: "e_wallet", label: "E-Wallet", icon: <FaWallet size={24} /> },
        ].map(({ method, label, icon }) => (
          <div className="flex items-center space-x-3" key={method}>
            <input
              type="radio"
              id={method}
              name="payment_method"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={method}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700"
            >
              {icon}
              <span>{label}</span>
            </label>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={!paymentMethod || loading} // Nonaktifkan tombol jika tidak ada metode yang dipilih atau dimuat
        className="w-full px-4 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {loading ? "Processing Payment..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
