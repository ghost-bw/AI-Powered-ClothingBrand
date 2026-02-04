import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function DeleteCollection() {

  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/collections", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // show ONLY active collections
      const active = (res.data || []).filter(c => !c.isDeleted);

      setCollections(active);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this collection?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/collections/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Collection deleted");
      fetchCollections();

    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border p-6">

      <h2 className="text-2xl font-bold mb-6">Manage Collections</h2>

      <div className="space-y-3">

        {collections.map(c => (
          <div key={c._id} className="flex justify-between items-center border p-3 rounded">

            <span className="font-medium">{c.name}</span>

            <button
              onClick={() => handleDelete(c._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>

          </div>
        ))}

        {collections.length === 0 && (
          <p className="text-gray-500 text-center">No collections</p>
        )}

      </div>

    </div>
  );
}
