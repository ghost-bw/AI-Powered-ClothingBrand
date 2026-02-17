import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import API from "../../api/axios";import {
  FiEdit,
  FiPlus,
  FiX,
  FiLock,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

export default function Profile() {
  const [editOpen, setEditOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
const outlet = useOutletContext() || {};
const user = outlet.user || null;
const orders = outlet.orders || [];

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const [cards, setCards] = useState([
    { number: "**** **** **** 4589", expiry: "08/27" },
  ]);

  const [newCard, setNewCard] = useState({ number: "", expiry: "" });

   useEffect(() => {
    if (user) {
      const data = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
      };

      setProfile(data);
      setTempProfile(data);
    }
  }, [user]);
  const totalOrders = orders.length;

const delivered = orders.filter(o => o?.status === "Delivered").length;

const inTransit = orders.filter(
  o => o?.status === "Processing" || o?.status === "Shipped"
).length;

const cancelled = orders.filter(o => o?.status === "Cancelled").length;

  
const saveProfile = async () => {
  try {
    const res = await API.put("/user/dashboard/profile", tempProfile);

    setProfile({
      name: res.data.user.name || "",
      email: res.data.user.email || "",
      phone: res.data.user.phone || "",
      location: res.data.user.location || "",
    });

    setTempProfile({
      name: res.data.user.name || "",
      email: res.data.user.email || "",
      phone: res.data.user.phone || "",
      location: res.data.user.location || "",
    });

    setEditOpen(false);
  } catch (err) {
    console.log("SAVE ERROR:", err.response?.data || err.message);
  }
};

const addCard = () => {
    if (!newCard.number || !newCard.expiry) return;

    setCards([
      ...cards,
      {
        number: "**** **** **** " + newCard.number.slice(-4),
        expiry: newCard.expiry,
      },
    ]);

    setNewCard({ number: "", expiry: "" });
    setCardOpen(false);
  };

  return (
    <div className="space-y-6 md:space-y-10 px-3 sm:px-4 md:px-0 pb-10">
      {/* Hero */}

      <div className="rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-9 bg-white border border-gray-200 shadow-sm md:shadow-md hover:shadow-lg transition">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-black text-white flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold shadow">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black leading-tight">
                Welcome,
                <br className="sm:hidden" />
                {profile.name}
              </h2>

              <p className="text-xs sm:text-sm text-gray-500">
                Manage your account & orders
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => {
              setTempProfile(profile);
              setEditOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 bg-black text-white font-semibold hover:bg-gray-800 active:scale-[0.98] transition cursor-pointer"
          >
            <FiEdit />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
  { label: "Total Orders", value: totalOrders, icon: FiPackage },
  { label: "Delivered", value: delivered, icon: FiCheckCircle },
  { label: "In Transit", value: inTransit, icon: FiTruck },
  { label: "Cancelled", value: cancelled, icon: FiXCircle },
].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm md:shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-default"
          >
            <div className="h-9 w-9 md:h-11 md:w-11 rounded-lg md:rounded-xl bg-gray-100 flex items-center justify-center mb-2 md:mb-3">
              <item.icon className="text-black text-lg md:text-xl" />
            </div>

            <p className="text-xs md:text-sm text-gray-500">{item.label}</p>

            <p className="text-lg md:text-2xl font-bold text-black">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Info,Security */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card title="Personal Information">
          <InfoRow icon={FiUser} value={profile.name} />
          <InfoRow icon={FiMail} value={profile.email} />
          <InfoRow icon={FiPhone} value={profile.phone} />
          <InfoRow icon={FiMapPin} value={profile.location} />
        </Card>

        <Card title="Account Security">
          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition cursor-pointer"
          >
            <FiLock />
            Change Password
          </button>

          <p className="mt-3 text-sm font-medium text-green-600">
            &#10004; Two-Step Verification Enabled
          </p>
        </Card>
      </div>

      {/* Payment */}

      <Card title="Saved Payment Methods">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-xl md:rounded-2xl p-5 bg-black text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition"
            >
              <p className="font-semibold tracking-wider text-sm md:text-base">
                {card.number}
              </p>

              <p className="text-xs md:text-sm opacity-80">
                Expiry {card.expiry}
              </p>
            </div>
          ))}

          <button
            onClick={() => setCardOpen(true)}
            className="rounded-xl md:rounded-2xl p-5 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-black hover:bg-gray-100 hover:border-black transition cursor-pointer"
          >
            <FiPlus />
            Add new card
          </button>
        </div>
      </Card>

      {/* Edit Modal */}

      {editOpen && (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <Input
            label="Name"
            value={tempProfile.name}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, name: e.target.value })
            }
          />

          <Input
            label="Email"
            value={tempProfile.email}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, email: e.target.value })
            }
          />

          <Input
            label="Phone"
            value={tempProfile.phone}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, phone: e.target.value })
            }
          />

          <Input
            label="Location"
            value={tempProfile.location}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, location: e.target.value })
            }
          />

          <ModalFooter
            onCancel={() => setEditOpen(false)}
            onSave={saveProfile}
          />
        </Modal>
      )}

      {/* Card Modal*/}

      {cardOpen && (
        <Modal title="Add New Card" onClose={() => setCardOpen(false)}>
          <Input
            label="Card Number"
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
          />

          <Input
            label="Expiry"
            value={newCard.expiry}
            onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
          />

          <ModalFooter onCancel={() => setCardOpen(false)} onSave={addCard} />
        </Modal>
      )}

      {/* Password */}

      {passwordOpen && (
        <Modal title="Change Password" onClose={() => setPasswordOpen(false)}>
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm Password" type="password" />

          <ModalFooter
            onCancel={() => setPasswordOpen(false)}
            onSave={() => setPasswordOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

/* Card */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm md:shadow-md hover:shadow-xl transition">
    <h3 className="font-semibold mb-4 md:mb-5 text-base md:text-lg text-black">
      {title}
    </h3>
    {children}
  </div>
);

/* INFO */

const InfoRow = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-3 mb-2 md:mb-3 text-gray-700">
    <Icon className="text-black text-base md:text-lg" />
    <span className="text-sm">{value}</span>
  </div>
);

/* MODAL */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl md:rounded-2xl w-full max-w-md p-5 md:p-6 relative shadow-xl animate-in fade-in zoom-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FiX />
      </button>

      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

/* Input */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>

    <input
      {...props}
      className="w-full rounded-xl px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm"
    />
  </div>
);

/* Footer */

const ModalFooter = ({ onCancel, onSave }) => (
  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
    <button
      onClick={onCancel}
      className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition cursor-pointer"
    >
      Cancel
    </button>

    <button
      onClick={onSave}
      className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition cursor-pointer"
    >
      Save
    </button>
  </div>
);
