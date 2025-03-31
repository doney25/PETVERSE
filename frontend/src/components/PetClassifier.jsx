import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const PetClassifier = ({ imageUrl, onBreedDetected }) => {
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(false);

    const THRESHOLD = 0.5;

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

                if (metadata.labels && Array.isArray(metadata.labels)) {
                    setLabels(metadata.labels); // Set the labels array
                } else {
                    console.error("Labels not found or invalid in metadata.json");
                }
            } catch (error) {
                console.error("Error loading model or metadata:", error);
            }
        };
        loadModel();
    }, []);

    // When imageUrl or model changes, trigger prediction
    useEffect(() => {
        if (imageUrl && model && labels.length > 0) {
            handlePredict();
        }
    }, [imageUrl, model, labels]);

    const handlePredict = async () => {
        if (!model || !imageUrl || labels.length === 0) {
            console.error("Model, image, or labels are not loaded.");
            return;
        }

        setLoading(true); // Set loading to true

        const img = new Image();
        img.crossOrigin = "anonymous"; // Allow cross-origin access
        img.src = imageUrl; // Use the image URL passed as a prop

        img.onload = async () => {
            try {
                // Preprocess the image
                const tensorImg = tf.browser.fromPixels(img)
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

                // Ensure bestMatchIndex is within bounds
                if (bestMatchIndex >= 0 && bestMatchIndex < labels.length) {
                    if (bestMatchProbability >= THRESHOLD) {
                        const predictedBreed = labels[bestMatchIndex];
                        setPrediction(predictedBreed); // Update the prediction state
                        onBreedDetected(predictedBreed); // Notify the parent component
                    } else {
                        setPrediction("No matches found");
                        onBreedDetected(""); // Notify the parent component with an empty value
                    }
                } else {
                    console.error("Best Match Index is out of bounds for labels array");
                    setPrediction("No matches found");
                    onBreedDetected(""); // Notify the parent component with an empty value
                }
            } catch (error) {
                console.error("Error during prediction:", error);
                onBreedDetected(""); // Notify the parent component with an empty value
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        img.onerror = () => {
            console.error("Error loading image.");
            setLoading(false);
        };
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Pet Breed Classifier</h3>
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Preview" width="200" className="rounded" />
                </div>
            )}
            {loading && (
                <p className="mt-4 text-blue-500 font-semibold">Detecting Breed...</p>
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
                        ? "No matches found..."
                        : `Detected Breed: ${prediction}`}
                </p>
            )}
        </div>
    );
};

export default PetClassifier;