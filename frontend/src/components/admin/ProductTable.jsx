import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const ITEMS_PER_PAGE = 5;

export default function ProductTable() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(list || []);

    } catch (err) {
      console.log("Product table fetch error:", err);
    }
  };

  const safeProducts = Array.isArray(products) ? products : [];

  /* ================= FILTER ================= */

  const filteredProducts = safeProducts.filter((product) => {
    const matchSearch =
      product?.name?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product?.category?.name === category;

    const matchStock =
      stockFilter === "All"
        ? true
        : stockFilter === "Low"
        ? (product.stock ?? 0) < 10
        : (product.stock ?? 0) > 0;

    return matchSearch && matchCategory && matchStock;
  });

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ================= CHECKBOX ================= */

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pageIds = paginatedProducts.map((p) => p._id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));

    setSelectedIds(
      allSelected
        ? selectedIds.filter((id) => !pageIds.includes(id))
        : [...new Set([...selectedIds, ...pageIds])]
    );
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      {/* HEADER CONTROLS */}
      <div className="p-4 border-b flex flex-wrap gap-3 justify-between">

        <h3 className="font-bold text-lg">Products</h3>

        <div className="flex gap-3 flex-wrap">

          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            className="border rounded-xl px-4 py-2 text-sm"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              resetPage();
            }}
            className="border rounded-xl px-3 py-2 text-sm"
          >
            <option value="All">All Categories</option>
            {[...new Set(safeProducts.map(p => p.category?.name).filter(Boolean))].map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value);
              resetPage();
            }}
            className="border rounded-xl px-3 py-2 text-sm"
          >
            <option value="All">All Stock</option>
            <option value="Low">Low Stock</option>
            <option value="In">In Stock</option>
          </select>

          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold"
          >
            + Add Product
          </button>

        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">

        {/* TABLE HEADER */}
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">✓</th>
            <th className="p-4">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>

          {paginatedProducts.map(product => (

            <tr key={product._id} className="border-t hover:bg-gray-50">

              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product._id)}
                  onChange={() => toggleSelect(product._id)}
                />
              </td>

              <td className="p-4 flex items-center gap-4">

                <img
                  src={
                    product.colors?.find(c => c.images?.length)?.images?.[0] ||
                    "/products/placeholder.png"
                  }
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-xs text-gray-500">SKU: {product.sku || "N/A"}</p>
                </div>

              </td>

              <td className="p-4">{product.category?.name || "N/A"}</td>

              <td className="p-4 font-semibold">₹{product.price || 0}</td>

              <td className="p-4">
                <span className={(product.stock ?? 0) < 10 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>
                  {product.stock ?? 0}
                </span>
              </td>

              <td className="p-4 text-right">
                <button
                  onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                  className="text-blue-600 text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 text-sm font-semibold ml-4"
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>
      </table>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="p-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                page === currentPage ? "bg-black text-white" : "border"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
