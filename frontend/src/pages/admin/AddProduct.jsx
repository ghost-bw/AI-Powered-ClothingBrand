import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../api/axios";

const AddProduct = () => {
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
  const [images, setImages] = useState([]); // new state for images
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // allow multiple images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("discountPrice", formData.discountPrice);
      data.append("stock", formData.stock);
      data.append("sku", formData.sku);
      data.append("description", formData.description);
      data.append("fabric", formData.fabric);
      data.append("material", formData.material);
      data.append("care", formData.care);
      data.append("weight", formData.weight);
      data.append("dimensions", formData.dimensions);
      data.append("origin", formData.origin);

      images.forEach((img) => data.append("images", img)); // append all images

      const res = await axios.post("/admin/products", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Reset form
      setFormData({
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
      setImages([]);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
          <input
            name="discountPrice"
            type="number"
            placeholder="Discount Price"
            value={formData.discountPrice}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-3 rounded"
          />
          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        {/* Product Details */}
        <h2 className="text-xl font-semibold mt-6">Product Details</h2>
        <input
          name="fabric"
          placeholder="Fabric"
          value={formData.fabric}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="care"
          placeholder="Care Instructions"
          value={formData.care}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            className="border p-3 rounded"
          />
          <input
            name="dimensions"
            placeholder="Dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>
        <input
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Image Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border p-3 w-full rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
