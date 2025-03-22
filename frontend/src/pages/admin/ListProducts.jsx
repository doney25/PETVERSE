import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";

const ListProducts = () => {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState([])
    const [description, setDescription] = useState("")

    const handleSubmit = async () => {
        if (images.length === 0) return alert("Please upload at least one image.");
        const productData = {
          name,
          category,
          stock,
          price,
          images,
          description,
        };
        console.log(productData)
        axios
          .post("http://localhost:5501/api/products", productData)
          .then(() => alert("Product Listed Successful"))
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl mb-3">Sell Products</h2>
      <Card>
        <CardHeader>
          <CardTitle>Sell a Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="grooming">Grooming</SelectItem>
                <SelectItem value="toys">Toys</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Stock Quantity"
              type="number"
              onChange={(e) => setStock(e.target.value)}
            />
            <Input
              placeholder="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Textarea
              placeholder="Short Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <ImageUploader
              onUpload={(newImages) =>
                setImages((prev) => [...prev, ...newImages])
              }
            />
          </div>
          <Button
            className="mt-4 w-full"
            variant="default"
            onClick={handleSubmit}
          >
            <Plus className="mr-2" size={16} /> Add Product
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListProducts;
