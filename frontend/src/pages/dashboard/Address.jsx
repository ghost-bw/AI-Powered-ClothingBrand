import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Home,
  Building2,
  Phone,
  MapPin,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function Address() {
  const emptyForm = {
    _id: null,
    type: "Home",
    name: "",
    address: "",
    phone: "",
    default: false,
  };

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/user/dashboard/addresses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error(err);
      setAddresses([]);
    }
  };

  // ================= OPEN =================
  const openAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm(item);
    setIsEdit(true);
    setShowModal(true);
  };

  // ================= SAVE =================
  const saveAddress = async () => {
    if (!form.name || !form.address || !form.phone) return;

    const url = isEdit
      ? `http://localhost:4000/api/user/dashboard/addresses/${form._id}`
      : "http://localhost:4000/api/user/dashboard/addresses";

    const method = isEdit ? "put" : "post";

    await axios[method](url, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchAddresses();
    setShowModal(false);
  };

  // ================= DELETE =================
  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    await axios.delete(
      `http://localhost:4000/api/user/dashboard/addresses/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchAddresses();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Saved Addresses</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white
          bg-black hover:shadow-xl hover:scale-105 transition"
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addresses.map((item) => {
          const Icon = item.type === "Office" ? Building2 : Home;

          return (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl p-6 shadow-sm
              hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              {item.default && (
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Default
                </span>
              )}

              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white
                  ${
                    item.type === "Office"
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                      : "bg-gradient-to-br from-emerald-500 to-green-600"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <h4 className="text-xl font-semibold">{item.type}</h4>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-semibold text-gray-900">{item.name}</p>

                <div className="flex gap-2">
                  <MapPin size={14} className="mt-1 text-gray-400" />
                  <span>{item.address}</span>
                </div>

                <div className="flex gap-2">
                  <Phone size={14} className="text-gray-400" />
                  <span>{item.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  <Pencil size={14} /> Edit
                </button>

                <button
                  onClick={() => deleteAddress(item._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-5">
              {isEdit ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="space-y-4">
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Home</option>
                <option>Office</option>
              </select>

              <input
                placeholder="Full Name"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <textarea
                rows={3}
                placeholder="Complete Address"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <input
                placeholder="Phone Number"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.default}
                  onChange={(e) =>
                    setForm({ ...form, default: e.target.checked })
                  }
                />
                Set as default address
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveAddress}
                  className="flex-1 bg-black text-white py-3 rounded-xl text-sm"
                >
                  {isEdit ? "Update Address" : "Save Address"}
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border rounded-xl py-3 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
