import { useState } from "react";

const AddCategory = ({ refresh }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
console.log("TOKEN =>", localStorage.getItem("admin_token"));

    const res = await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Category added successfully");
      setName("");
      refresh(); // 🔥 THIS updates dashboard
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Add Category</h1>

      {message && <p className="mb-4 text-sm">{message}</p>}

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <button className="bg-black text-white px-5 py-3 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
