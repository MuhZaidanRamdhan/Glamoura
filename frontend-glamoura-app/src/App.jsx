import Shop from "./pages/fashionId/Shop";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import LayoutAdmin from "./layout/LayoutAdmin";
import Features from "./pages/fashionId/Features";
import AboutUs from "./pages/fashionId/AboutUs";
import Admin from "./pages/admin/Dashboard";
import CategoryById from "./pages/fashionId/CategoryById";
import ProductAdmin from "./pages/admin/products/ProductAdmin";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import CategoriesAdmin from "./pages/admin/categories/CategoriesAdmin";
import CreateCategories from "./pages/admin/categories/CreateCategories";
import EditCategories from "./pages/admin/categories/EditCategories";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/ProductDetail";
import OrderDetail from "./components/orders/OrderDetail";
import PaymentsPage from "./pages/fashionId/PaymentsPage";
import OrdersAdmin from "./pages/admin/orders/ordersAdmin";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import PaymentsAdmin from "./pages/admin/payments/PaymentsAdmin";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  const role = localStorage.getItem("role");
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Public routes using Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/user/carts" element={<Features />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/categories/:id" element={<CategoryById />} />
                <Route path="/user/orders/:id" element={<OrderDetail />} />
              </Routes>
            </Layout>
          }
        />

        {/* Admin routes using LayoutAdmin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute userRole={role}>
              <LayoutAdmin>
                <Routes>
                  <Route path="dashboard" element={<Admin />} />
                  <Route path="products" element={<ProductAdmin />} />
                  <Route path="products/create" element={<CreateProduct />} />
                  <Route path="products/:id" element={<EditProduct />} />
                  <Route path="categories" element={<CategoriesAdmin />} />
                  <Route
                    path="categories/create"
                    element={<CreateCategories />}
                  />
                  <Route path="categories/:id" element={<EditCategories />} />
                  <Route path="orders" element={<OrdersAdmin />} />
                  <Route path="users" element={<UsersAdmin />} />
                  <Route path="payments" element={<PaymentsAdmin />} />
                </Routes>
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
