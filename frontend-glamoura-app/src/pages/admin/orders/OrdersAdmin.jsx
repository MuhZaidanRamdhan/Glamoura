import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [editedOrders, setEditedOrders] = useState({});
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const itemsPerPage = 5;

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/orders", {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `/api/orders/${id}`,
        { payment_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update state orders dengan data terbaru
        const updatedOrders = orders.map((order) =>
          order.id === id ? { ...order, payment_status: newStatus } : order
        );
        setOrders(updatedOrders);
        setEditedOrders({});
        Swal.fire({
          title: "Success!",
          text: "Order updated successfully!",
          icon: "success",
          timer: 4000,
          draggable: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while updating the product!",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/orders/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === "success") {
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
            fetchOrders();
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Delete failed",
            icon: "error",
          });
        }
      }
    });
  };

  // Filter products based on search term
  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "No",
                  "Code",
                  "User",
                  "Total Price",
                  "Payment Status",
                  "Shipping Address",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                currentOrders.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.order_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full">
                        {item.total_price}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={
                          editedOrders[item.id]?.payment_status ||
                          item.payment_status
                        }
                        onChange={(e) => {
                          setEditedOrders({
                            ...editedOrders,
                            [item.id]: {
                              ...editedOrders[item.id],
                              payment_status: e.target.value,
                            },
                          });
                          setTimeout(() => {
                            handleUpdateStatus(item.id, e.target.value);
                          }, 500);
                        }}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="canceled">Canceled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.shipping_address}
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link to={`${item.id}`}>
                            <button className="p-2 text-yellow-700 hover:text-yellow-900 bg-yellow-100 rounded-lg transition-all duration-300">
                              <FaEdit size={16} />
                            </button>
                          </Link>
                          <button
                            className="p-2 text-red-700 hover:text-red-900 bg-red-100 rounded-lg transition-all duration-300"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredOrders.length)}
                </span>{" "}
                of <span className="font-medium">{filteredOrders.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <FaChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <FaChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersAdmin;
