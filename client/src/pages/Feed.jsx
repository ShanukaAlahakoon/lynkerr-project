import { useEffect, useState } from "react";
import API from "../services/api";

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
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Travel Experiences</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <img src={listing.imageUrl} className="h-48 w-full object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{listing.title}</h2>

              <p className="text-gray-400">{listing.location}</p>

              <p className="text-sm mt-2 line-clamp-2">{listing.description}</p>

              <p className="text-sm mt-3 text-gray-400">
                By {listing.createdBy?.name}
              </p>

              {listing.price && (
                <p className="text-yellow-400 mt-2 font-semibold">
                  ${listing.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
