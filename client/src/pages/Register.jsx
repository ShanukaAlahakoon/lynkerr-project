import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister() {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);

      await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/login1.jpg')] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row font-sans">
      {/* Left Side: Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 pt-10 pb-6 md:p-8 bg-black/40 md:bg-black/20">
        <img
          src="/logo.png"
          alt="logo"
          className="w-16 h-16 md:w-40 md:h-40 object-contain mb-3 md:mb-6 drop-shadow-lg"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-yellow-400 drop-shadow-md leading-tight">
          Join
          <br />
          <span className="text-white text-3xl md:text-5xl">Experio</span>
        </h1>

        <p className="text-gray-200 text-center text-sm md:text-2xl font-medium italic mt-2 md:mt-4 max-w-md hidden sm:block">
          "Find Experiences That Define Your Journey."
        </p>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-6 pb-12 md:pb-6">
        <div className="w-full max-w-[450px] backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8 tracking-tight">
            Create Account
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 md:h-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. traveler@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 md:h-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 md:h-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 md:h-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm md:text-base"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full h-12 md:h-14 mt-4 md:mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-base md:text-lg rounded-xl transition-all active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Join to Explore"}
            </button>
          </div>

          <p className="text-gray-200 text-center mt-5 md:mt-8 text-xs md:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 font-bold hover:underline underline-offset-4 transition-all"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
