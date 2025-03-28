import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const PetClassifier = () => {
    const [model, setModel] = useState(null);
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    const THRESHOLD = 0.5; // Set a threshold for prediction confidence

    useEffect(() => {
        // Load the Teachable Machine Model and Metadata
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel("/model/model.json");
                console.log("Model loaded successfully:", loadedModel);
                setModel(loadedModel);

                // Load metadata (labels)
                const response = await fetch("/model/metadata.json");
                const metadata = await response.json();
                console.log("Metadata loaded successfully:", metadata);
                setLabels(metadata.labels); // Assuming metadata.json contains a "labels" array
            } catch (error) {
                console.error("Error loading model or metadata:", error);
            }
        };
        loadModel();
    }, []);

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setPrediction(""); // Clear previous prediction
    };

    const handlePredict = async () => {
        if (!model || !image) {
            console.error("Model or image is not loaded.");
            return;
        }

        setLoading(true); // Set loading to true
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.onload = async () => {
            try {
                // Preprocess the image
                const tensorImg = tf.browser.fromPixels(imgElement)
                    .resizeNearestNeighbor([224, 224]) // Resize to 224x224
                    .toFloat()
                    .div(tf.scalar(255)) // Normalize pixel values to [0, 1]
                    .expandDims(); // Add batch dimension

                console.log("Tensor image shape:", tensorImg.shape);

                // Get predictions
                const predictions = await model.predict(tensorImg).data();
                console.log("Predictions:", predictions);

                // Find the label with the highest probability
                const bestMatchIndex = predictions.indexOf(Math.max(...predictions));
                const bestMatchProbability = predictions[bestMatchIndex];
                console.log("Best Match Index:", bestMatchIndex);
                console.log("Best Match Probability:", bestMatchProbability);

                if (bestMatchProbability >= THRESHOLD) {
                    setPrediction(labels[bestMatchIndex]);
                } else {
                    setPrediction("No matches found");
                }
            } catch (error) {
                console.error("Error during prediction:", error);
            } finally {
                setLoading(false); // Set loading to false
            }
        };
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Pet Breed Classifier</h3>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
            />
            <button
                onClick={handlePredict}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Predict Breed
            </button>
            {image && (
                <div className="mt-4">
                    <img src={image} alt="Preview" width="200" className="rounded" />
                </div>
            )}
            {loading && (
                <p className="mt-4 text-blue-500 font-semibold">Loading Breed...</p>
            )}
            {prediction && !loading && (
                <p
                    className={`mt-4 font-semibold ${
                        prediction === "No matches found"
                            ? "text-red-500"
                            : "text-green-600"
                    }`}
                >
                    {prediction === "No matches found"
                        ? "No matches found"
                        : `Predicted Breed: ${prediction}`}
                </p>
            )}
        </div>
    );
};

export default PetClassifier;
