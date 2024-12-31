import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

function PaymentsAdmin() {
  const [payments, setPayments] = useState([]);
  const [editedPayments, setEditedPayments] = useState({});
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const itemsPerPage = 5;

  // Fungsi untuk mengambil daftar pembayaran dari API
  const fetchPayments = async () => {
    setIsLoading(true); // Set loading state menjadi true
    try {
      // Kirim permintaan GET ke endpoint /api/payments dengan header Authorization
      const response = await axios.get("/api/payments", {
        headers: {
          Authorization: `Bearer ${token}`, // Token autentikasi untuk user
        },
      });
      setPayments(response.data.data); // Simpan data pembayaran ke dalam state payments
    } catch (error) {
      setError(error.message); // Jika terjadi kesalahan, simpan pesan error ke state error
    }
    setIsLoading(false); // Set loading state menjadi false
  };

  // Gunakan useEffect untuk memanggil fetchPayments saat komponen pertama kali dirender
  useEffect(() => {
    fetchPayments(); // Memanggil fungsi fetchPayments
  }, []);

  // Fungsi untuk memperbarui status pembayaran
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Kirim permintaan PUT ke endpoint /api/payments/{id} dengan data status baru
      const response = await axios.put(
        `/api/payments/${id}`,
        { payment_status: newStatus }, // Data status pembayaran yang akan diperbarui
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token autentikasi untuk user
          },
        }
      );

      // Jika pembaruan berhasil
      if (response.status === 200) {
        // Perbarui state payments dengan status baru
        const updatedOrders = payments.map((payment) =>
          payment.id === id
            ? { ...payment, payment_status: newStatus } // Perbarui status pada data yang sesuai
            : payment
        );
        setPayments(updatedOrders); // Simpan data yang sudah diperbarui ke state
        setEditedPayments({}); // Kosongkan state editedPayments
        Swal.fire({
          title: "Success!", // Tampilkan pesan sukses
          text: "Payment updated successfully!",
          icon: "success",
          timer: 4000, // Tampilkan selama 4 detik
          draggable: true,
        });
      } else {
        Swal.fire({
          icon: "error", // Tampilkan pesan error
          title: "Oops...",
          text: "An error occurred while updating the payment!",
        });
      }
    } catch (error) {
      console.error(error); // Log error ke console
      Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error"); // Tampilkan pesan error
    }
  };

  // Fungsi untuk menghapus data pembayaran
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?", // Konfirmasi sebelum menghapus data
      text: "You won't be able to revert this!", // Pesan peringatan
      icon: "warning", // Ikon peringatan
      showCancelButton: true, // Tampilkan tombol cancel
      confirmButtonColor: "#3085d6", // Warna tombol konfirmasi
      cancelButtonColor: "#d33", // Warna tombol batal
      confirmButtonText: "Yes, delete it!", // Teks tombol konfirmasi
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Kirim permintaan DELETE ke endpoint /api/payments/{id}
          const response = await axios.delete(`/api/payments/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Token autentikasi untuk user
            },
          });

          // Jika penghapusan berhasil
          if (response.data.status === "success") {
            Swal.fire({
              title: "Deleted!", // Pesan sukses
              text: "Your data has been deleted.",
              icon: "success",
            });
            fetchPayments(); // Perbarui daftar pembayaran setelah data dihapus
          }
        } catch (error) {
          console.error(error); // Log error ke console
          Swal.fire({
            title: "Error", // Pesan error
            text: error.response?.data?.message || "Delete failed", // Tampilkan pesan error dari server jika ada
            icon: "error",
          });
        }
      }
    });
  };

  // Filter products based on search term
  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Payments Management
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search payments..."
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
                  "Name",
                  "Order",
                  "Payment Method",
                  "Payment Status",
                  "Transaction",
                  "Amount",
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
                currentPayments.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.order_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.payment_method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        // Nilai yang ditampilkan di input berasal dari:
                        // 1. Jika ada perubahan pada pembayaran yang sedang diedit (editedPayments[item.id]?.payment_status), gunakan nilai tersebut.
                        // 2. Jika tidak ada perubahan, gunakan nilai default dari item.payment_status.
                        value={
                          editedPayments[item.id]?.payment_status ||
                          item.payment_status
                        }
                        // Fungsi yang dijalankan ketika nilai input berubah
                        onChange={(e) => {
                          // Perbarui state editedPayments dengan data baru
                          setEditedPayments({
                            ...editedPayments, // Salin seluruh data yang sudah ada di editedPayments
                            [item.id]: {
                              // Tentukan pembayaran yang sedang diubah berdasarkan item.id
                              ...editedPayments[item.id], // Salin data sebelumnya untuk pembayaran tersebut (jika ada)
                              payment_status: e.target.value, // Perbarui status pembayaran dengan nilai baru dari input
                            },
                          });
                          // Tunggu selama 500ms sebelum memanggil fungsi handleUpdateStatus
                          setTimeout(() => {
                            // Panggil fungsi handleUpdateStatus untuk memperbarui status pembayaran di server
                            handleUpdateStatus(item.id, e.target.value);
                          }, 500);
                        }}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.transaction_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amount}
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
                  {Math.min(endIndex, filteredPayments.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredPayments.length}</span>{" "}
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

export default PaymentsAdmin;
