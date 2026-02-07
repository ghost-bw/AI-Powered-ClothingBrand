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
    sku: "",
    description: "",
    fabric: "",
    material: "",
    care: "",
    weight: "",
    dimensions: "",
    origin: "",
    isTrending: false,
    isBrandStory: false,
    isPremium:false,
    isLimited:false
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  /* LOAD CATEGORIES */

  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
  }, []);

  /* LOAD PRODUCT */

  useEffect(() => {
    API.get("/products").then(res => {

      const product = res.data.products.find(p => p._id === id);

      if (product) {

        setFormData({
          ...product,
          category: product.category?._id,
          isTrending:Boolean(product.isTrending),
          isBrandStory:Boolean(product.isBrandStory),
          isPremium:Boolean(product.isPremium),
          isLimited:Boolean(product.isLimited)
        });

      }

    });
  }, [id]);

  /* HANDLERS */

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleCheckbox = (e) => {
    setFormData({...formData,[e.target.name]:e.target.checked});
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  /* SUBMIT */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach(k=>{
        data.append(k,formData[k]);
      });

      images.forEach(img=>data.append("images",img));

      await API.put(`/products/${id}`,data);

      alert("✅ Product Updated");
      navigate("/admin/products");

    } catch(err){
      console.log(err);
      alert("Update failed");
    }
  };

  return (

<div className="bg-gray-100 py-16">

<div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-8
shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">

<h1 className="text-3xl font-bold mb-6 text-center">Update Product</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<input name="name" value={formData.name} onChange={handleChange}
placeholder="Product Name" className="input"/>

<select name="category" value={formData.category} onChange={handleChange}
className="input">
<option value="">Select Category</option>
{categories.map(c=>(
<option key={c._id} value={c._id}>{c.name}</option>
))}
</select>

<textarea name="description" value={formData.description} onChange={handleChange}
placeholder="Description" className="input"/>

<div className="grid grid-cols-2 gap-4">

<input name="price" value={formData.price} onChange={handleChange}
placeholder="Price" className="input"/>

<input name="discountPrice" value={formData.discountPrice || ""}
onChange={handleChange} placeholder="Discount Price" className="input"/>

</div>

{/* FLAGS */}

<div className="flex flex-wrap gap-6">

{["isTrending","isBrandStory","isPremium","isLimited"].map(f=>(
<label key={f} className="flex items-center gap-2">
<input type="checkbox" name={f} checked={formData[f]} onChange={handleCheckbox}/>
{f.replace("is","")}
</label>
))}

</div>

<div>
<label className="block font-medium mb-1">Product Images</label>
<input type="file" multiple onChange={handleImageChange}/>
</div>

<button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition">
Update Product
</button>

</form>

</div>

</div>

  );
};

export default EditProduct;
