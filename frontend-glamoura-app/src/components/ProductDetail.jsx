import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Star,
  Box,
  ShoppingCart,
  CreditCard,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import ProductImage1 from "../assets/images/red_tshirt.jpg";
import ProductImage2 from "../assets/images/black_jacket.jpg";
import ProductImage3 from "../assets/images/blue_jeans.jpg";
import ProductImage4 from "../assets/images/running_shoes.jpg";
import ProductImage5 from "../assets/images/summer_dress.jpg";
import ProductImage6 from "../assets/images/leather_wallet.jpg";
import ProductImage7 from "../assets/images/white_tshirt.jpg";
import ProductImage8 from "../assets/images/red_dress.jpg";
import ProductImage9 from "../assets/images/high_heels.jpg";
import ProductImage10 from "../assets/images/blue_scarf.jpg";
import ProductImage11 from "../assets/images/T-Shirt1.jpg";
import ProductImage12 from "../assets/images/T-Shirt2.jpg";
import ProductImage13 from "../assets/images/T-Shirt3.jpg";
import ProductImage14 from "../assets/images/T-Shirt4.jpg";
import ProductImage15 from "../assets/images/Jacket1.jpg";
import ProductImage16 from "../assets/images/Jacket2.jpg";
import ProductImage17 from "../assets/images/jacket3.jpg";
import ProductImage18 from "../assets/images/Jacket4.jpg";
import ProductImage19 from "../assets/images/Jacket5.jpg";
import ProductImage20 from "../assets/images/Pant1.jpg";
import ProductImage21 from "../assets/images/Pant2.jpg";
import ProductImage22 from "../assets/images/Pant3.jpg";
import ProductImage23 from "../assets/images/Pant4.jpg";
import ProductImage24 from "../assets/images/Pant5.jpg";
import ProductImage25 from "../assets/images/shoes1.jpg";
import ProductImage26 from "../assets/images/shoes2.jpg";
import ProductImage27 from "../assets/images/shoes3.jpg";
import ProductImage28 from "../assets/images/shoes4.jpg";
import ProductImage29 from "../assets/images/Dresses1.jpg";
import ProductImage30 from "../assets/images/Dresses2.jpg";
import ProductImage31 from "../assets/images/Dresses3.jpg";
import ProductImage32 from "../assets/images/Dresses4.jpg";
import ProductImage33 from "../assets/images/Kacamata-Hitam-Unisex.jpg";
import ProductImage34 from "../assets/images/cincin-emas.jpg";
import ProductImage35 from "../assets/images/gesper.jpg";
import ProductImage36 from "../assets/images/kalung.jpg";
import ProductImage37 from "../assets/images/topi.jpg";
import ProductImage38 from "../assets/images/topi3.jpg";
import ProductImage39 from "../assets/images/topi4.jpg";
import ProductImage40 from "../assets/images/topi5.jpg";
import ProductImage41 from "../assets/images/topi6.jpg";
import ProductImage42 from "../assets/images/topi7.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    "Jacket5.jpg": ProductImage19,
    "Pant1.jpg": ProductImage20,
    "Pant2.jpg": ProductImage21,
    "Pant3.jpg": ProductImage22,
    "Pant4.jpg": ProductImage23,
    "Pant5.jpg": ProductImage24,
    "shoes1.jpg": ProductImage25,
    "shoes2.jpg": ProductImage26,
    "shoes3.jpg": ProductImage27,
    "shoes4.jpg": ProductImage28,
    "Dresses1.jpg": ProductImage29,
    "Dresses2.jpg": ProductImage30,
    "Dresses3.jpg": ProductImage31,
    "Dresses4.jpg": ProductImage32,
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

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/products/${id}`);
            const productData = response.data.data;

            if (productData) {
                // Menyimpan data produk ke state
                setProduct({
                    id,
                    code: productData.code || "",
                    name: productData.name || "",
                    description: productData.description || "",
                    price: productData.price || 0,
                    stock: productData.stock || 0,
                    image: productData.image || "",
                    categories: productData.categories?.name || "Uncategorized",
                });
            } else {
                setError("Product not found"); // Menampilkan error jika produk tidak ditemukan
            }
        } catch (err) {
            setError("Error fetching product details"); // Menyimpan pesan error jika terjadi kesalahan
            console.error(err); // Log error
        } finally {
            setIsLoading(false); // Mengubah status loading menjadi false setelah selesai
        }
    };

    if (id) {
        fetchProduct(); // Memanggil fungsi fetchProduct jika id tersedia
    }
}, [id]);

// Fungsi untuk mengubah kuantitas produk berdasarkan jenis aksi (increase atau decrease)
const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < (product?.stock || 0)) {
        setQuantity(quantity + 1); // Menambah kuantitas jika masih di bawah stok
    } else if (type === "decrease" && quantity > 1) {
        setQuantity(quantity - 1); // Mengurangi kuantitas jika lebih dari 1
    }
};

// Fungsi untuk menambahkan produk ke keranjang atau langsung membeli
const addToCart = async (isBuyNow = false) => {
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    if (!token) {
        setShowLoginModal(true); // Menampilkan modal login jika token tidak tersedia
        return;
    }

    try {
        setLoading(true); // Mengaktifkan status loading
        const response = await axios.post(
            "/api/carts/create",
            {
                product_id: id, // ID produk yang ditambahkan
                quantity: quantity, // Kuantitas produk yang ditambahkan
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Menyertakan token dalam header
                },
            }
        );

        if (response.data.status === "success") {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: isBuyNow
                    ? "Product added to cart. Proceeding to checkout..." // Pesan sukses untuk "Buy Now"
                    : "Product added to cart!", // Pesan sukses untuk "Add to Cart"
                showConfirmButton: false,
                timer: 1500,
            });

            if (isBuyNow) {
                navigate("/user/carts", { state: { proceedToCheckout: true } }); // Navigasi ke halaman checkout jika "Buy Now"
            } else {
                navigate("/user/carts"); // Navigasi ke halaman keranjang jika "Add to Cart"
            }
        }
    } catch (error) {
        console.error("Error adding to cart:", error); // Log error jika gagal menambahkan ke keranjang
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data?.message || "Failed to add product to cart", // Pesan error
        });
    } finally {
        setLoading(false); // Menonaktifkan status loading setelah selesai
    }
};

// Fungsi untuk menambahkan produk ke keranjang
const handleAddToCart = () => {
    addToCart(false); // Panggil addToCart tanpa langsung checkout
};

// Fungsi untuk langsung membeli produk
const handleBuyNow = () => {
    addToCart(true); // Panggil addToCart dengan langsung checkout
};

  const displayImage =
    productImages[product?.image] || "https://via.placeholder.com/500x600";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid mt-20 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <div className="rounded-lg p-8 flex items-center justify-center">
            <img
              src={displayImage}
              alt={product?.name}
              className="max-w-full h-auto object-contain max-h-[500px]"
            />
          </div>
          <div className="flex space-x-4 mt-4 justify-center">
            <button className="bg-white border p-2 rounded-full hover:bg-gray-100">
              <Heart className="text-gray-600 hover:text-red-500" />
            </button>
            <button className="bg-white border p-2 rounded-full hover:bg-gray-100">
              <Star className="text-gray-600 hover:text-yellow-500" />
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap justify-between px-5">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="font-medium text-gray-600">Product Code:</span>
                <span className="text-gray-800">{product?.code}</span>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="font-medium text-gray-600">Category:</span>
                <span className="text-gray-800">{product?.categories}</span>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <p className="text-gray-600 mt-2">{product?.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-blue-600">
              ${product?.price}
            </span>
            {product?.stock === 0 ? (
              <div className="flex items-center space-x-2">
                <Box className="text-red-600" size={20} />
                <span className="text-red-600 font-semibold">
                  {product?.stock} in Stock
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Box className="text-green-600" size={20} />
                <span className="text-green-600 font-semibold">
                  {product?.stock} in Stock
                </span>
              </div>
            )}
          </div>

          {product?.stock === 0 ? (
            <div className="m-4">
              <span className="text-red-500 font-semibold text-lg">
                This product is out of stock
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="bg-gray-200 px-3 py-1 rounded"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          )}
          {product?.stock > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="px-6 py-2 bg-[#001219] text-white rounded-3xl shadow-xl hover:bg-[#e0e1dd] hover:text-black  transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={loading}
                className="px-6 py-2 bg-[#6f1d1b] text-white rounded-3xl shadow-xl hover:bg-[#e0e1dd] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Buy Now
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please log in to proceed.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
