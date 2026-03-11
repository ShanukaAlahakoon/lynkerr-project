const Listing = require("../models/Listing");

const createListing = async (req, res) => {
  try {
    const { title, location, imageUrls, description, price } = req.body;

    if (
      !title ||
      !location ||
      !description ||
      !imageUrls ||
      imageUrls.length === 0
    ) {
      return res.status(400).json({
        message: "Please fill all required fields and add at least one image.",
      });
    }

    const listing = await Listing.create({
      title,
      location,
      imageUrls,
      description,
      price: price || null,
      createdBy: req.user.id,
    });

    const populatedListing = await listing.populate("createdBy", "name email");

    res.status(201).json(populatedListing);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const { title, location, imageUrls, description, price } = req.body;

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const ownerId = listing.createdBy.toString();
    const currentUserId = (req.user._id || req.user.id).toString();

    if (ownerId !== currentUserId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to edit this experience" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { title, location, imageUrls, description, price },
      { new: true, runValidators: true },
    );

    res.json(updatedListing);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
};
