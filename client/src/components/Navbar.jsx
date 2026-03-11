import { Link } from "react-router-dom";
import { useState } from "react";
import UserData from "./UserData";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1F2937]/70 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="w-full flex justify-between items-center px-6 md:px-12 lg:px-16 py-3">
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

        <div className="hidden md:flex items-center gap-6 font-medium text-base">
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

          <div className="w-px h-6 bg-[#F5F9FF]/20 mx-2"></div>

          <UserData />
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#F5F9FF] hover:text-[#0EA5E9] focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1F2937]/95 backdrop-blur-xl border-t border-white/10 px-6 py-5 flex flex-col gap-4 shadow-xl">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#F5F9FF] hover:text-[#0EA5E9] text-lg font-medium transition-colors"
          >
            Home
          </Link>

          <Link
            to="/create"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#F5F9FF] hover:text-[#0EA5E9] text-lg font-medium transition-colors"
          >
            Create Listing
          </Link>

          <div className="w-full h-px bg-[#F5F9FF]/20 my-2"></div>

          <div onClick={() => setIsMobileMenuOpen(false)}>
            <UserData />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
