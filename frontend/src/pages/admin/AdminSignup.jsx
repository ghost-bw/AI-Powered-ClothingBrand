import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white shadow rounded-xl">
        <h2 className="text-xl mb-4">Create Account</h2>
        <input className="border px-4 py-2 mb-3 w-full" placeholder="Email" />
        <input className="border px-4 py-2 mb-3 w-full" placeholder="Password" />
        <button
          onClick={() => navigate("/admin/login")}
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;
