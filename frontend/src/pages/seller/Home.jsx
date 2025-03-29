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
import { enqueueSnackbar } from "notistack";
import PetClassifier from "@/components/PetClassifier";
import { API_BASE_URL } from "src/config.js"

export default function Home() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (images.length === 0) return alert("Please upload at least one image.");

    const sellerId = localStorage.getItem("userId");
    const sellerName = localStorage.getItem("userName");
    const petData = {
      name,
      category,
      breed,
      age,
      price,
      color,
      location,
      images,
      description,
      status: "Available",
      sellerId: sellerId,
      seller: sellerName,
    };
    axios
      .post(`${API_BASE_URL}/pets`, petData)
      .then(() => enqueueSnackbar("Pet Listed Successfully", {variant: "success"}))
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  return (
    <div className="p-6 space-y-6">
  {/* Header */}
  <h2 className="text-2xl mb-4">Sell Pets</h2>

  {/* Quick Add Pet Form */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-semibold">Add New Pet Listing</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Pet Name</label>
          <Input placeholder="Pet Name" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Category</label>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="bird">Bird</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Pet Breed</label>
          <Input placeholder="Pet Breed" onChange={(e) => setBreed(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Age</label>
          <div className="flex gap-2">
            <Select onValueChange={(value) => setAge(`${value} ${age.split(" ")[1] || "months"}`)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Number" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12).keys()].map((num) => (
                  <SelectItem key={num + 1} value={(num + 1).toString()}>
                    {num + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setAge(`${age.split(" ")[0] || "1"} ${value}`)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Months">Months</SelectItem>
                <SelectItem value="Years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Color</label>
          <Input placeholder="Color" onChange={(e) => setColor(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Location</label>
          <Input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Price</label>
          <Input placeholder="Price" type="number" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Pet Images</label>
          <ImageUploader onUpload={(newImages) => setImages((prev) => [...prev, ...newImages])} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <Textarea placeholder="Short Description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="space-y-2 mt-2">
          <label className="block text-sm font-medium">Health Certificate</label>
          <ImageUploader onUpload={(newImages) => setImages((prev) => [...prev, ...newImages])} />
        </div>        
      </div>

      {/* Pet Classifier Integration */}
      <div className="mt-6">
        <PetClassifier />
      </div>

      <Button className="mt-6 w-full" variant="default" onClick={handleSubmit}>
        <Plus className="mr-2" size={16} /> Sell
      </Button>
    </CardContent>
  </Card>
</div>

  );
}
