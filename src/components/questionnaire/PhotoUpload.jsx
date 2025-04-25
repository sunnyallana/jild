import { useState } from "react";
import { Button, Typography, CircularProgress, Alert } from "@mui/material";
import { Camera, Upload, CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

const PhotoUpload = ({ photoUrl, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(photoUrl);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Send to backend for analysis
      const formData = new FormData();
      formData.append("image", file);

      const HUGGINGFACE_URL = import.meta.env.VITE_HUGGINGFACE_URL;

      const response = await fetch(`${HUGGINGFACE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const result = await response.json();
      onChange(result); // Pass the entire result to parent component
    } catch (error) {
      setError("Failed to analyze image: " + error.message);
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-fadeIn">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
        Skin Photo Upload
      </h2>
      <p className="text-neutral-600 mb-6">
        Upload a clear photo of your face without makeup for the most accurate
        skin analysis.
      </p>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="mb-6 flex flex-col items-center justify-center">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Skin preview"
              className="w-64 h-64 object-cover rounded-lg shadow-medium mb-4"
            />
            <div className="absolute top-2 right-2 bg-success text-white p-1 rounded-full">
              <CheckCircle size={18} />
            </div>
          </div>
        ) : (
          <div className="w-64 h-64 border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center mb-4 bg-neutral-50">
            <Camera size={48} className="text-neutral-400 mb-2" />
            <Typography
              variant="body2"
              className="text-neutral-500 text-center px-4"
            >
              Upload a clear photo of your face for skin analysis
            </Typography>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          id="image-upload"
          onChange={handleFileChange}
          className="hidden"
        />

        <label htmlFor="image-upload">
          <Button
            component="span"
            variant="outlined"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <Upload size={18} />
            }
            sx={{
              borderColor: "#FB6F92",
              color: "#FB6F92",
              "&:hover": {
                borderColor: "#FF8FAB",
                backgroundColor: "rgba(251, 111, 146, 0.05)",
              },
            }}
          >
            {preview ? "Change Photo" : "Upload Photo"}
          </Button>
        </label>
      </div>

      <div className="bg-primary-bg p-4 rounded-lg">
        <Typography variant="subtitle2" className="font-semibold mb-2">
          Photo Guidelines:
        </Typography>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm text-neutral-700">
            Take photo in natural lighting
          </li>
          <li className="text-sm text-neutral-700">Remove all makeup</li>
          <li className="text-sm text-neutral-700">
            Ensure your face is clearly visible
          </li>
          <li className="text-sm text-neutral-700">
            Look directly at the camera
          </li>
          <li className="text-sm text-neutral-700">
            Avoid using filters or editing the photo
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoUpload;

PhotoUpload.propTypes = {
  photoUrl: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
