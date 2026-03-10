import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function UserData() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    window.location.href = "/login";
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm font-bold text-[#F59E0B]">{user.name}</span>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-[#1F2937]">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl border border-white/20 text-[#F5F9FF] text-sm font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        to="/login"
        className="text-[#F5F9FF] font-medium hover:text-[#0EA5E9] transition-colors duration-200"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="bg-[#F59E0B] hover:bg-[#d98b09] text-[#1F2937] px-6 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-md"
      >
        Register
      </Link>
    </div>
  );
}

export default UserData;
