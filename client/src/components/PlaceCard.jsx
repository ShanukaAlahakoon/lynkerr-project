import { Link } from "react-router-dom";

function PlaceCard({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1">
        {/* Image */}
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-secondary">
            {listing.title}
          </h2>

          <p className="text-sm text-gray-500">📍 {listing.location}</p>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {listing.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <p className="text-xs text-gray-400">
              by {listing.createdBy?.name}
            </p>

            {listing.price && (
              <span className="text-gold font-bold">${listing.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
