import { useState, useEffect } from "react";
import PaymentForm from "./PaymentForm";
import PaymentHistory from "./PaymentHistory";
import PaymentService from "../../services/PaymentService";

const Payments = ({ order, onPaymentSubmit, loading }) => {
  const [error, setError] = useState(""); // Menyimpan pesan error
  const [success, setSuccess] = useState(""); // Menyimpan pesan sukses
  const [payments, setPayments] = useState([]); // Menyimpan data pembayaran

  // useEffect untuk memuat pembayaran saat order ada atau berubah
  useEffect(() => {
    if (order) {
      loadPayments(); // Memanggil fungsi loadPayments untuk mengambil data pembayaran
    }
  }, [order]); // Efek dijalankan setiap kali order berubah

  // Fungsi untuk memuat data pembayaran dari PaymentService
  const loadPayments = async () => {
    try {
      const response = await PaymentService.getUserPayments(); // Mengambil data pembayaran
      if (response.status === "success") {
        setPayments(response.data); // Menyimpan data pembayaran jika berhasil
      }
    } catch (error) {
      setError(error.message); // Menyimpan pesan error jika terjadi kesalahan
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Make Payment</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <PaymentForm onSubmit={onPaymentSubmit} loading={loading} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <PaymentHistory payments={payments} />
        </div>
      </div>
    </div>
  );
};

export default Payments;
