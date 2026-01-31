import Sidebar from "../../../components/admin/Sidebar";

import { motion } from "framer-motion";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 max-w-[1200px]"
      >
        <h1 className="text-3xl font-black mb-2">Settings</h1>
        <p className="text-gray-500 mb-8">
          Manage your account & application preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile */}
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-bold mb-4">Profile Settings</h2>
            <input className="input" placeholder="Full Name" />
            <input className="input mt-3" placeholder="Email Address" />
            <button className="btn-primary mt-4">
              Save Changes
            </button>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-bold mb-4">Preferences</h2>

            <label className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked />
              Email Notifications
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Dark Mode (coming soon)
            </label>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
