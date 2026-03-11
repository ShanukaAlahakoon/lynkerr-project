import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.imageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.imageUrls.length - 1 : prevIndex - 1,
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex justify-center items-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F59E0B]"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-primary flex flex-col justify-center items-center pt-20">
        <h2 className="text-2xl font-bold text-secondary">
          Experience not found
        </h2>
        <Link
          to="/"
          className="text-[#0EA5E9] mt-4 font-medium hover:underline"
        >
          &larr; Go back to Home
        </Link>
      </div>
    );
  }

  const displayImages =
    listing.imageUrls?.length > 0
      ? listing.imageUrls
      : listing.imageUrl
        ? [listing.imageUrl]
        : [];

  return (
    <div className="min-h-screen bg-primary pt-24 md:pt-28 pb-10 md:pb-16 px-4 md:px-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Image Slider Section */}
        <div className="w-full h-60 sm:h-72 md:h-96 relative bg-gray-200 group">
          <img
            src={displayImages[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {displayImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 md:bg-black/40 hover:bg-black/70 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 md:bg-black/40 hover:bg-black/70 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                {displayImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                      currentImageIndex === index
                        ? "bg-[#F59E0B]"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {listing.price && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#F59E0B] text-secondary px-4 py-1.5 md:px-5 md:py-2 rounded-full font-extrabold shadow-lg text-base md:text-lg">
              ${listing.price}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-col mb-5 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-secondary mb-2 md:mb-3 leading-tight">
              {listing.title}
            </h1>

            <div className="flex items-center gap-1.5 md:gap-2 text-[#0EA5E9] font-semibold text-base md:text-lg">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
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
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mt-5 md:mt-6 mb-6 md:mb-8 p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex items-center justify-center text-xl md:text-2xl font-bold text-white shadow-md flex-shrink-0">
              {listing.createdBy?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                Hosted by
              </p>
              <p className="text-lg md:text-xl font-bold text-secondary">
                {listing.createdBy?.name || "Unknown Host"}
              </p>
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4">
              About this experience
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
              {listing.description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-8 md:mt-10 pt-5 md:pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-500 hover:text-[#0EA5E9] font-bold transition-colors flex items-center gap-2 text-sm md:text-base"
            >
              &larr; Back to Feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;
