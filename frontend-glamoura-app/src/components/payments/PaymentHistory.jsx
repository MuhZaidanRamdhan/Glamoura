import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentHistory = ({ payments }) => {
  const navigate = useNavigate();

  if (!payments.length) {
    return (
      <div className="text-center py-6 text-gray-500">
        No payment history found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div
          key={payment.id}
          onClick={() => navigate(`/user/orders/${payment.order_id}`)} // Navigasi ke halaman detail order
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">
                Order: {payment.order_code}
              </p>
              <p className="text-sm text-gray-600">
                Amount: $ {payment.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                Payment: {payment.payment_method.replace("_", " ")}
              </p>
              <p className="text-sm text-gray-600">
                Transaction ID: {payment.transaction_id}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  payment.payment_status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {payment.payment_status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
