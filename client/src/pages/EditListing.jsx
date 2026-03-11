import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    imageUrls: [],
  });

  const [currentUrlInput, setCurrentUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        const data = res.data;
        setFormData({
          title: data.title,
          location: data.location,
          description: data.description,
          price: data.price || "",
          imageUrls: data.imageUrls || [],
        });
      } catch (err) {
        toast.error("Failed to load listing data");
        navigate("/my-listings");
      } finally {
        setIsFetching(false);
      }
    };
    fetchListing();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (!currentUrlInput.trim()) return;
    if (!currentUrlInput.startsWith("http")) {
      toast.error("Please enter a valid URL starting with http");
      return;
    }
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, currentUrlInput.trim()],
    });
    setCurrentUrlInput("");
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter(
        (_, index) => index !== indexToRemove,
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.location.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (formData.imageUrls.length === 0) {
      toast.error("Please add at least one image URL");
      return;
    }

    try {
      setIsLoading(true);
      await API.put(`/listings/${id}`, formData);
      toast.success("Experience updated successfully!");
      navigate("/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-primary flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#F59E0B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-24 md:pt-28 pb-16 px-4 md:px-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Left Side: Form */}
        <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
            Edit Experience
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">
            Update your travel memories and details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm font-bold text-secondary mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-secondary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-secondary mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-secondary"
                />
              </div>
            </div>

            {/* Image URLs Section */}
            <div>
              <label className="block text-sm font-bold text-secondary mb-1">
                Image URLs *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={currentUrlInput}
                  onChange={(e) => setCurrentUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddImageUrl(e)}
                  className="flex-grow px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="bg-[#0EA5E9] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#0284c7] transition-colors text-sm"
                >
                  Add
                </button>
              </div>

              {formData.imageUrls.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {formData.imageUrls.map((url, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-100"
                    >
                      <span className="truncate max-w-[180px] md:max-w-[200px]">
                        {url}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 font-bold hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-secondary mb-1">
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-secondary resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/my-listings")}
                className="flex-1 py-3 rounded-lg font-bold border border-gray-200 hover:bg-gray-50 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#F59E0B] hover:bg-[#d98b09] text-secondary py-3 rounded-lg font-bold shadow-md transition-all disabled:opacity-70 text-sm"
              >
                {isLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image Preview Grid */}
        <div className="w-full md:w-2/5 bg-gray-50 p-6 md:p-8 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-100">
          <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
            Image Preview ({formData.imageUrls.length})
          </p>

          {formData.imageUrls.length > 0 ? (
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden bg-gray-200 border border-gray-300">
                <img
                  src={formData.imageUrls[0]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Invalid+Image";
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {formData.imageUrls.slice(1, 5).map((url, idx) => (
                  <div
                    key={idx}
                    className="h-20 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img src={url} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-48 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No images added
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditListing;
