import { useState,useEffect } from "react";

const AddCategory = ({ refresh }) => {

 const [name,setName]=useState("");
 const [collection,setCollection]=useState("");
 const [gender,setGender]=useState("");
 const [collections,setCollections]=useState([]);
 const [message,setMessage]=useState("");
 const [selectedCollectionName,setSelectedCollectionName]=useState("");

 useEffect(()=>{
  fetch("http://localhost:4000/api/collections")
   .then(r=>r.json())
   .then(setCollections);
 },[]);

 const submitHandler = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:4000/api/categories",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${localStorage.getItem("admin_token")}`
   },
   body:JSON.stringify({
    name,
    collection,
    gender:selectedCollectionName==="kids"?gender:null
   })
  });

  const data = await res.json();

  if(res.ok){
   setMessage("Category added");
   setName("");
   setCollection("");
   setGender("");
   refresh();
  }else{
   setMessage(data.message);
  }
 };

 return(
  <div className="p-8 max-w-md">

   <h1 className="text-3xl font-bold mb-6">Add Category</h1>

   {message && <p className="mb-4 text-sm">{message}</p>}

   <form onSubmit={submitHandler} className="space-y-4">

    {/* COLLECTION */}

    <select
     value={collection}
     onChange={e=>{
      const selected=collections.find(c=>c._id===e.target.value);
      setCollection(e.target.value);
      setSelectedCollectionName(selected?.name?.toLowerCase());
      setGender("");
     }}
     className="w-full border p-3 rounded"
     required
    >
     <option value="">Select Collection</option>

     {collections.map(c=>(
      <option key={c._id} value={c._id}>
       {c.name}
      </option>
     ))}
    </select>

    {/* KIDS GENDER */}

    {selectedCollectionName==="kids" && (

     <select
      value={gender}
      onChange={e=>setGender(e.target.value)}
      className="w-full border p-3 rounded"
      required
     >
      <option value="">Select Gender</option>
      <option value="boys">Boys</option>
      <option value="girls">Girls</option>
     </select>

    )}

    <input
     value={name}
     onChange={e=>setName(e.target.value)}
     placeholder="Category name"
     className="w-full border p-3 rounded"
     required
    />

    <button className="bg-black text-white px-5 py-3 rounded w-full">
     Add Category
    </button>

   </form>

  </div>
 );
};

export default AddCategory;
