import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    description: "",
    fabric: "",
    material: "",
    care: "",
    weight: "",
    dimensions: "",
    origin: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load categories
  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
  }, []);

  // Load product
  useEffect(() => {
    API.get("/").then(res => {
      const product = res.data.products.find(p => p._id === id);

      if (product) {
        setFormData({
          ...product,
          category: product.category?._id,
        });
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach(key => {
  if (formData[key] !== null && formData[key] !== "null") {
    data.append(key, formData[key]);
  }
});
    data.set("price", Number(formData.price || 0));
data.set("discountPrice", formData.discountPrice ? Number(formData.discountPrice) : "");
data.set("stock", formData.stock ? Number(formData.stock) : "");


      images.forEach(img => data.append("images", img));

      await API.put(`/products/${id}`, data);

      alert("✅ Product updated successfully");
      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

  <h1 className="text-3xl font-bold mb-6">Update Product</h1>

  <form onSubmit={handleSubmit} className="space-y-4">

    <div>
      <label className="font-medium">Product Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded mt-1"
      />
    </div>

    <div>
      <label className="font-medium">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded mt-1"
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="font-medium">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded mt-1"
      />
    </div>

    <div>
      <label className="font-medium">Price</label>
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="border p-3 rounded w-full mt-1"
      />
    </div>

    <div>
      <label className="font-medium">Discount Price</label>
      <input
        name="discountPrice"
        value={formData.discountPrice || ""}
        onChange={handleChange}
        className="border p-3 rounded w-full mt-1"
      />
    </div>

    <div>
      <label className="font-medium">Product Images</label>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="mt-1"
      />
    </div>

    <button className="w-full bg-black text-white py-3 rounded">
      Update Product
    </button>

  </form>
</div>

  );
};

export default EditProduct;
