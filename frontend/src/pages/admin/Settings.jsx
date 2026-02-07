import Sidebar from "../../components/admin/Sidebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Header from "../../components/admin/Header";

export default function Settings() {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [avatar, setAvatar] = useState("");
 const [loading, setLoading] = useState(false);

 /* LOAD ADMIN */
 useEffect(() => {
  loadProfile();
 }, []);

 const loadProfile = async () => {
  try {
   const res = await API.get("/admin/profile");
   setEmail(res.data.email);
   setAvatar(res.data.avatar);
  } catch (err) {
   console.log(err);
  }
 };

 /* UPDATE EMAIL */
 const saveEmail = async () => {
  try {
   setLoading(true);
   await API.put("/admin/email", { email });
   alert("Email updated");
  } catch (err) {
   alert("Email update failed");
  } finally {
   setLoading(false);
  }
 };

 /* UPDATE PASSWORD */
 const savePassword = async () => {
  if (!password) return alert("Enter new password");

  try {
   setLoading(true);
   await API.put("/admin/password", { password });
   setPassword("");
   alert("Password updated");
  } catch (err) {
   alert("Password update failed");
  } finally {
   setLoading(false);
  }
 };

 /* UPLOAD AVATAR */
 const uploadAvatar = async (file) => {
  try {
   const form = new FormData();
   form.append("avatar", file);

   const res = await API.put("/admin/avatar", form);
   setAvatar(res.data.avatar);

   alert("Avatar updated");
  } catch (err) {
   alert("Avatar upload failed");
  }
 };

return (
 <div className="flex min-h-screen bg-gray-50">
  <Sidebar />

  <div className="flex-1 flex flex-col">
         <Header />
 
  <motion.main
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.4 }}
   className="flex-1 px-10 py-8 max-w-[1200px] mx-auto"
  >

   {/* HEADER */}

   <div className="mb-10">
    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
     Settings / Profile
    </p>

    <h1 className="text-3xl font-extrabold">Account Settings</h1>
    <p className="text-gray-500 mt-1">
     Manage your admin account preferences
    </p>
   </div>

   <div className="grid lg:grid-cols-3 gap-8">

    {/* LEFT SIDE */}

    <div className="lg:col-span-2 space-y-6">

     {/* IDENTITY */}

     <div className="bg-white border rounded-2xl p-6">

      <h2 className="font-semibold mb-4">Identity</h2>

      <div className="flex items-center gap-6">

       <img
        src={avatar || "https://i.pravatar.cc/120"}
        className="w-20 h-20 rounded-full border object-cover"
       />

       <div>
        <p className="text-sm text-gray-500 mb-2">
         Recommended 800×800 JPG or PNG
        </p>

        <input
         type="file"
         onChange={(e) => uploadAvatar(e.target.files[0])}
        />
       </div>

      </div>

     </div>

     {/* EMAIL */}

     <div className="bg-white border rounded-2xl p-6">

      <h2 className="font-semibold mb-4">Email Address</h2>

      <input
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="w-full border border-gray-300 rounded-xl px-4 py-3
       focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
       onClick={saveEmail}
       disabled={loading}
       className="mt-4 bg-black text-white px-6 py-2 rounded-xl
       hover:bg-gray-900 disabled:opacity-50"
      >
       Save Email
      </button>

     </div>

     {/* PASSWORD */}

     <div className="bg-white border rounded-2xl p-6">

      <h2 className="font-semibold mb-4">Change Password</h2>

      <input
       type="password"
       placeholder="New password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="w-full border border-gray-300 rounded-xl px-4 py-3
       focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
       onClick={savePassword}
       disabled={loading}
       className="mt-4 bg-black text-white px-6 py-2 rounded-xl
       hover:bg-gray-900 disabled:opacity-50"
      >
       Update Password
      </button>

     </div>

    </div>

   </div>

  </motion.main>
 </div>
 </div>
);

}
