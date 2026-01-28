import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react"
import { useState } from "react"
import logo from '../../assets/logo/logo.webp'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <nav className="w-full border-b bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between">
          {/* Logo */}
        <a href="/"><div className="text-lg font-bold tracking-wide flex items-center gap-2">
          <img src={logo} alt="logo" className="h-15 w-40"></img>
        </div></a>

        {/* Left Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <li><a href="/" className="hover:text-black cursor-pointer">Home</a></li>
          <li className="hover:text-black cursor-pointer">Shop</li>
          <li><a href="/collections" className="hover:text-black cursor-pointer">Collections</a></li>
          <li className="hover:text-black cursor-pointer">About</li>
        </ul>

      

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-5">
          
          <Search className="w-5 h-5 cursor-pointer" />
          <a href="/favorites"><Heart className="w-5 h-5 cursor-pointer"/></a>
          <User className="w-5 h-5 cursor-pointer" />
          <a href="/cart"><ShoppingBag className="w-5 h-5 cursor-pointer" /></a>
       
         {token ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <User
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/user/login")}
            />
          )}
           </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm font-medium text-gray-700">
          <p>Home</p>
          <p>Shop</p>
          <p>Collections</p>
          <p>About</p>

          <div className="flex gap-4 pt-2">
            <Search />
            <User />
            <ShoppingBag />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar