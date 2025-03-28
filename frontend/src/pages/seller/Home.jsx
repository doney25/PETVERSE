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
      .post("http://localhost:5501/api/pets", petData)
      .then(() => alert("Pet Listed Successfully"))
      .catch((error) => {
        enqueueSnackbar(error.message, {variant:"error"})
      });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h2 className="text-2xl mb-3">Home</h2>

      {/* Quick Add Pet Form */}
      <Card>
        <CardHeader>
          <CardTitle>Sell a Pet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Pet Name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <Input
              placeholder="Pet Breed"
              onChange={(e) => setBreed(e.target.value)}
            />
            <Input
              placeholder="Age"
              type="string"
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              placeholder="Color"
              type="string"
              onChange={(e) => setColor(e.target.value)}
            />
            <Input
              placeholder="Location"
              type="string"
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              placeholder="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <ImageUploader
              onUpload={(newImages) =>
                setImages((prev) => [...prev, ...newImages])
              }
            />
            <Textarea
              placeholder="Short Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Pet Classifier Integration */}
          <div className="mt-4">
            <PetClassifier />
          </div>

          <Button
            className="mt-4 w-full"
            variant="default"
            onClick={handleSubmit}
          >
            <Plus className="mr-2" size={16} /> Add Pet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
