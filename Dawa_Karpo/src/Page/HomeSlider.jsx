import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeSlider = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Fetch images from Unsplash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: "fashion clothes shoes sneakers",
              per_page: 6,
            },
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
            },
          }
        );

        const imageUrls = res.data.results.map(
          (img) => img.urls.regular
        );

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Auto slide
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        Loading Fashion Collection...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={images[current]}
        alt="Fashion"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 1s ease-in-out",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            textShadow: "2px 2px 10px black",
            marginBottom: "20px",
          }}
        >
          New Fashion Collection 2026
        </h1>
      </div>
    </div>
  );
};

export default HomeSlider;
