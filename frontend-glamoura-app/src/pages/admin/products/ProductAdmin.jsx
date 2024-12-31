import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import ProductImage1 from "../../../assets/images/red_tshirt.jpg";
import ProductImage2 from "../../../assets/images/black_jacket.jpg";
import ProductImage3 from "../../../assets/images/blue_jeans.jpg";
import ProductImage4 from "../../../assets/images/running_shoes.jpg";
import ProductImage5 from "../../../assets/images/summer_dress.jpg";
import ProductImage6 from "../../../assets/images/leather_wallet.jpg";
import ProductImage7 from "../../../assets/images/white_tshirt.jpg";
import ProductImage8 from "../../../assets/images/red_dress.jpg";
import ProductImage9 from "../../../assets/images/high_heels.jpg";
import ProductImage10 from "../../../assets/images/blue_scarf.jpg";
import ProductImage11 from "../../../assets/images/T-Shirt1.jpg";
import ProductImage12 from "../../../assets/images/T-Shirt2.jpg";
import ProductImage13 from "../../../assets/images/T-Shirt3.jpg";
import ProductImage14 from "../../../assets/images/T-Shirt4.jpg";
import ProductImage15 from "../../../assets/images/Jacket1.jpg";
import ProductImage16 from "../../../assets/images/Jacket2.jpg";
import ProductImage17 from "../../../assets/images/jacket3.jpg";
import ProductImage18 from "../../../assets/images/Jacket4.jpg";
import ProductImage20 from "../../../assets/images/Pant1.jpg";
import ProductImage21 from "../../../assets/images/Pant2.jpg";
import ProductImage22 from "../../../assets/images/Pant3.jpg";
import ProductImage23 from "../../../assets/images/Pant4.jpg";
import ProductImage24 from "../../../assets/images/Pant5.jpg";
import ProductImage25 from "../../../assets/images/shoes1.jpg";
import ProductImage26 from "../../../assets/images/shoes2.jpg";
import ProductImage27 from "../../../assets/images/shoes3.jpg";
import ProductImage29 from "../../../assets/images/Dresses1.jpg";
import ProductImage30 from "../../../assets/images/Dresses2.jpg";
import ProductImage31 from "../../../assets/images/Dresses3.jpg";
import ProductImage33 from "../../../assets/images/Kacamata-Hitam-Unisex.jpg";
import ProductImage34 from "../../../assets/images/cincin-emas.jpg";
import ProductImage35 from "../../../assets/images/gesper.jpg";
import ProductImage36 from "../../../assets/images/kalung.jpg";
import ProductImage37 from "../../../assets/images/topi.jpg";
import ProductImage38 from "../../../assets/images/topi3.jpg";
import ProductImage39 from "../../../assets/images/topi4.jpg";
import ProductImage40 from "../../../assets/images/topi5.jpg";
import ProductImage41 from "../../../assets/images/topi6.jpg";
import ProductImage42 from "../../../assets/images/topi7.jpg";



function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const itemsPerPage = 5;

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

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          const response = await axios.delete(`/api/products/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          if (response.data.status === "success") {
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
            fetchProducts();
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
  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Products Management
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to={`/admin/products/create`}>
            <button className="bg-green-500 px-3 py-2 rounded-lg font-semibold text-white hover:bg-green-600 transition duration-300 ease-in-out text-sm md:text-base">
              Add Product
            </button>
          </Link>
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
                  "Name",
                  "Categories",
                  "Description",
                  "Price",
                  "Stock",
                  "Image",
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
                currentProducts.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.categories}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.stock > 10
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.image && (
                        <img
                          src={productImages[item.image] || item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      )}
                    </td>
                    {role === 'admin' &&(
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
                  {Math.min(endIndex, filteredProducts.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
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

export default ProductAdmin;
