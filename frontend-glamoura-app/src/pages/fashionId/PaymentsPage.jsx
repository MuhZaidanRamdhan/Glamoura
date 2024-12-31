import React, { useEffect, useState } from "react";
import { CreditCard, AlertCircle, Loader2, Lock, Receipt } from "lucide-react";
import PaymentHistory from "../../components/payments/PaymentHistory";
import { useNavigate } from "react-router-dom";

const PaymentsPage = () => {
  const [paymentHistory, setPaymentHistory] = useState(null); // State untuk menyimpan riwayat pembayaran
  const [loading, setLoading] = useState(true); // State untuk status loading saat mengambil data
  const [error, setError] = useState(null); // State untuk menangani error
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk status autentikasi
  const navigate = useNavigate(); // Hook untuk navigasi halaman

  // Fungsi untuk memeriksa apakah pengguna sudah login
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token; // Mengembalikan true jika token ada
  };

  // Fungsi untuk mengambil riwayat pembayaran dari API
  const fetchPaymentHistory = async () => {
    try {
      setLoading(true); // Set loading menjadi true sebelum mengambil data
      const response = await fetch("/api/user/payment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Menyertakan token di header
        },
      });

      // Jika statusnya 401 (tidak terautentikasi), set status autentikasi ke false
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      setPaymentHistory(data.data || []); // Set riwayat pembayaran, pastikan selalu set array kosong jika data tidak ada
      setIsAuthenticated(true); // Set status autentikasi ke true
    } catch (err) {
      // Menangani error jika statusnya 401 atau error lainnya
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      } else {
        setError(
          err.response?.data?.message || "Error fetching payment history"
        );
      }
    } finally {
      setLoading(false); // Set loading ke false setelah data diambil
    }
  };

  // useEffect untuk memeriksa autentikasi dan mengambil riwayat pembayaran saat komponen dipasang
  useEffect(() => {
    if (!checkAuth()) {
      setIsAuthenticated(false); // Jika belum login, set status autentikasi ke false
      setLoading(false); // Stop loading
      return;
    }
    fetchPaymentHistory(); // Ambil riwayat pembayaran jika sudah login
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading payment history...</span>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to view your payment history
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate("/")}
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
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow my-36 sm:mt-[100px]">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Payment History
              </h2>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6">
            {!paymentHistory || paymentHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Payments Found
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  You haven't made any payments yet. Your payment history will
                  appear here once you make your first payment.
                </p>
              </div>
            ) : (
              <PaymentHistory payments={paymentHistory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
