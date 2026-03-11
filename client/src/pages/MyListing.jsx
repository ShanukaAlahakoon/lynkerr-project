import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyListings() {
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyListings = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/listings");
      const filtered = res.data.filter(
        (item) => item.createdBy?._id === user?._id,
      );
      setMyListings(filtered);
    } catch (err) {
      toast.error("Failed to load your listings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await API.delete(`/listings/${id}`);
        toast.success("Deleted successfully!");
        fetchMyListings();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 md:pt-28 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
          My Shared Experiences
        </h2>
        <Link
          to="/create"
          className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#0284c7] transition-all text-center"
        >
          + Add New
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#F59E0B]"></div>
        </div>
      ) : myListings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">
            You haven't shared any experiences yet.
          </p>
          <Link
            to="/create"
            className="text-[#0EA5E9] text-sm mt-2 inline-block hover:underline"
          >
            Start sharing now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 w-full mb-3 overflow-hidden rounded-xl">
                <img
                  src={
                    item.imageUrls?.[0] || "https://via.placeholder.com/400x300"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.price && (
                  <div className="absolute top-2 right-2 bg-[#F59E0B] text-white px-2 py-1 rounded-lg text-xs font-bold">
                    ${item.price}
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-secondary truncate px-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 px-1 mb-4">{item.location}</p>

              <div className="flex gap-3 mt-auto">
                <Link
                  to={`/edit/${item._id}`}
                  className="flex-1 bg-gray-100 text-secondary hover:bg-gray-200 text-center py-2.5 rounded-xl text-sm font-bold transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-50 text-red-500 hover:bg-red-100 py-2.5 rounded-xl text-sm font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
