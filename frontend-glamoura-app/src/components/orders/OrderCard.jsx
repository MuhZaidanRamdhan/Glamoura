// Komponen OrderCard untuk menampilkan detail pesanan dan memungkinkan pembayaran

const OrderCard = ({ order, onPaymentClick, onOrderClick }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State untuk toggle tampilan detail pesanan

  // Warna status pembayaran berdasarkan status pesanan
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
      onClick={() => onOrderClick(order.order_code)}
    >
      {/* Menampilkan header pesanan dengan kode dan status */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Order #{order.order_code}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              statusColors[order.payment_status]
            }`}
          >
            {order.payment_status}{" "}
            {/* Menampilkan status pembayaran dengan warna yang sesuai */}
          </span>
        </div>

        {/* Menampilkan total harga dan alamat pengiriman */}
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold">${order.total_price}</span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <p>Shipping Address:</p>
          <p className="font-medium">{order.shipping_address}</p>
        </div>

        {/* Tombol untuk toggle detail pesanan */}
        <button
          onClick={() => setIsExpanded(!isExpanded)} // Men-switch antara tampilan detail dan tidak
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {isExpanded ? "Hide Details" : "Show Details"}
        </button>

        {/* Menampilkan detail pesanan jika isExpanded true */}
        {isExpanded && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <h4 className="font-medium text-gray-800 mb-2">Order Items</h4>
            <div className="space-y-2">
              {order.order_details.map((item, index) => (
                <OrderItem key={index} item={item} /> // Menampilkan item pesanan
              ))}
            </div>
          </div>
        )}

        {/* Tombol untuk pembayaran jika status pembayaran bukan 'paid' */}
        {order.payment_status !== "paid" && (
          <div className="mt-4">
            <button
              onClick={() => onPaymentClick(order.order_code)} // Memanggil fungsi pembayaran
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
