"use client"; // ✅ Required for interactivity

import { useState } from "react";

const moods = ["Casual", "Elegant", "Bold", "Vintage", "Streetwear", "Minimalist"];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [customPrompt, setCustomPrompt] = useState(""); // User's prompt
  const [editText, setEditText] = useState(""); // User's edit description
  const [originalImage, setOriginalImage] = useState<string | null>(null); // Stores the first generated image
  const [editedImage, setEditedImage] = useState<string | null>(null); // Stores the edited version
  const [loading, setLoading] = useState(false);

  const generateImage = async (isEdit = false) => {
    const finalPrompt = isEdit ? `${customPrompt}, ${selectedMood} style, ${editText}` : `${customPrompt}, ${selectedMood} style`;

    if (!finalPrompt.trim()) {
      alert("Please enter a description.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          prompt: finalPrompt,
          ...(isEdit && originalImage ? { image: originalImage } : {}), // Include original image URL for editing
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate image");

      if (isEdit) {
        setEditedImage(data.imageUrl); // Store the edited version
      } else {
        setOriginalImage(data.imageUrl); // Store the first generated image
        setEditedImage(null); // Reset previous edits
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Image generation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Fashion Image Generator</h1>

      {/* Mood Selection */}
      <label className="block mb-2">Mood:</label>
      <select 
        value={selectedMood} 
        onChange={(e) => setSelectedMood(e.target.value)}
        className="p-2 rounded text-black"
      >
        {moods.map((mood) => (
          <option key={mood} value={mood}>{mood}</option>
        ))}
      </select>

      {/* Custom Prompt */}
      <label className="block mt-4 mb-2">Describe Your Outfit:</label>
      <textarea 
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        className="w-full p-2 rounded text-black"
        placeholder="Example: A futuristic dress with metallic finish..."
      />

      {/* Generate Button */}
      <button 
        onClick={() => generateImage(false)} 
        disabled={loading}
        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Outfit"}
      </button>

      {/* Display Images */}
      <div className="flex flex-wrap gap-6 mt-6">
        {originalImage && (
          <div className="text-center">
            <h3 className="text-lg font-semibold">Original</h3>
            <img src={originalImage} alt="Generated outfit" className="rounded shadow-lg w-64 h-64 object-cover" />
          </div>
        )}
        {editedImage && (
          <div className="text-center">
            <h3 className="text-lg font-semibold">Edited</h3>
            <img src={editedImage} alt="Edited outfit" className="rounded shadow-lg w-64 h-64 object-cover" />
          </div>
        )}
      </div>

      {/* Edit Section */}
      {originalImage && (
        <div className="mt-6 w-full max-w-lg">
          <label className="block mt-4 mb-2">Describe Changes:</label>
          <textarea 
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 rounded text-black"
            placeholder="Example: Change the color to red, add more ruffles..."
          />
          <button 
            onClick={() => generateImage(true)} 
            disabled={loading}
            className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Editing..." : "Edit Outfit"}
          </button>
        </div>
      )}
    </div>
  );
}
