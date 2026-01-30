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

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/user/dashboard/addresses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setAddresses(res.data.addresses);
  };

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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Addresses</h2>
          <p className="text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition w-fit"
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      {/* ADDRESS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((item) => {
          const Icon = item.type === "Office" ? Building2 : Home;

          return (
            <div
              key={item._id}
              className="bg-white rounded-xl border p-5 relative hover:shadow-md transition"
            >
              {item.default && (
                <span className="absolute top-4 right-4 text-xs bg-black text-white px-2 py-1 rounded-full">
                  Default
                </span>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h4 className="font-semibold">{item.type}</h4>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-medium text-gray-900">{item.name}</p>

                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-1" />
                  <span>{item.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{item.phone}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-5 text-sm">
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Pencil size={14} /> Edit
                </button>

                <button
                  onClick={() => deleteAddress(item._id)}
                  className="flex items-center gap-1 text-red-500 hover:underline"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-5">
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
                type="text"
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
                type="text"
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

              <div className="flex gap-3 pt-3">
                <button
                  onClick={saveAddress}
                  className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm hover:bg-gray-800"
                >
                  {isEdit ? "Update Address" : "Save Address"}
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border rounded-lg py-2.5 text-sm"
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
