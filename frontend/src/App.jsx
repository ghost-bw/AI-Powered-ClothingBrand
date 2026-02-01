import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
// import { ShopProvider } from "./context/ShopContext";

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
// import AdminCollections from "./pages/admin/AdminCollections";
import EditProduct from "./pages/admin/EditProduct";
import ProductManagement from "./pages/admin/ProductManagement";



// Layout components
import Navbar from "./components/Home/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/admin/AddProduct";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Orders from "./pages/dashboard/Orders";
import OrderDetails from "./pages/dashboard/OrderDetails";
import OrderHistory from "./pages/dashboard/OrderHistory";
import TrackOrder from "./pages/dashboard/TrackOrder";
import Address from "./pages/dashboard/Address";
import Invoices from "./pages/dashboard/Invoices";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Analytics from "./pages/admin/admindashboard/Analytics";
// import Dashboard from "./pages/admin/Dashboard";
import OrderManagement from "./pages/admin/OrderManagement";
// import OrderDetails from "./pages/admins/OrderDetails";





const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<><Navbar /><Cart /></>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/collections" element={<CollectionsPage />} />

        {/* User Auth */}

        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* User Dashboard */}

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="me" element={<Profile />} />
          <Route path="orders/my" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="track-order/:orderId" element={<TrackOrder />} />
          <Route path="address" element={<Address />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>

        {/* Admin Auth */}

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/otp" element={<AdminOtp />} />

        {/* Admin Protected */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute role="admin">
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminProtectedRoute role="admin">
              <Analytics />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute role="admin">
              <OrderManagement />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <AdminProtectedRoute role="admin">
              <OrderDetails />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute role="admin">
              <ProductManagement />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminProtectedRoute role="admin">
              <AddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminProtectedRoute role="admin">
              <EditProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/add"
          element={
            <AdminProtectedRoute role="admin">
              <AddCategory />
            </AdminProtectedRoute>
          }
        />

        {/* Redirect admin root */}

        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Not Found ALWAYS LAST */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;



