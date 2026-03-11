import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        }),
      );

      toast.success("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/login1.jpg')] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row font-sans">
      {/* Left Side: Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 pt-12 pb-8 md:p-8 bg-black/40 md:bg-black/20">
        <img
          src="/logo.png"
          alt="logo"
          className="w-20 h-20 md:w-40 md:h-40 object-contain mb-4 md:mb-6 drop-shadow-lg"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-yellow-400 drop-shadow-md leading-tight">
          Experio
          <br />
          <span className="text-white text-2xl md:text-5xl">
            Travel Experiences
          </span>
        </h1>

        <p className="text-gray-200 text-center text-base md:text-2xl font-medium italic mt-3 md:mt-4 max-w-md">
          "Find Experiences That Define Your Journey."
        </p>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-6 pb-12 md:pb-6">
        <div className="w-full max-w-[450px] backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8 tracking-tight">
            Welcome Back
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. traveler@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm md:text-base"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 md:h-14 mt-4 md:mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-base md:text-lg rounded-xl transition-all active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Login to Explore"}
            </button>
          </div>

          <p className="text-gray-200 text-center mt-6 md:mt-8 text-xs md:text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-400 font-bold hover:underline underline-offset-4 transition-all"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
