import Cookies from "js-cookie";
import { Truck, LogOut } from "lucide-react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-5xl h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="bg-primary p-1.5 sm:p-2 rounded-lg text-white group-hover:bg-secondary transition-colors">
            <Truck size={20} className="sm:w-6 sm:h-6" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 truncate max-w-[120px] sm:max-w-none">
            Fleet Logistic
          </span>
        </div>


        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-bold text-sm transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
