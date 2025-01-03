import { useEffect, useState, useCallback, memo } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";
import "./App.css";

// NavigationArrow Component
const NavigationArrow = memo(({ direction, onClick, className }) => {
  const ArrowIcon = direction === "left" ? BsArrowLeftCircleFill : BsArrowRightCircleFill;
  return (
    <ArrowIcon
      className={className}
      onClick={onClick}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    />
  );
});

NavigationArrow.displayName = "NavigationArrow";
NavigationArrow.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

// SlideIndicator Component
const SlideIndicator = memo(({ active, onClick, index }) => (
  <button
    onClick={() => onClick(index)}
    className={`current-indicator ${active ? "active" : ""}`}
    aria-label={`Go to slide ${index + 1}`}
  />
));

SlideIndicator.displayName = "SlideIndicator";
SlideIndicator.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

// ImageSlider Component
function ImageSlider({ url, page, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await fetch(`${url}?pages=${page}&limit=${limit}`);
        if (!response.ok) throw new Error("Failed to fetch images.");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchImages();
  }, [url, page, limit]);

  // Handlers for navigation
  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Render error or loading state
  if (errorMsg) return <div className="error-message">Error: {errorMsg}</div>;
  if (loading) return <div className="loader">Loading...</div>;

  // Main render
  return (
    <div className="slider-container" aria-roledescription="carousel">
      <NavigationArrow
        direction="left"
        onClick={handlePrevSlide}
        className="arrow left-arrow"
      />

      <div className="slides-container">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.download_url}
            alt={`Slide ${index + 1}`}
            className={`slide ${currentSlide === index ? "active" : ""}`}
            loading="lazy"
          />
        ))}
      </div>

      <NavigationArrow
        direction="right"
        onClick={handleNextSlide}
        className="arrow right-arrow"
      />

      <div className="indicators-container">
        {images.map((_, index) => (
          <SlideIndicator
            key={index}
            index={index}
            active={currentSlide === index}
            onClick={setCurrentSlide}
          />
        ))}
      </div>
    </div>
  );
}

ImageSlider.propTypes = {
  url: PropTypes.string.isRequired,
  page: PropTypes.number,
  limit: PropTypes.number,
};

export default ImageSlider;
