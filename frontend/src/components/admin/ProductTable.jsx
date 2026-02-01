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

      setProducts(res.data.products || []);
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
        ? product.stock < 10
        : product.stock > 0;

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
    } catch (err) {
      alert("Delete failed");
    }
  };

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-4 border-b flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <h3 className="font-bold text-lg">Products</h3>

        <div className="flex flex-wrap gap-3 items-center">

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            className="border rounded-xl px-4 py-2 text-sm w-48"
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
            {[...new Set(safeProducts.map(p => p.category?.name))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
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
        <tbody>

          <tr className="border-b bg-gray-50">
            <td className="p-4">
              <input
                type="checkbox"
                checked={
                  paginatedProducts.length > 0 &&
                  paginatedProducts.every((p) =>
                    selectedIds.includes(p._id)
                  )
                }
                onChange={toggleSelectAll}
                className="w-5 h-5"
              />
            </td>
            <td colSpan="5" className="font-semibold">
              Select All (This Page)
            </td>
          </tr>

          {paginatedProducts.map((product) => (

            <tr key={product._id} className="border-b hover:bg-gray-50">

              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product._id)}
                  onChange={() => toggleSelect(product._id)}
                  className="w-5 h-5"
                />
              </td>

              <td className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.colors?.[0]?.images?.[0] || "/products/placeholder.png"}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      SKU: {product.sku || "N/A"}
                    </p>
                  </div>
                </div>
              </td>

              <td>{product.category?.name}</td>
              <td className="font-semibold">₹{product.price}</td>

              <td>
                <span className={`font-bold ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                  {product.stock}
                </span>
              </td>

              <td className="text-right p-4">

                <button
                  onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                  className="text-blue-600 font-semibold text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 font-semibold text-sm ml-4"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="p-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                page === currentPage
                  ? "bg-black text-white"
                  : "border hover:bg-gray-100"
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
