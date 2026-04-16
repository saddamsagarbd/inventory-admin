import React, { useCallback } from "react";
import { Upload, X } from "lucide-react";

const ImageUploader = ({ formData, setFormData }) => {
  const onDrop = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  }, []);

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const setFeatured = (index) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: prev.images[index],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-(--color-primary) hover:text-(--color-primary-hover)">
                <span>Upload files</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onDrop}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {formData.images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Image Gallery
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="h-32 w-full object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
                {formData.featuredImage === img && (
                  <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
                <button
                  onClick={() => setFeatured(index)}
                  className="absolute bottom-1 right-1 bg-(--color-primary) text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Set Featured
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
