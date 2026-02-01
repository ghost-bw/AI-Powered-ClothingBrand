import { useState } from "react";
import {
  UploadCloud,
  ImagePlus,
  Trash2,
  AlertCircle,
} from "lucide-react";

/* ===== IMAGE RULES ===== */
const IMAGE_RULES = {
  hero: {
    minWidth: 1000,
    minHeight: 1000,
    ratio: 1,
    label: "Hero image",
  },
  square: {
    minWidth: 1000,
    minHeight: 1000,
    ratio: 1,
    label: "Image",
  },
};

export default function ProductMediaSection() {
  const [images, setImages] = useState({
    hero: null,
    detail: null,
    model: null,
    sizeChart: null,
  });

  const [error, setError] = useState("");

  /* ===== VALIDATE IMAGE ===== */
  const validateImage = (file, type) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.src = url;

      img.onload = () => {
        URL.revokeObjectURL(url);

        const rule =
          type === "hero"
            ? IMAGE_RULES.hero
            : IMAGE_RULES.square;

        const ratio = img.width / img.height;
        const ratioDiff = Math.abs(ratio - rule.ratio);

        if (
          img.width < rule.minWidth ||
          img.height < rule.minHeight
        ) {
          reject(
            `${rule.label} must be at least ${rule.minWidth}×${rule.minHeight}px`
          );
          return;
        }

        // relaxed ratio tolerance (real-world images)
        if (ratioDiff > 0.15) {
          reject(
            `${rule.label} aspect ratio should be ${
              type === "hero" ? "2:3" : "1:1"
            }`
          );
          return;
        }

        resolve();
      };

      img.onerror = () => {
        reject("Invalid image file");
      };
    });

  /* ===== UPLOAD HANDLER ===== */
  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError("");
      await validateImage(file, type);

      const preview = URL.createObjectURL(file);

      setImages((prev) => ({
        ...prev,
        [type]: preview,
      }));
    } catch (err) {
      setError(err);
    }
  };

  /* ===== IMAGE CARD ===== */
  const ImageCard = ({ label, type, large }) => (
    <div
      className={`relative border-2 border-dashed rounded-xl
      flex items-center justify-center text-center
      ${large ? "h-[360px]" : "h-[170px]"}
      bg-white hover:shadow-lg transition`}
    >
      {images[type] ? (
        <>
          <img
            src={images[type]}
            alt={type}
            className="object-cover w-full h-full rounded-xl"
          />
          <button
            onClick={() =>
              setImages((prev) => ({
                ...prev,
                [type]: null,
              }))
            }
            className="absolute top-3 right-3
            bg-black/70 text-white p-2 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        </>
      ) : (
        <label className="cursor-pointer text-gray-500">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleUpload(e, type)}
          />
          <ImagePlus className="mx-auto mb-2" />
          <p className="font-semibold">{label}</p>
          <p className="text-xs text-gray-400 mt-1">
            {type === "hero"
              ? "Min 1000×1000 (1:1)"
              : "Min 1000×1000 (1:1)"}
          </p>
        </label>
      )}
    </div>
  );

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-3">
        Product Media
      </h2>

      {/* ERROR */}
      {error && (
        <div
          className="flex items-center gap-2
          bg-red-50 text-red-600 p-3
          rounded-lg mb-4"
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HERO */}
        <div className="lg:col-span-2">
          <ImageCard
            label="Upload Hero Shot"
            type="hero"
            large
          />
        </div>

        {/* SIDE GRID */}
        <div className="grid grid-cols-2 gap-4">
          <ImageCard label="Detail Shot" type="detail" />
          <ImageCard label="Model Reference" type="model" />
          <ImageCard label="Size Chart" type="sizeChart" />

          <div
            className="border-2 border-dashed rounded-xl
            flex items-center justify-center text-gray-400"
          >
            <UploadCloud />
            <span className="ml-2">Add View</span>
          </div>
        </div>
      </div>
    </section>
  );
}
