import express from 'express'
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.post("/", upload.array("images", 5), async (req, res) => {
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Extract and return all uploaded image URLs
    const imageUrls = req.files.map((file) => file.path);
    res.status(200).json({
      message: "Image upload successful.",
      imageUrls, // ✅ Return an array of uploaded image URLs
    });
  } catch (error) {
    res.status(500).json({ error: "Image upload failed" });
  }
});


export default router
