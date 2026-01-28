import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/admin/products" className="hover:text-gray-300">
          Products
        </Link>

        <Link to="/admin/products/add" className="hover:text-gray-300">
          Add Product
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
