import { useState,useEffect } from "react";
import API from "../../api/axios";

const AddProduct = () => {

const [formData,setFormData] = useState({
 name:"",
 category:"",
 price:"",
 discountPercent:"",
 discountPrice:"",
 stock:"",
 sku:"",
 description:"",
 fabric:"",
 material:"",
 care:"",
 weight:"",
 dimensions:"",
 origin:"",
 sizes:"",
 collections:[],
 isTrending:false,
 isBrandStory:false
});

const [colors,setColors] = useState([]);
const [categories,setCategories] = useState([]);

useEffect(()=>{
 fetch("/api/categories").then(r=>r.json()).then(setCategories);
},[]);

// AUTO DISCOUNT
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  // ---------- AUTO DISCOUNT (SAFETY CALC) ----------
  const price = Number(formData.price || 0);
  const percent = Number(formData.discountPercent || 0);

  const discountPrice = Math.round(price - (price * percent) / 100);

  // ---------- BASIC FIELDS ----------
  Object.keys(formData).forEach((k) => {
    if (k === "sizes") data.append("sizes", JSON.stringify(formData.sizes.split(",")));
    else if (k === "collections") data.append("collections", JSON.stringify(formData.collections));
    else if (k === "discountPrice") data.append("discountPrice", discountPrice);
    else data.append(k, formData[k]);
  });

  // ---------- DETAILS ----------
  data.append(
    "details",
    JSON.stringify({
      fabric: formData.fabric,
      material: formData.material,
      care: formData.care,
      weight: formData.weight,
      dimensions: formData.dimensions,
      origin: formData.origin,
    })
  );

  // ---------- COLORS META ----------
  data.append(
    "colors",
    JSON.stringify(
      colors.map((c) => ({
        name: c.name,
        hex: c.hex,
      }))
    )
  );

  // ---------- COLORS IMAGES ----------
  colors.forEach((color, i) => {
    color.images.forEach((img) => {
      data.append(`colorImages_${i}`, img);
    });
  });
console.log("COLORS BEFORE SUBMIT:", colors);

  await API.post("/products", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  alert("✅ Product Added Successfully");
};

const handleChange = (e) => {
  const { name, value } = e.target;

  let updated = { ...formData, [name]: value };

  // Auto discount live
  if (name === "price" || name === "discountPercent") {
    const price = Number(name === "price" ? value : updated.price);
    const percent = Number(name === "discountPercent" ? value : updated.discountPercent);

    if (price && percent >= 0) {
      updated.discountPrice = Math.round(price - (price * percent) / 100);
    }
  }

  setFormData(updated);
};

const addColor = ()=>{
 setColors([...colors,{name:"",hex:"",images:[]}]);
};



return (
<div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">

<h1 className="text-3xl font-bold mb-8">Add Product</h1>

<form onSubmit={handleSubmit} className="space-y-6">

{/* BASIC */}
<div className="grid grid-cols-2 gap-4">

<input name="name" placeholder="Product Name" onChange={handleChange} className="border p-3 rounded"/>

<select name="category" onChange={handleChange} className="border p-3 rounded">
<option>Select Category</option>
{categories.map(c=>(
<option key={c._id} value={c._id}>{c.name}</option>
))}
</select>

</div>

<textarea name="description" placeholder="Description" onChange={handleChange} className="border p-3 rounded w-full"/>

{/* PRICE */}
<div className="grid grid-cols-4 gap-4">

<input name="price" placeholder="Price" onChange={handleChange} className="border p-3 rounded"/>

<input name="discountPercent" placeholder="Discount %" onChange={handleChange} className="border p-3 rounded"/>

<input value={formData.discountPrice} placeholder="Discount Price" readOnly className="border p-3 rounded bg-gray-100"/>

<input name="sizes" placeholder="Sizes S,M,L,XL" onChange={handleChange} className="border p-3 rounded"/>

</div>

{/* DETAILS */}
<h2 className="font-semibold text-lg">Product Details</h2>

<div className="grid grid-cols-2 gap-4">

<input name="fabric" placeholder="Fabric" onChange={handleChange} className="border p-3 rounded"/>
<input name="material" placeholder="Material" onChange={handleChange} className="border p-3 rounded"/>
<input name="care" placeholder="Care" onChange={handleChange} className="border p-3 rounded"/>
<input name="weight" placeholder="Weight" onChange={handleChange} className="border p-3 rounded"/>
<input name="dimensions" placeholder="Dimensions" onChange={handleChange} className="border p-3 rounded"/>
<input name="origin" placeholder="Origin" onChange={handleChange} className="border p-3 rounded"/>

</div>

{/* COLLECTIONS */}
<select multiple className="border p-3 rounded w-full h-32" onChange={e=>{
 const vals=[...e.target.selectedOptions].map(o=>o.value);
 setFormData({...formData,collections:vals});
}}>
<option>Men</option>
<option>Women</option>
<option>Kids</option>
<option>Streetwear</option>
<option>Winter</option>
</select>

{/* FLAGS */}
<div className="flex gap-8">

<label className="flex gap-2">
<input type="checkbox" onChange={e=>setFormData({...formData,isTrending:e.target.checked})}/>
Trending
</label>

<label className="flex gap-2">
<input type="checkbox" onChange={e=>setFormData({...formData,isBrandStory:e.target.checked})}/>
Brand Story
</label>

</div>

{/* COLORS */}
<div>

<h2 className="text-xl font-semibold mb-4">Colors & Images (Min 5 per color)</h2>

{colors.map((c,i)=>(
<div key={i} className="border p-4 rounded mb-4 bg-gray-50">

<div className="grid grid-cols-3 gap-3 mb-3">

<input
  placeholder="Color Name"
  onChange={(e) => {
    const updated = [...colors];
    updated[i] = { ...updated[i], name: e.target.value };
    setColors(updated);
  }}
  className="border p-2 rounded"
/>

<input
  type="color"
  onChange={(e) => {
    const updated = [...colors];
    updated[i] = { ...updated[i], hex: e.target.value };
    setColors(updated);
  }}
  className="border rounded h-10"
/>

<input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    const updated = [...colors];
    updated[i] = {
      ...updated[i],
      images: Array.from(e.target.files),
    };
    setColors(updated);
  }}
/>

</div>

<label className="text-sm text-gray-500 block mb-2">
Upload minimum 5 images for this color
</label>

<input type="file" multiple accept="image/*" onChange={e=>colors[i].images=[...e.target.files]}/>

</div>
))}

<button type="button" onClick={addColor} className="px-4 py-2 bg-gray-200 rounded">
+ Add Color
</button>

</div>

<button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
Save Product
</button>

</form>

</div>
);
};

export default AddProduct;
