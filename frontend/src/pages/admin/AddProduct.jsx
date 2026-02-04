import { useState, useEffect } from "react";
import API from "../../api/axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPercent: "",
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
    sizes: "",
    collections: [],
    isTrending: false,
    isBrandStory: false,
  });

  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);
  const [gender, setGender] = useState("");
  const [selectedCollectionName,setSelectedCollectionName]=useState("");


  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
    fetch("/api/collections").then((r) => r.json()).then(setCollectionsList);
  }, []);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    const price = Number(formData.price || 0);
    const percent = Number(formData.discountPercent || 0);
    const discountPrice = Math.round(price - (price * percent) / 100);

    Object.keys(formData).forEach((k) => {
      if (k === "sizes")
        data.append("sizes", JSON.stringify(formData.sizes.split(",")));
      else if (k === "collections")
        data.append("collections", JSON.stringify(formData.collections));
      else if (k === "discountPrice") data.append("discountPrice", discountPrice);
      else data.append(k, formData[k]);
    });

    data.append("gender", gender);

    data.append(
      "details",
      JSON.stringify({
        fabric: formData.fabric,
        material: formData.material,
        care: formData.care,
        weight: formData.weight,
        dimensions: formData.dimensions,
        origin: formData.origin,
        stock: formData.stock,
      })
    );

    data.append(
      "colors",
      JSON.stringify(
        colors.map((c) => ({
          name: c.name,
          hex: c.hex,
        }))
      )
    );

    colors.forEach((color, i) => {
      color.images.forEach((img) => {
        data.append(`colorImages_${i}`, img);
      });
    });
console.log("FORM DATA COLLECTIONS:", formData.collections);

    await API.post("/products", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    alert("✅ Product Added Successfully");
  };

  /* ================= CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...formData, [name]: value };

    if (name === "price" || name === "discountPercent") {
      const price = Number(name === "price" ? value : updated.price);
      const percent = Number(
        name === "discountPercent" ? value : updated.discountPercent
      );

      updated.discountPrice = Math.round(price - (price * percent) / 100);
    }

    setFormData(updated);
  };

  const addColor = () => {
    setColors([...colors, { name: "", hex: "", images: [] }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* COLLECTION FIRST */}
      <select
 className="border-2 p-3 rounded w-full"
 onChange={(e)=>{

  const selected = collectionsList.find(c=>c._id===e.target.value);

  setFormData({
   ...formData,
   collections:[e.target.value]
  });

  setSelectedCollectionName(selected?.name?.toLowerCase());
  setGender(""); // reset gender when collection changes
 }}
>

<option value="">Select Collection</option>

{collectionsList.map(c=>(
 <option key={c._id} value={c._id}>
  {c.name}
 </option>
))}

</select>



        {/* KIDS GENDER */}
       {selectedCollectionName === "kids" && (
<select
 className="border p-3 rounded w-full"
 onChange={e=>setGender(e.target.value)}
>
<option value="">Select Gender</option>
<option value="boys">Boys</option>
<option value="girls">Girls</option>
</select>
)}

        {/* CATEGORY */}
        <select
          name="category"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option>Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input name="name" placeholder="Product Name" onChange={handleChange} className="border p-3 rounded w-full" />

        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-3 rounded w-full" />

        {/* PRICE */}
        <div className="grid grid-cols-4 gap-4">
          <input name="price" placeholder="Price" onChange={handleChange} className="border p-3 rounded" />
          <input name="discountPercent" placeholder="Discount %" onChange={handleChange} className="border p-3 rounded" />
          <input value={formData.discountPrice} placeholder="Discounted Price" readOnly className="border p-3 rounded bg-gray-100" />
          <input name="sizes" placeholder="Sizes S,M,L" onChange={handleChange} className="border p-3 rounded" />
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4">
          <input name="fabric" placeholder="Fabric" onChange={handleChange} className="border p-3 rounded" />
          <input name="material" placeholder="Material" onChange={handleChange} className="border p-3 rounded" />
          <input name="care" placeholder="Care" onChange={handleChange} className="border p-3 rounded" />
          <input name="weight" placeholder="Weight" onChange={handleChange} className="border p-3 rounded" />
          <input name="dimensions" placeholder="Dimensions" onChange={handleChange} className="border p-3 rounded" />
          <input name="origin" placeholder="Origin" onChange={handleChange} className="border p-3 rounded" />
          <input name="stock" placeholder="Stock" onChange={handleChange} className="border p-3 rounded" />
        </div>

        {/* FLAGS */}
        <div className="flex gap-6">
          <label className="flex gap-2">
            <input type="checkbox" onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })} />
            Trending
          </label>

          <label className="flex gap-2">
            <input type="checkbox" onChange={(e) => setFormData({ ...formData, isBrandStory: e.target.checked })} />
            Brand Story
          </label>
        </div>

        {/* COLORS */}
        <h2 className="text-xl font-semibold">Colors & Images</h2>

        {colors.map((c, i) => (
          <div key={i} className="border p-4 rounded bg-gray-50">

            <div className="grid grid-cols-3 gap-3 mb-3">
              <input
                placeholder="Color Name"
                className="border p-2 rounded"
                onChange={(e) => {
                  const updated = [...colors];
                  updated[i].name = e.target.value;
                  setColors(updated);
                }}
              />

              <input
                type="color"
                onChange={(e) => {
                  const updated = [...colors];
                  updated[i].hex = e.target.value;
                  setColors(updated);
                }}
              />

              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  id={`img-${i}`}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].images = Array.from(e.target.files);
                    setColors(updated);
                  }}
                />

                <label htmlFor={`img-${i}`} className="cursor-pointer">
                  Click to upload images (min 5)
                </label>
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addColor} className="bg-gray-200 px-4 py-2 rounded">
          + Add Color
        </button>

        <button type="submit" className="w-full bg-black text-white py-3 rounded">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
