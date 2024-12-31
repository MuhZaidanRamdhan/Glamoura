import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Package,
  User,
  CreditCard,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  ShoppingBag,
} from "lucide-react";

import ProductImage1 from "../../assets/images/red_tshirt.jpg";
import ProductImage2 from "../../assets/images/black_jacket.jpg";
import ProductImage3 from "../../assets/images/blue_jeans.jpg";
import ProductImage4 from "../../assets/images/running_shoes.jpg";
import ProductImage5 from "../../assets/images/summer_dress.jpg";
import ProductImage6 from "../../assets/images/leather_wallet.jpg";
import ProductImage7 from "../../assets/images/white_tshirt.jpg";
import ProductImage8 from "../../assets/images/red_dress.jpg";
import ProductImage9 from "../../assets/images/high_heels.jpg";
import ProductImage10 from "../../assets/images/blue_scarf.jpg";
import ProductImage11 from "../../assets/images/T-Shirt1.jpg";
import ProductImage12 from "../../assets/images/T-Shirt2.jpg";
import ProductImage13 from "../../assets/images/T-Shirt3.jpg";
import ProductImage14 from "../../assets/images/T-Shirt4.jpg";
import ProductImage15 from "../../assets/images/Jacket1.jpg";
import ProductImage16 from "../../assets/images/Jacket2.jpg";
import ProductImage17 from "../../assets/images/jacket3.jpg";
import ProductImage18 from "../../assets/images/Jacket4.jpg";
import ProductImage20 from "../../assets/images/Pant1.jpg";
import ProductImage21 from "../../assets/images/Pant2.jpg";
import ProductImage22 from "../../assets/images/Pant3.jpg";
import ProductImage23 from "../../assets/images/Pant4.jpg";
import ProductImage24 from "../../assets/images/Pant5.jpg";
import ProductImage25 from "../../assets/images/shoes1.jpg";
import ProductImage26 from "../../assets/images/shoes2.jpg";
import ProductImage27 from "../../assets/images/shoes3.jpg";
import ProductImage29 from "../../assets/images/Dresses1.jpg";
import ProductImage30 from "../../assets/images/Dresses2.jpg";
import ProductImage31 from "../../assets/images/Dresses3.jpg";
import ProductImage33 from "../../assets/images/Kacamata-Hitam-Unisex.jpg";
import ProductImage34 from "../../assets/images/cincin-emas.jpg";
import ProductImage35 from "../../assets/images/gesper.jpg";
import ProductImage36 from "../../assets/images/kalung.jpg";
import ProductImage37 from "../../assets/images/topi.jpg";
import ProductImage38 from "../../assets/images/topi3.jpg";
import ProductImage39 from "../../assets/images/topi4.jpg";
import ProductImage40 from "../../assets/images/topi5.jpg";
import ProductImage41 from "../../assets/images/topi6.jpg";
import ProductImage42 from "../../assets/images/topi7.jpg";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengambil data order berdasarkan ID setiap kali ID berubah
  useEffect(() => {
    // Fungsi untuk mengambil data order dari API
    const fetchOrder = async () => {
      try {
        // Mengambil data order menggunakan fetch dan menyertakan token untuk otentikasi
        const response = await fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Menyertakan token dalam header
          },
        });

        const data = await response.json(); // Mengubah respons ke JSON
        setOrder(data.data); // Menyimpan data order ke state
        console.log(data); // Mencetak data untuk debugging
      } catch (err) {
        // Menangani error dan menampilkan pesan kesalahan
        setError(err.response?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false); // Menonaktifkan status loading setelah selesai
      }
    };

    fetchOrder(); // Memanggil fungsi untuk mengambil data order
  }, [id]); // Efek dijalankan setiap kali ID berubah

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading order details...</span>
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
    <div className="max-w-4xl mt-20 mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Package className="w-6 h-6 mr-2" />
              <h1 className="text-2xl font-bold">Order Details</h1>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                order?.payment_status
              )}`}
            >
              {order?.payment_status}
            </span>
          </div>
          <p className="text-gray-500 mt-2">Order #{order?.order_code}</p>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <User className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="font-semibold text-lg">Customer Information</h2>
            </div>
            <p className="text-gray-700">{order?.name}</p>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="font-semibold text-lg">Payment Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="text-lg font-semibold">
                  $ {order?.total_price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="text-lg font-semibold capitalize">
                  {order?.payment_status}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="font-semibold text-lg">Shipping Address</h2>
            </div>
            <p className="text-gray-700">{order?.shipping_address}</p>
          </div>

          {/* Order Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="font-semibold text-lg">Order Timeline</h2>
            </div>
            <div className="space-y-4">
              {order?.payment_status !== "pending" ? (
                <div className="flex items-start">
                  <div className="flex items-center h-6">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-500">
                      Your order has been placed successfully
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  <div className="flex items-center h-6">
                    {order?.payment_status === "paid" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Payment Status</p>
                    <p className="text-sm text-gray-500">
                      {order?.payment_status === "paid"
                        ? "Payment has been confirmed"
                        : "Waiting for payment confirmation"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <ShoppingBag className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="font-semibold text-lg">Order Products</h2>
            </div>
            {order?.order_details?.length > 0 ? (
              <div className="space-y-6">
                {order?.order_details?.map((item) => {
                  const displayImage =
                    productImages[item.image] ||
                    "https://via.placeholder.com/300x400";
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between flex-wrap p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={displayImage}
                          alt={item.product}
                          className="w-full sm:w-24 h-48 sm:h-24 object-contain rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-gray-700">
                            {item.product_name}
                          </h3>
                          <p className="text-gray-500">${item.price}</p>
                          <p className="text-sm text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold text-gray-700">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No products found in this order.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
