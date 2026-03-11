import { Link } from "react-router-dom";

// calculate how long ago listing was posted
const getTimeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 86400; //days
  if (interval > 1) return `Posted ${Math.floor(interval)} days ago`;

  interval = seconds / 3600; // hours
  if (interval > 1) return `Posted ${Math.floor(interval)} hours ago`;

  interval = seconds / 60; // minutes
  if (interval > 1) return `Posted ${Math.floor(interval)} minutes ago`;

  return "Posted just now";
};

function PlaceCard({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-100 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-56 sm:h-48 md:h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={
              listing.imageUrls && listing.imageUrls.length > 0
                ? listing.imageUrls[0]
                : ""
            }
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=Image+Not+Found";
            }}
          />

          {listing.price && (
            <div className="absolute top-3 right-3 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-extrabold shadow-md">
              ${listing.price}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg md:text-xl font-bold text-secondary group-hover:text-[#0EA5E9] transition-colors line-clamp-1 mb-2">
            {listing.title}
          </h2>

          <p className="text-[#0EA5E9] font-semibold text-xs md:text-sm mb-3 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {listing.location}
          </p>

          <p className="text-gray-500 text-sm line-clamp-2 flex-grow mb-4">
            {listing.description}
          </p>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex items-center justify-center text-[10px] font-bold text-white">
                {listing.createdBy?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <p className="text-xs font-semibold text-gray-600 truncate max-w-[100px]">
                {listing.createdBy?.name || "Unknown"}
              </p>
            </div>

            <p className="text-[11px] font-medium text-gray-400">
              {getTimeAgo(listing.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
