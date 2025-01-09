// utils/migrateWishlist.js
const mongoose = require("mongoose");
const Buyer = require("../models/Buyer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// MongoDB connection setup (ensure you are connecting to the correct DB)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const migrateWishlist = async () => {
  try {
    const buyers = await Buyer.find(); // Fetch all buyers

    for (const buyer of buyers) {
      // Check if the wishlist is not an array
      if (!Array.isArray(buyer.wishlist)) {
        console.log(
          `Buyer ${buyer._id} has no wishlist or invalid wishlist format. Migrating...`
        );

        // Initialize wishlist as an empty array
        buyer.wishlist = [];

        // If the wishlist data exists in the old format (i.e., a list of product IDs)
        if (buyer.oldWishlist) {
          buyer.wishlist = buyer.oldWishlist.map((productId) =>
            mongoose.Types.ObjectId(productId)
          );
        }

        // Save the updated buyer document
        buyer.markModified("wishlist");
        await buyer.save();
        console.log(`Successfully migrated wishlist for buyer ${buyer._id}`);
      } else {
        console.log(`Buyer ${buyer._id} already has the new wishlist format.`);
      }
    }

    console.log("Migration process completed successfully!");
    mongoose.disconnect(); // Disconnect after migration
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

// Call the migration function
migrateWishlist();
