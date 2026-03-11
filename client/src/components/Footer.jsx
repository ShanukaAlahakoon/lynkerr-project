function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-400 border-t border-white/10 mt-auto">
      <div className="w-full px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-6 h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <span className="text-lg font-bold text-[#F59E0B]">Experio</span>
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              Find Experiences That Define Your Journey.
            </p>
          </div>

          <div className="text-sm text-center md:text-right">
            <p>© {new Date().getFullYear()} Experio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
