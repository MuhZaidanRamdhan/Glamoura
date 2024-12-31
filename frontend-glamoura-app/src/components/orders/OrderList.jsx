import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ orders, onPaymentClick, onOrderClick }) => {
  // Memeriksa apakah input orders tidak valid (bukan objek atau null)
  if (!orders || typeof orders !== "object") {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Loading orders...</p>{" "}
        {/* Menampilkan pesan loading saat orders belum tersedia */}
      </div>
    );
  }

  // Mengakses daftar item pesanan dengan aman (menangani jika orders adalah objek yang berisi data atau items)
  const orderItems = Array.isArray(orders)
    ? orders
    : orders.data || orders.items || [];

  // Memeriksa apakah tidak ada item pesanan
  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No orders found</p>{" "}
        {/* Menampilkan pesan jika tidak ada pesanan */}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orderItems.map((order) => (
        <OrderCard
          key={order.order_code}
          order={order}
          onPaymentClick={onPaymentClick}
          onOrderClick={onOrderClick}
        />
      ))}
    </div>
  );
};

export default OrderList;
