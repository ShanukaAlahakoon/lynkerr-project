import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function CreateListing() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !title.trim() ||
      !location.trim() ||
      !imageUrl.trim() ||
      !description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);

      const newListing = {
        title,
        location,
        imageUrl,
        description,
        price: price ? Number(price) : undefined,
      };

      await API.post("/listings", newListing);

      toast.success("Experience created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error(error.response?.data?.message || "Failed to create listing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-28 pb-16 px-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Left Side: Form */}
        <div className="w-full md:w-3/5 p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-secondary mb-2">
            Create New Experience
          </h2>
          <p className="text-gray-500 mb-8">
            Share a unique travel adventure with the world.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">
                Experience Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Sunset Boat Tour"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent outline-none transition-all text-secondary bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Bali, Indonesia"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent outline-none transition-all text-secondary bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">
                  Price ($) - Optional
                </label>
                <input
                  type="number"
                  placeholder="e.g., 45"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent outline-none transition-all text-secondary bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">
                Image URL *
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent outline-none transition-all text-secondary bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">
                Short Description *
              </label>
              <textarea
                rows="4"
                placeholder="Describe the experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent outline-none transition-all text-secondary bg-gray-50 focus:bg-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F59E0B] hover:bg-[#d98b09] text-secondary font-bold py-3 rounded-lg transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "Publishing..." : "Publish Experience"}
            </button>
          </form>
        </div>

        {/* Right Side: Image Preview */}
        <div className="w-full md:w-2/5 bg-gray-50 p-8 flex flex-col items-center justify-center border-l border-gray-100">
          <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest">
            Image Preview
          </p>
          <div className="w-full h-64 md:h-full max-h-[400px] rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center relative shadow-inner">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                }}
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg
                  className="w-12 h-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>No image entered</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
