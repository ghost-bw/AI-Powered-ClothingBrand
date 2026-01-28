import { useState } from "react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Category added successfully");
      setName("");
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
