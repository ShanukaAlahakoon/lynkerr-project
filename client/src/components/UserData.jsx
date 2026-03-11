import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function UserData() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  if (user) {
    return (
      <div className="w-full md:relative" ref={dropdownRef}>
        {/* User Profile Trigger Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-3 p-2 rounded-xl md:rounded-full hover:bg-white/10 transition-all focus:outline-none w-full md:w-auto"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex items-center justify-center text-lg font-bold text-white shadow-md flex-shrink-0">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col text-left flex-grow">
            <span className="text-sm font-bold text-white leading-tight">
              {user.name}
            </span>
            <span className="text-[10px] text-gray-400">View Account</span>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* User Options */}
        {isOpen && (
          <div className="md:absolute md:right-0 mt-2 w-full md:w-64 bg-[#1F2937]/80 md:bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-[100] overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5 hidden md:block">
              <p className="text-xs text-gray-400 font-medium mb-1">
                Signed in as
              </p>
              <p className="text-sm font-bold text-[#F59E0B] truncate">
                {user.email || user.name}
              </p>
            </div>

            <div className="p-2 space-y-1">
              <Link
                to="/my-listings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-200 hover:bg-[#0EA5E9] hover:text-white transition-all text-sm group"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                My Shared Listings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm group text-left"
              >
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout Account
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full md:w-auto">
      <Link
        to="/login"
        className="text-[#F5F9FF] text-base md:text-base font-medium hover:text-[#0EA5E9] transition-colors w-full text-left md:w-auto p-2"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-[#F59E0B] hover:bg-[#d98b09] text-[#1F2937] px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-md text-center w-full md:w-auto"
      >
        Register
      </Link>
    </div>
  );
}

export default UserData;
