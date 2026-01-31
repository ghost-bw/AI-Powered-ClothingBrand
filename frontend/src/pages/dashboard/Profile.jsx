import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiPlus, FiX, FiLock } from "react-icons/fi";

export default function Profile() {
  const { user } = useOutletContext();
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [cards, setCards] = useState([
    { number: "**** **** **** 4589", expiry: "08/27" },
  ]);

  const [tempProfile, setTempProfile] = useState(profile);
  const [newCard, setNewCard] = useState({ number: "", expiry: "" });

  /* LOAD USER */

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

  /* LOAD ORDERS */

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/dashboard/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  /* STATS */

  const totalOrders = orders.length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const inTransit = orders.filter(o => o.status === "Shipped").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  /* SAVE PROFILE */

  const handleSaveProfile = async () => {
 try {

  // console.log("SAVING PROFILE:", tempProfile);

  const res = await axios.put(
    "http://localhost:4000/api/user/dashboard/profile",
    tempProfile,
    {
      headers: { Authorization: `Bearer ${token}` },
  });

  // console.log("SERVER RESPONSE:", res.data);

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


  const handleAddCard = () => {
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
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            Welcome back, {profile.name} 👋
          </h2>
          <p className="text-sm text-gray-500">
            Manage your profile, orders and security
          </p>
        </div>

        <button
          onClick={() => {
            setTempProfile(profile);
            setEditOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <FiEdit /> Edit Profile
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: totalOrders },
          { label: "Delivered", value: delivered },
          { label: "In Transit", value: inTransit },
          { label: "Cancelled", value: cancelled },
        ].map((item, i) => (
          <div key={i} className="bg-white border rounded-xl p-5 text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* PERSONAL + SECURITY */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 space-y-2">
          <h3 className="font-semibold">Personal Information</h3>
          <p>📧 {profile.email}</p>
          <p>📞 {profile.phone}</p>
          <p>📍 {profile.location}</p>
        </div>

        <div className="bg-white border rounded-xl p-6 space-y-3">
          <h3 className="font-semibold">Account Security</h3>
          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center gap-2 text-blue-600 text-sm"
          >
            <FiLock /> Change Password
          </button>
          <p className="text-green-600 text-sm font-medium">
            Two-Step Verification Enabled
          </p>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Saved Payment Methods</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <div key={i} className="border rounded-lg p-4">
              <p className="font-medium">{card.number}</p>
              <p className="text-sm text-gray-500">Expiry {card.expiry}</p>
            </div>
          ))}

          <button
            onClick={() => setCardOpen(true)}
            className="border-dashed border rounded-lg p-4 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50"
          >
            <FiPlus /> Add new card
          </button>
        </div>
      </div>

      {/* MODALS */}

      {editOpen && (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <Input label="Name" value={tempProfile.name} onChange={e=>setTempProfile({...tempProfile,name:e.target.value})}/>
          <Input label="Email" value={tempProfile.email} onChange={e=>setTempProfile({...tempProfile,email:e.target.value})}/>
          <Input label="Phone" value={tempProfile.phone} onChange={e=>setTempProfile({...tempProfile,phone:e.target.value})}/>
          <Input label="Location" value={tempProfile.location} onChange={e=>setTempProfile({...tempProfile,location:e.target.value})}/>
          <ModalFooter onCancel={()=>setEditOpen(false)} onSave={handleSaveProfile}/>
        </Modal>
      )}

      {cardOpen && (
        <Modal title="Add New Card" onClose={() => setCardOpen(false)}>
          <Input label="Card Number" value={newCard.number} onChange={e=>setNewCard({...newCard,number:e.target.value})}/>
          <Input label="Expiry" value={newCard.expiry} onChange={e=>setNewCard({...newCard,expiry:e.target.value})}/>
          <ModalFooter onCancel={()=>setCardOpen(false)} onSave={handleAddCard}/>
        </Modal>
      )}

      {passwordOpen && (
        <Modal title="Change Password" onClose={() => setPasswordOpen(false)}>
          <Input label="Current Password" type="password"/>
          <Input label="New Password" type="password"/>
          <Input label="Confirm Password" type="password"/>
          <ModalFooter onCancel={()=>setPasswordOpen(false)} onSave={()=>setPasswordOpen(false)}/>
        </Modal>
      )}

    </div>
  );
}

/* UI helpers */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
        <FiX />
      </button>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  </div>
);

const Input = ({ label, value = "", onChange, type = "text" }) => (
 <div>
  <label className="text-sm text-gray-600">{label}</label>
  <input
   value={value}
   onChange={onChange}
   type={type}
   className="w-full border rounded-lg px-3 py-2 mt-1"
  />
 </div>
);


const ModalFooter = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-3 pt-4">
    <button onClick={onCancel} className="px-4 py-2 border rounded-lg text-sm">
      Cancel
    </button>
    <button onClick={onSave} className="px-4 py-2 bg-black text-white rounded-lg text-sm">
      Save
    </button>
  </div>
);
