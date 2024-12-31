import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Payments from "../payments/Payments";
import PaymentHistory from "../payments/PaymentHistory";

const CheckoutFlow = ({ initialStep, cartTotal }) => {
  const [step, setStep] = useState(initialStep || "checkout"); // State untuk menyimpan langkah saat ini (checkout atau pembayaran)
  const [order, setOrder] = useState(null); // State untuk menyimpan data pesanan
  const [loading, setLoading] = useState(false); // State untuk memantau status loading
  const [error, setError] = useState(""); // State untuk menyimpan pesan error
  const [paymentHistory, setPaymentHistory] = useState([]); // State untuk menyimpan riwayat pembayaran
  const navigate = useNavigate(); // Hook untuk navigasi
  const { orderId } = useParams(); // Mengambil orderId dari URL parameter

  useEffect(() => {
    // Jika orderId ada dan langkah saat ini adalah pembayaran, ambil detail pesanan
    if (orderId && step === "payment") {
      fetchOrderDetails();
    }
  }, [orderId, step]); // Menjalankan useEffect jika orderId atau step berubah

  // Fungsi untuk mengambil detail pesanan
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const orderData = response.data.data;
      setOrder(orderData);

      // Redirect ke riwayat pesanan jika pembayaran belum selesai
      if (orderData.status !== "paid") {
        navigate("/user/orders");
      }
    } catch (error) {
      setError("Failed to fetch order details"); // Menangani error saat mengambil detail pesanan
      navigate("/user/orders"); // Redirect ke riwayat pesanan jika gagal
    }
  };

  // Fungsi untuk mengambil riwayat pembayaran
  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get("/api/user/payment", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPaymentHistory(response.data.data); // Menyimpan data riwayat pembayaran
    } catch (error) {
      setError("Failed to fetch payment history"); // Menangani error saat mengambil riwayat pembayaran
    }
  };

  // Fungsi untuk menangani pembuatan pesanan baru
  const handleOrderCreated = (orderData) => {
    setOrder(orderData);
    setStep("payment"); // Mengubah langkah ke pembayaran
    navigate(`/user/payment/${orderData.id}`, { state: { order: orderData } }); // Navigasi ke halaman pembayaran
  };

  // Fungsi untuk menangani pembayaran
  const handlePayment = async (paymentMethod) => {
    setLoading(true);
    setError(""); // Reset error sebelum melakukan pembayaran

    try {
      const response = await axios.post(
        "/api/user/payment",
        {
          payment_method: paymentMethod,
          order_id: orderId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.status === "success") {
        fetchPaymentHistory(); // Mengambil riwayat pembayaran jika pembayaran berhasil
        setStep("history"); // Mengubah langkah ke riwayat pembayaran
      } else {
        setError(response.data.message || "Payment failed"); // Menangani error jika pembayaran gagal
        navigate("/user/orders"); // Redirect ke riwayat pesanan
      }
    } catch (error) {
      setError(error.response?.data?.message || "Payment failed"); // Menangani error jika terjadi kesalahan saat pembayaran
      navigate("/user/orders"); // Redirect ke riwayat pesanan
    } finally {
      setLoading(false); // Menghentikan status loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Progress Steps */}
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Step 1 */}
            <div
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-sm sm:text-base ${
                step === "checkout"
                  ? "bg-blue-600 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              1
            </div>
            {/* Connector */}
            <div className="w-12 sm:w-16 md:w-20 h-1 bg-gray-300"></div>
            {/* Step 2 */}
            <div
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-sm sm:text-base ${
                step === "payment"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              2
            </div>
            {/* Connector */}
            <div className="w-12 sm:w-16 md:w-20 h-1 bg-gray-300"></div>
            {/* Step 3 */}
            <div
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-sm sm:text-base ${
                step === "history"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-2 sm:mx-auto p-3 sm:p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Content Sections */}
        {step === "checkout" ? (
          <>
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-md">
              <p className="text-base sm:text-lg font-medium">
                Total: $ {cartTotal}
              </p>
            </div>
            <CheckoutForm
              cartTotal={cartTotal}
              onOrderCreated={handleOrderCreated}
            />
          </>
        ) : step === "payment" ? (
          <Payments
            order={order}
            onPaymentSubmit={handlePayment}
            loading={loading}
          />
        ) : (
          <PaymentHistory payments={paymentHistory} />
        )}
      </div>
    </div>
  );
};

export default CheckoutFlow;
