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

export default function Home() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const petData = {
      name,
      category,
      breed,
      age,
      price,
      image,
      description,
    };
    axios
      .post("http://localhost:5501/createPet", petData)
      .then(console.log("Pet Listed Sucessfully"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h2 className="text-2xl mb-3">Home</h2>

      {/* Quick Add Pet Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add a New Pet</CardTitle>
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
                <SelectItem value="fish">Fish</SelectItem>
                <SelectItem value="reptile">Reptile</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Pet Breed"
              onChange={(e) => setBreed(e.target.value)}
            />
            <Input
              placeholder="Age"
              type="number"
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              placeholder="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
            />
            <Textarea
              placeholder="Short Description"
              onChange={(e) => setDescription(e.target.value)}
            />
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
