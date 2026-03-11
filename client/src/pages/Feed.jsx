import { useEffect, useState } from "react";
import API from "../services/api";
import PlaceCard from "../components/PlaceCard";

function Feed() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await API.get("/listings");
        setListings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchListings();
  }, []);

  // Search Logic
  const filteredListings = listings.filter((listing) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      listing.title.toLowerCase().includes(searchLower) ||
      listing.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-primary pb-16 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center pt-20 text-center px-4">
        <div className="absolute inset-0 bg-[url('/login1.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-secondary/60"></div>

        <div className="relative z-10 max-w-3xl w-full">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6">
            Explore <span className="text-[#F59E0B]">Travel Experiences</span>
          </h1>

          {/* Search Bar Section */}
          <div className="relative max-w-xl mx-auto group">
            <input
              type="text"
              placeholder="Search by destination or experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/50 backdrop-blur shadow-2xl outline-none text-white placeholder:text-gray-100 font-medium focus:ring-4 focus:ring-[#F59E0B]/50 transition-all pl-14"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-100 group-focus-within:text-[#F59E0B] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid Area */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-secondary">
            {searchTerm ? `Results for "${searchTerm}"` : "Top Experiences"}
          </h2>
          <span className="text-sm text-gray-400 font-medium">
            {filteredListings.length} found
          </span>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <PlaceCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <svg
              className="w-16 h-16 text-gray-200 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-secondary/60 text-lg font-medium">
              No experiences match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
