import { Link } from "react-router-dom";
import UserData from "./UserData";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1F2937]/70 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain drop-shadow-md"
          />
          <span className="text-2xl font-extrabold tracking-tight text-[#F59E0B] drop-shadow-sm">
            Experio
          </span>
        </Link>

        <div className="flex items-center gap-6 font-medium text-sm md:text-base">
          <Link
            to="/"
            className="text-[#F5F9FF] hover:text-[#0EA5E9] transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="text-[#F5F9FF] hover:text-[#0EA5E9] transition-colors duration-200"
          >
            Create Listing
          </Link>

          <div className="hidden md:block w-px h-6 bg-[#F5F9FF]/20 mx-2"></div>

          <UserData />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
