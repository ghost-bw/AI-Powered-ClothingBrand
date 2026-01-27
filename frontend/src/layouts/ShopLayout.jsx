import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { ShopProvider } from "../context/ShopContext";

const ShopLayout = () => {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ShopProvider>
  );
};

export default ShopLayout;
