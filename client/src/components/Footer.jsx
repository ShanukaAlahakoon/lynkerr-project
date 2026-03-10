function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto p-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Lynkerr Travel Experiences
        </p>

        <p className="text-xs mt-2">
          Discover unique experiences around the world.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
