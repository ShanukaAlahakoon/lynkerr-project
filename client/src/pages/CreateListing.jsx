import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function CreateListing() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imageUrls, setImageUrls] = useState([]);
  const [currentUrlInput, setCurrentUrlInput] = useState("");

  const navigate = useNavigate();

  const handleAddImageUrl = (e) => {
    e.preventDefault();

    if (!currentUrlInput.trim()) return;

    if (!currentUrlInput.startsWith("http")) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setImageUrls([...imageUrls, currentUrlInput.trim()]);
    setCurrentUrlInput("");
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !location.trim() || !description.trim()) {
      toast.error("Please fill in all required text fields.");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Please add at least one image URL.");
      return;
    }

    try {
      setIsLoading(true);

      const newListing = {
        title,
        location,
        description,
        imageUrls,
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
    <div className="min-h-screen bg-primary pt-28 pb-16 px-4 md:px-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Left Side: Form */}
        <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
            Create New Experience
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">
            Share a unique travel adventure with the world.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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
                Image URLs * (Add at least one)
              </label>
              <div className="flex flex-row gap-2 mb-3">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={currentUrlInput}
                  onChange={(e) => setCurrentUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddImageUrl(e);
                    }
                  }}
                  className="flex-grow w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent outline-none transition-all text-secondary bg-gray-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white px-4 md:px-5 py-2.5 rounded-lg font-bold transition-colors whitespace-nowrap"
                >
                  Add
                </button>
              </div>

              {imageUrls.length > 0 && (
                <ul className="space-y-2 mb-2">
                  {imageUrls.map((url, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg text-sm"
                    >
                      <span className="truncate max-w-[180px] md:max-w-[200px] text-gray-600">
                        {url}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 hover:text-red-700 font-bold ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">
                Full Description *
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
              className="w-full bg-[#F59E0B] hover:bg-[#d98b09] text-secondary font-bold py-3 md:py-3.5 rounded-lg transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "Publishing..." : "Publish Experience"}
            </button>
          </form>
        </div>

        {/* Right Side: Image Preview Grid */}
        <div className="w-full md:w-2/5 bg-gray-50 p-6 md:p-8 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
          <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest sticky top-0 bg-gray-50 w-full text-center py-2 z-10">
            Image Preview ({imageUrls.length})
          </p>

          {imageUrls.length > 0 ? (
            <div className="w-full flex flex-col gap-4">
              <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed border-gray-300 shadow-inner">
                <img
                  src={imageUrls[0]}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Invalid+Image";
                  }}
                />
              </div>

              {imageUrls.length > 1 && (
                <div className="grid grid-cols-2 gap-2">
                  {imageUrls.slice(1).map((url, index) => (
                    <div
                      key={index}
                      className="h-20 md:h-24 rounded-lg overflow-hidden bg-gray-200 border border-gray-300"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=Error";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center shadow-inner">
              <div className="text-gray-400 flex flex-col items-center">
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 mb-2"
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
                <span className="text-center px-4 text-sm md:text-base">
                  Add image URLs to see preview
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
