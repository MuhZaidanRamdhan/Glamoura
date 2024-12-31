import React, { useState, useEffect } from "react";
import { Menu, Search, User, LogOut, ChevronDown, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/AuthService";
import Swal from "sweetalert2";
import SearchProducts from "./SearchProduct";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Fungsi untuk mengambil data pengguna dari API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token"); // Mengambil token dari localStorage
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Menyertakan token dalam header
        },
      });

      const result = await response.json(); // Parsing respons ke JSON

      if (result.status === "success") {
        setUserData(result.data); // Menyimpan data pengguna ke state jika berhasil
      }
    } catch (error) {
      console.error("Error fetching user data:", error); // Log error jika gagal mengambil data
    }
  };

  // useEffect untuk menangani perubahan status scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10); // Update status scrolling berdasarkan posisi scroll
    };

    window.addEventListener("scroll", handleScroll); // Menambahkan event listener untuk scroll
    return () => {
      window.removeEventListener("scroll", handleScroll); // Membersihkan event listener saat komponen dilepas
    };
  }, []); // Hanya dijalankan saat komponen pertama kali dimuat

  // useEffect untuk memeriksa autentikasi dan inisialisasi role saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    const role = localStorage.getItem("role"); // Mengambil role dari localStorage

    if (token) {
      setIsLoggedIn(true); // Set status login menjadi true
      setRole(role); // Set role pengguna
      fetchUserData(); // Panggil fungsi untuk mengambil data pengguna
    } else {
      setIsLoggedIn(false); // Set status login menjadi false
      setRole(null); // Kosongkan role
      setUserData(null); // Kosongkan data pengguna
    }
  }, []); // Efek dijalankan hanya saat komponen dimuat

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    logout(); // Panggil fungsi logout
    setIsProfileOpen(false); // Tutup profil
    setIsLoggedIn(false); // Set status login menjadi false
    setRole(null); // Kosongkan role
    setUserData(null); // Kosongkan data pengguna
    localStorage.removeItem("role"); // Hapus role dari localStorage
    localStorage.removeItem("token"); // Hapus token dari localStorage
    Swal.fire({
      title: "Logged out!", // Tampilkan pesan logout
      text: "You have been successfully logged out.",
      icon: "success",
      confirmButtonText: "OK",
    });
    navigate("/login"); // Navigasi ke halaman login
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 ${
        scrolling ? "bg-white/75 shadow-md backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      {!scrolling && (
        <div className="bg-gray-100/75 backdrop-blur-lg py-2">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="text-sm text-gray-600">
              Free shipping for standard order over $100
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-sm text-gray-700 hover:text-black">
                Help & FAQs
              </a>
              <a href="#" className="text-sm text-gray-700 hover:text-black">
                My Account
              </a>
              <a href="#" className="text-sm text-gray-700 hover:text-black">
                EN
              </a>
              <a href="#" className="text-sm text-gray-700 hover:text-black">
                USD
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          <img
            src="../../src/assets/images/header-glamoura.png"
            alt="Logo"
            className="h-5"
          />
        </a>

        <ul className="hidden md:flex space-x-6">
          {role === "admin" && (
            <li>
              <a href="/admin/dashboard" className="hover:text-blue-500">
                Admin
              </a>
            </li>
          )}
          <li>
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a href="/shop" className="hover:text-blue-500">
              Shop
            </a>
          </li>
          <li>
            <a href="/user/carts" className="hover:text-blue-500 relative">
              Features
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1 rounded-full">
                hot
              </span>
            </a>
          </li>
          <li>
            <a href="/payments" className="hover:text-blue-500">
              Payments
            </a>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100/75"
              >
                <User size={20} />
                <span className="font-medium">
                  {userData ? userData.name : "Loading..."}
                </span>
                <ChevronDown size={16} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/75 backdrop-blur-lg rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium truncate">
                      {userData ? userData.email : "Loading..."}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-700">
                  Sign-In
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="px-6 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-800">
                  Sign-Up
                </button>
              </Link>
            </>
          )}
          <button
            onClick={toggleSearch}
            className="hover:text-gray-700 p-2 rounded-full hover:bg-gray-100/75"
          >
            <Search size={20} />
          </button>
        </div>

        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden h-full inset-0 shadow-md backdrop-blur-lg z-50 overflow-y">
          <div className="container mx-auto px-4 py-6">
            {/* Search bar in mobile menu */}
            <div className="mb-2">
              <button
                onClick={toggleSearch}
                className="w-full flex items-center justify-center space-x-2 px-2 py-2 bg-gray-50/75 backdrop-blur-lg rounded-lg hover:bg-gray-100/75"
              >
                <Search size={20} />
                <span>Search products...</span>
              </button>
            </div>

            {isLoggedIn && userData && (
              <div className="mb-2 p-4 bg-gray-50/75 backdrop-blur-lg rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <User size={24} className="text-gray-600" />
                  <div>
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 bg-white/75 backdrop-blur-lg rounded-lg border border-red-200 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}

            <ul className="space-y-4">
              {role === "admin" && (
                <li>
                  <a href="/admin/dashboard" className="hover:text-blue-500">
                    Admin
                  </a>
                </li>
              )}
              <li>
                <a href="/" className="block py-2">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="block py-2">
                  About
                </a>
              </li>
              <li>
                <a href="/shop" className="block py-2">
                  Shop
                </a>
              </li>
              <li>
                <a href="/user/carts" className="block py-2 relative">
                  Features
                  <span className="absolute right-0 top-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    hot
                  </span>
                </a>
              </li>
              <li>
                <a href="/payments" className="block py-2">
                  Payments
                </a>
              </li>
            </ul>

            {!isLoggedIn && (
              <div className="space-y-4 mt-6">
                <Link to={"/login"}>
                  <button className="w-full px-6 py-2 my-2 text-sm font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-700">
                    Sign-In
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className="w-full px-6 py-2 my-2 text-sm font-semibold text-white bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-800">
                    Sign-Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <SearchProducts isOpen={isSearchOpen} onClose={toggleSearch} />
    </header>
  );
};

export default Header;
