"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageCarousel from "@/components/imagecarousel";
import CarDetailsPage from "@/components/cardata";
import CarDetails from "@/components/cardetails";
import { getCarById, type Car, getDealerById, type Dealer } from "@/app/services/api";

export default function CarDetailsPageWrapper({ params }: { params: { id: string } }) {
  const { id } = params;
  const [car, setCar] = useState<Car | null>(null);
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        // Fetch car data
        const carData = await getCarById(id);
        setCar(carData);
        
        // Fetch dealer data using the dealer ID from car data
        if (carData && carData.dealer) {
          try {
            const dealerId = typeof carData.dealer === 'string' 
              ? carData.dealer 
              : carData.dealer.id || carData.dealer._id;
              
            const dealerData = await getDealerById(dealerId);
            setDealer(dealerData);
          } catch (dealerErr) {
            console.error("Error fetching dealer details:", dealerErr);
            // Don't set the main error - we still have car data
          }
        }
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

  // Prepare images for the carousel
  const carImages = car.images && car.images.length > 0 
    ? car.images 
    : ["/placeholder-image.webp"]; // Use placeholder if no images

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
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          {`${car.year || ''} ${car.make || ''} ${car.model || ''}`.trim() || "Car Details"}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Image Carousel Component */}
          <ImageCarousel images={carImages} />
          
          {/* Car Data Component - shows detailed information */}
          <CarDetailsPage 
            car={car} 
            dealer={dealer} 
          />
          
          {/* Car Details Component - shows specifications */}
          <CarDetails 
            car={car}
            currentLocation={dealer?.location || "N/A"}
          />
        </div>
      </div>
    </div>
  );
}