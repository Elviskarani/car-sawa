"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";



interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  // Generate 10 image slots, using provided images or placeholders
  const carouselImages = [
    ...images.slice(0, 10),
    ...Array(Math.max(0, 10 - images.length)).fill('/placeholder-image.webp'),
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 9 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 9 : prevIndex - 1));
  };

  // Touch event handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = startXRef.current - endX;
    const containerWidth = carouselRef.current?.offsetWidth || 0;
    const threshold = containerWidth * 0.25; // 25% of container width

    if (deltaX > threshold) {
      handleNextImage(); // Swipe left
    } else if (deltaX < -threshold) {
      handlePrevImage(); // Swipe right
    }
  };

  // Prevent page scrolling during swipe
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  const renderImage = (imageSrc: string, index: number) => {
    if (imageSrc === '/placeholder-image.webp') {
      return (
        <div
          key={index}
          className="w-full h-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400"
        >
          <p className="text-gray-600 text-xl text-center">Image Not Found</p>
        </div>
      );
    }

    return (
      <img
        src={imageSrc}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-image.webp';
        }}
      />
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Main Image */}
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[4/3] overflow-hidden rounded-lg"
      >
        {renderImage(carouselImages[currentImageIndex], currentImageIndex)}

        {/* Previous Button */}
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-2 -translate-y-1/2   p-2 rounded-full transition-colors flex items-center justify-center w-12 h-12"
        >
         <FaArrowLeft className="w-15 text-white hover:text-[#25D366] hover:scale-110 h-15" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full transition-colors flex items-center justify-center w-12 h-12"
        >
          <FaArrowRight className="w-15 text-white hover:text-[#25D366] hover:scale-110 h-15" />
        </button>
      </div>

      {/* Image Counter */}
      <div className="text-center mt-2 text-sm text-gray-500">
        {currentImageIndex + 1} / 10
      </div>

      {/* Thumbnail Preview */}
      <div className="flex overflow-x-auto space-x-2 mt-2">
        {carouselImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-12 h-12 flex-shrink-0 rounded ${
              index === currentImageIndex ? 'border-2 border-blue-500' : 'opacity-50 hover:opacity-100'
            }`}
          >
            {image === '/placeholder-image.webp' ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                <p className="text-xs text-gray-500">N/A</p>
              </div>
            ) : (
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.webp';
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}