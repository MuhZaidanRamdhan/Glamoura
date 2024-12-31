import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
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
          const response = await axios.delete(`/api/categories/${id}`, {
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
            fetchCategories();
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

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    Object.values(category).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Categories Management
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to={`/admin/categories/create`}>
            <button className="bg-green-500 px-3 py-2 rounded-lg font-semibold text-white hover:bg-green-600 transition duration-300 ease-in-out text-sm md:text-base">
              Add Categories
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["No", "Name", "Description", "Action"].map((header) => (
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
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredCategories.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xl">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`${item.id}`}>
                          <button className="p-2 text-yellow-700 hover:text-yellow-900 bg-yellow-100 rounded-lg transition-all duration-300 flex items-center">
                            <FaEdit size={16} />
                          </button>
                        </Link>
                        <button
                          className="p-2 text-red-700 hover:text-red-900 bg-red-100 rounded-lg transition-all duration-300 flex items-center"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {filteredCategories.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoriesAdmin;
