import { useEffect, useState } from "react";
import API from "../services/api";
import PlaceCard from "../components/PlaceCard";

function Feed() {
  const [listings, setListings] = useState([]);

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

  return (
    <div className="min-h-screen bg-primary pb-16 flex flex-col">
      {/* Hero Section*/}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center pt-20 md:pt-24 text-center px-4 md:px-6">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/login1.jpg')] bg-cover bg-center bg-no-repeat"></div>

        <div className="absolute inset-0 bg-secondary/60"></div>

        {/* Header Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-3 md:mb-4">
            Explore <span className="text-[#F59E0B]">Travel Experiences</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium italic drop-shadow-md px-2">
            "Discover unique local adventures and hidden gems around the world."
          </p>
        </div>
      </div>

      {/* Main Content Area*/}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-12">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <PlaceCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 text-secondary/60 text-lg font-medium">
            Loading experiences...
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
