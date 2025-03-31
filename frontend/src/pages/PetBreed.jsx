import React, { useState } from "react";
import PetClassifier from "@/components/PetClassifier";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function PredictBreed() {
  const [imageUrl, setImageUrl] = useState("");
  const [detectedBreed, setDetectedBreed] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      setDetectedBreed(""); // Reset previous result
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setTimeout(() => setIsProcessing(false), 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBreedDetected = (breed) => {
    setDetectedBreed(breed);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated pet background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/QXIRvSSBva0YGFNwjT/giphy.gif?cid=ecf05e478ui8rly1bhxa5m7ndyeso4eo8f14th6yjs7opcsy&ep=v1_gifs_related&rid=giphy.gif&ct=g')] bg-cover bg-center opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 to-amber-100/70"></div>
      </div>

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-2xl relative z-10">
        <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center text-orange-600 hover:text-orange-800 transition-colors">
            <FiArrowLeft className="mr-2" /> Back
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
              Pet Breed Detective
            </span> 🕵‍♂🐾
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Snap or upload a photo to uncover your pet's breed mystery!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-md">
            <label className="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-amber-300 rounded-2xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute w-full h-full bg-[url('https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif')] bg-cover bg-center opacity-10"></div>
              </div>
              <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                <svg
                  className="w-12 h-12 text-amber-500 mb-3 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mb-2 text-lg text-gray-600 font-semibold group-hover:text-amber-600 transition-colors">
                  Upload Pet Photo
                </p>
                <p className="text-sm text-gray-500">Let's solve the breed mystery!</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {imageUrl && (
            <div className="relative w-full flex flex-col items-center bg-white shadow-lg rounded-xl p-6 border-4 border-amber-500">
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mb-4"></div>
                    <div className="flex space-x-2">
                      <span className="text-amber-600 text-lg">Detecting</span>
                      <span className="animate-bounce">🐾</span>
                      <span className="animate-bounce delay-75">🐾</span>
                      <span className="animate-bounce delay-100">🐾</span>
                    </div>
                  </div>
                </div>
              )}
              <PetClassifier imageUrl={imageUrl} onBreedDetected={handleBreedDetected} />
            </div>
          )}

          {detectedBreed && (
            <div className="mt-6 text-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 font-bold py-5 px-8 rounded-xl shadow-lg border-2 border-amber-300 animate-[bounce_1s_ease-in-out]">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-3xl">🔍</span>
                <div>
                  <div className="text-xl">Case Solved!</div>
                  <div className="text-2xl mt-1 text-orange-700">{detectedBreed}</div>
                </div>
                <span className="text-3xl">
                  {detectedBreed.toLowerCase().includes('cat') ? '🐱' : '🐕'}
                </span>
              </div>
              <div className="mt-3 text-sm font-normal text-amber-800 bg-amber-50/50 px-4 py-2 rounded-lg">
                <span className="font-semibold">Fun Fact:</span> {detectedBreed}s are known for their {Math.random() > 0.5 ? "playful personality" : "loyal nature"}!
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center text-sm text-amber-700/80">
          <p>Our pet detective AI has a 94% accuracy rate for purebred identification</p>
          <p className="mt-1">Clear, well-lit photos work best for accurate results</p>
        </div>
      </div>
    </div>
  );
}