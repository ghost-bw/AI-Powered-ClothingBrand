import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import API from "../../api/axios";
import {
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

  const { user,orders=[] } = useOutletContext();
  // const token = localStorage.getItem("token");

  // const [orders, setOrders] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/user/dashboard/orders/my", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setOrders(res.data))
  //     .catch(() => setOrders([]));
  // }, []);

  /* STATS */

const totalOrders = orders.length;

const delivered = orders.filter(o => o.status === "Delivered").length;

const inTransit = orders.filter(
  o => o.status === "Processing" || o.status === "Shipped"
).length;

const cancelled = orders.filter(o => o.status === "Cancelled").length;



  /* SAVE PROFILE */

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
    <div className="space-y-10">

      {/* Hero */}
      <div
        className="rounded-3xl p-7 md:p-9 text-white
        bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600
        shadow-[0_25px_70px_rgba(124,58,237,0.45)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                Welcome, {profile.name}
              </h2>
              <p className="text-sm text-white/80">
                Manage your account & orders
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setTempProfile(profile);
              setEditOpen(true);
            }}
            className="px-6 py-2.5 rounded-xl text-sm flex items-center gap-2
            bg-white text-purple-700 font-semibold
            hover:bg-purple-50 transition"
          >
            <FiEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Orders", value: totalOrders, icon: FiPackage },
          { label: "Delivered", value: delivered, icon: FiCheckCircle },
          { label: "In Transit", value: inTransit, icon: FiTruck },
          { label: "Cancelled", value: cancelled, icon: FiXCircle },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <div className="h-11 w-11 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
              <item.icon className="text-purple-600 text-xl" />
            </div>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Info + Security */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Personal Information">
          <InfoRow icon={FiUser} value={profile.name} />
          <InfoRow icon={FiMail} value={profile.email} />
          <InfoRow icon={FiPhone} value={profile.phone} />
          <InfoRow icon={FiMapPin} value={profile.location} />
        </Card>

        <Card title="Account Security">
          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold
            text-purple-600 hover:text-purple-700"
          >
            <FiLock /> Change Password
          </button>

          <p className="mt-4 text-sm font-medium text-green-600">
            ✔ Two-Step Verification Enabled
          </p>
        </Card>
      </div>

      {/* Payment */}
      <Card title="Saved Payment Methods">
        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-white
              bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600"
            >
              <p className="font-semibold tracking-wider">{card.number}</p>
              <p className="text-sm opacity-80">Expiry {card.expiry}</p>
            </div>
          ))}

          <button
            onClick={() => setCardOpen(true)}
            className="rounded-2xl p-5 flex items-center justify-center gap-2
            border-2 border-dashed border-purple-300
            text-purple-600 hover:bg-purple-50 transition"
          >
            <FiPlus /> Add new card
          </button>
        </div>
      </Card>

      {editOpen && (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <Input label="Name" value={tempProfile.name} onChange={(e)=>setTempProfile({...tempProfile,name:e.target.value})}/>
          <Input label="Email" value={tempProfile.email} onChange={(e)=>setTempProfile({...tempProfile,email:e.target.value})}/>
          <Input label="Phone" value={tempProfile.phone} onChange={(e)=>setTempProfile({...tempProfile,phone:e.target.value})}/>
          <Input label="Location" value={tempProfile.location} onChange={(e)=>setTempProfile({...tempProfile,location:e.target.value})}/>
          <ModalFooter onCancel={()=>setEditOpen(false)} onSave={saveProfile}/>
        </Modal>
      )}

      {cardOpen && (
        <Modal title="Add New Card" onClose={() => setCardOpen(false)}>
          <Input label="Card Number" value={newCard.number} onChange={e=>setNewCard({...newCard,number:e.target.value})}/>
          <Input label="Expiry" value={newCard.expiry} onChange={e=>setNewCard({...newCard,expiry:e.target.value})}/>
          <ModalFooter onCancel={()=>setCardOpen(false)} onSave={addCard}/>
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

/* helpers unchanged */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
    <h3 className="font-semibold mb-5 text-lg">{title}</h3>
    {children}
  </div>
);

const InfoRow = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-3 mb-3 text-gray-700">
    <Icon className="text-purple-600 text-lg" />
    <span className="text-sm">{value}</span>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
        <FiX />
      </button>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input {...props} className="w-full rounded-xl px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"/>
  </div>
);

const ModalFooter = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-3 pt-4">
    <button onClick={onCancel} className="px-5 py-2 rounded-xl border hover:bg-gray-100">
      Cancel
    </button>
    <button onClick={onSave} className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:opacity-95 transition">
      Save
    </button>
  </div>
);
