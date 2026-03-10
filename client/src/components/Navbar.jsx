import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-yellow-400">
          Lynkerr
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>

          <Link to="/create" className="hover:text-yellow-400">
            Create Listing
          </Link>

          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>

          <Link to="/register" className="hover:text-yellow-400">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
