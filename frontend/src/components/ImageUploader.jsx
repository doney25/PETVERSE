import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

const ImageUploader = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImages([...e.target.files]); // ✅ Store selected images
  };

  const handleUpload = async () => {
    if (images.length === 0) return alert("Please select images");

    setLoading(true);
    const uploadedUrls = [];
    const formData = new FormData();

    images.forEach((image) => formData.append("images", image));

    try {
      const res = await axios.post(
        "http://localhost:5501/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.imageUrls) {
        onUpload(res.data.imageUrls); // ✅ Make sure it's an array
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <Button
        className="absolute my-4"
        variant="outline"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Images"}
      </Button>
    </div>
  );
};

export default ImageUploader;
