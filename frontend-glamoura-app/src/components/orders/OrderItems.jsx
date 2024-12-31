const OrderItem = ({ item }) => {
    return (
      <div className="flex justify-between items-center p-3 border-b border-gray-100">
        <div>
          <h4 className="font-medium text-gray-800">{item.product_name}</h4>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        </div>
        <p className="font-semibold text-gray-800">${item.price * item.quantity}</p>
      </div>
    );
  };

  export default OrderItem;