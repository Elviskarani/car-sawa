"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageCarousel from "@/components/imagecarousel";
import CarDetailsPage from "@/components/cardata";
import CarDetails from "@/components/cardetails";
import { getCarById, type Car } from "@/app/services/api";

export default function CarDetailsPageWrapper({ params }: { params: { id: string } }) {
  const { id } = params;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const carData = await getCarById(id);
        setCar(carData);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError("Failed to load car details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#272D3C]"></div>
      </div>
    );
  }

  // Show error state
  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#272D3C] text-white py-4">
          <div className="container mx-auto px-4">
            <Link
              href="/cars"
              className="inline-flex items-center text-white hover:text-[#c1ff72] transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Cars
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 inline-block">
            {error || "Car not found"}
          </div>
          <p className="mt-4">
            <Link href="/cars" className="text-blue-600 hover:underline">
              Browse all cars
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Create a local dealer image path for Next.js Image compatibility
  const dealerImagePath = car.dealer.profileImage.startsWith("http") 
    ? "/placeholder-image.webp" // Use a local fallback image for external URLs
    : car.dealer.profileImage;

  // Prepare data for CarDetailsPage component
  const carDetailsProps = {
    price: car.price,
    yearOfManufacture: car.year,
    currentLocation: car.dealer?.name || "Nairobi",
    availability: car.status,
    drive: car.bodyType || "4WD",
    mileage: car.mileage || 0,
    fuelType: car.fuelType || "Petrol",
    horsePower: 200, // Default value as it's not in the car data
    transmission: car.transmission || "Manual",
    torque: 350, // Default value as it's not in the car data
    aspiration: "Naturally Aspirated", // Default value as it's not in the car data
    title: `${car.year} ${car.make} ${car.model}`,
    dealer: {
      id: car.dealer.id,
      name: car.dealer.name,
      image: dealerImagePath,
      profileImage: dealerImagePath,
      whatsappNumber: car.dealer.whatsappNumber || ""
    },
    dealerprofileImage: dealerImagePath,
    dealerwhatsappNumber: car.dealer.whatsappNumber || ""
  };

  // Prepare images for the carousel
  // If there's only one image, duplicate it to ensure the carousel has content
  const carImages = car.images && car.images.length > 0 
    ? car.images 
    : (car.imageUrl ? [car.imageUrl] : []);
    
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-[#272D3C] text-white py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/cars"
            className="inline-flex items-center text-white hover:text-[#c1ff72] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{carDetailsProps.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <ImageCarousel images={carImages} />
          <CarDetailsPage {...carDetailsProps} />
          <CarDetails {...carDetailsProps} />
        </div>
        {car.description && (
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{car.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}