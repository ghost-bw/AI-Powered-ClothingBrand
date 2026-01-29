import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

// User pages/components
import Home from "./pages/user/Home";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import CheckoutPage from "./pages/user/Checkout";
import CollectionsPage from "./pages/user/Collections";
import UserSignup from "./pages/user/UserSignup";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import AddCategory from "./pages/admin/AddCategory";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminOtp from "./pages/admin/AdminOtp";
import Dashboard from "./pages/admin/Dashboard";
import AdminCollections from "./pages/admin/AdminCollections";
import EditProduct from "./pages/admin/EditProduct";


// Layout components
import Navbar from "./components/Home/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/admin/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<><Navbar /><Cart /></>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/collections" element={<CollectionsPage />} />

          {/* User Auth */}
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/login" element={<UserLogin />} />

          {/* Protected User Dashboard */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/otp" element={<AdminOtp />} />

          {/* Protected Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/products/add"
  element={
    <ProtectedRoute role="admin">
      <AddProduct />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/categories/add"
  element={
    <ProtectedRoute role="admin">
      <AddCategory />
    </ProtectedRoute>
  }
/>
import NotFound from "./pages/NotFound";


<Route path="*" element={<NotFound />} />
<Route path="/admin/products" element={<AdminCollections />} />
<Route path="/admin/products/edit/:id" element={<EditProduct />} />


        </Routes>
      </ShopProvider>
    </BrowserRouter>
  );
};

export default App;
