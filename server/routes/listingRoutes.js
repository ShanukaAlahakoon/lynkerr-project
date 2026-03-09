const express = require("express");
const {
  createListing,
  getAllListings,
  getListingById,
} = require("../controllers/listingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllListings);
router.get("/:id", getListingById);
router.post("/", protect, createListing);

module.exports = router;
