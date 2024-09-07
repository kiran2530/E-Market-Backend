const cloudinary = require("../config/cloudinaryConfig");

// Function 1 : for uploading image to Cloudinary
const uploadImageToCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "emarketproducts",
      });
      return {
        imageUrl: result.secure_url,
        public_id: result.public_id,
      };
    } catch (err) {
      throw new Error("Image upload failed");
    }
  };
   
  // Function 2 : for delete image from Cloudinary
  const deleteImageOfCloudinary = async (public_id) => {
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (err) {
      throw new Error("Image delete failed");
    }
  };

module.exports = {
    uploadImageToCloudinary,
    deleteImageOfCloudinary
}