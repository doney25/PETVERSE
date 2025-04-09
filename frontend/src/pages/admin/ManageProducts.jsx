import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { enqueueSnackbar } from "notistack";
import API_BASE_URL from "@/config.js";
import Loading from "@/components/ui/Loading";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false); // 🆕
  const sellerId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true); // 🆕
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products?sellerId=${sellerId}`);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // 🆕
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${deleteTarget}`, {
        data: { sellerId },
      });
      setProducts(products.filter((product) => product._id !== deleteTarget));
      enqueueSnackbar("Product deleted successfully!", { variant: "success" });
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      enqueueSnackbar("Failed to delete product.", { variant: "error" });
      setDeleteTarget(null);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/products/${editingProduct._id}`, {
        ...editingProduct,
      });
      setEditingProduct(null);
      fetchProducts();
      enqueueSnackbar("Product updated successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error updating product:", error);
      enqueueSnackbar("Error updating product.", { variant: "warning" });
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Your Products</h2>

      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-800 font-bold">₹{product.price}</p>
              <p className="text-gray-500">Stock: {product.stock}</p>
              <div className="flex gap-2 mt-2">
                <Button className="bg-blue-500 text-white" onClick={() => handleEditClick(product)}>
                  Edit
                </Button>
                <Button className="bg-red-500 text-white" onClick={() => setDeleteTarget(product._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this product?
            </h2>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <Button variant="destructive" onClick={confirmDelete}>
                Yes, Delete
              </Button>
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <ImageUploader />
              <input
                type="number"
                name="stock"
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <Button type="submit" className="bg-blue-500 text-white">
                  Save Changes
                </Button>
                <Button className="bg-gray-400 text-white" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
