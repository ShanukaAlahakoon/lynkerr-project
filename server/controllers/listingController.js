const Listing = require("../models/Listing");

const createListing = async (req, res) => {
  try {
    const { title, location, imageUrl, description, price } = req.body;

    if (!title || !location || !imageUrl || !description) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const listing = await Listing.create({
      title,
      location,
      imageUrl,
      description,
      price: price || null,
      createdBy: req.user.id,
    });

    const populatedListing = await listing.populate("createdBy", "name email");

    res.status(201).json(populatedListing);
  } catch (error) {
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

module.exports = {
  createListing,
  getAllListings,
  getListingById,
};
