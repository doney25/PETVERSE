import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sellerId = localStorage.getItem("userId"); // Get seller ID from local storage
      const productData = { ...product, sellerId };

      await axios.post("http://localhost:5501/api/products", productData);
      setMessage("Product added successfully!");
      setProduct({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
        stock: "",
      });
    } catch (error) {
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="grooming">Grooming</option>
          <option value="toys">Toys</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <Button type="submit" className="bg-blue-600 text-white">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
