import { useState } from "react";
import API from "../../api/axios";

export default function AddCollection() {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const makeSlug = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Enter collection name");

    try {
      setLoading(true);

      const slug = makeSlug(name);

      await API.post(
        "/collections",
        {
          name: name.trim(),
          slug
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Collection Added");

      setName("");

    } catch (err) {
      console.log("ADD COLLECTION ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Collection creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-6 max-w-md">

      <h2 className="text-xl font-bold mb-4">Add Collection</h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          value={name}
          placeholder="Collection Name"
          className="border p-3 rounded w-full"
          onChange={e => setName(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Collection"}
        </button>

      </form>

    </div>
  );
}
