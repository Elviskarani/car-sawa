"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageCarousel from "@/components/imagecarousel";
import CarDetailsPage from "@/components/cardata";
import CarDetails from "@/components/cardetails";
import { CarData } from "@/app/car-data";

// Used car inventory data
const usedCars: CarData[] = [
  { 
    id: 'toyota-land-cruiser-2024',
    imageSrc: '/2024toyotalandcruiser.jpeg', 
    name: 'Toyota Land Cruiser', 
    price: '10,000,000', 
    pageUrl: '/used-cars/toyota-land-cruiser-2024',
    year: '2023',
    mileage: '12,500',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '3.0 L',
    status: 'Available',
    description: 'Robust and luxurious SUV with exceptional off-road capabilities.',
    features: [
      'Advanced 4WD System',
      'Leather Interior',
      'Multi-Terrain Select',
      'Adaptive Suspension'
    ],
    horsePower: '300 HP',
    drive: '4WD',
    location: 'Nairobi, Kenya'
  },
  { 
    id: 'bmw-x5-2024',
    imageSrc: '/bmwx5.jpg', 
    name: 'BMW X5', 
    price: '7,000,000', 
    pageUrl: '/used-cars/bmw-x5-2024',
    year: '2022',
    mileage: '28,600',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.0 L',
    status: 'Available',
    description: 'Luxury mid-size SUV with sporty performance and advanced technology.',
    features: [
      'xDrive All-Wheel Drive',
      'Premium Sound System',
      'Adaptive M Suspension',
      'Gesture Control'
    ],
    horsePower: '335 HP',
    drive: 'AWD',
    location: 'Nairobi, Kenya'
  },
  { 
    id: 'suzuki-vitara-2024',
    imageSrc: '/suzukivitara.jpg', 
    name: 'Suzuki Vitara', 
    price: '8,000,000', 
    pageUrl: '/used-cars/suzuki-vitara-2024',
    year: '2023',
    mileage: '15,200',
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.6 L',
    status: 'Available',
    description: 'Compact SUV with excellent fuel efficiency and modern features.',
    features: [
      'AllGrip 4-Wheel Drive',
      'Panoramic Sunroof',
      'Touchscreen Infotainment',
      'Adaptive Cruise Control'
    ],
    horsePower: '120 HP',
    drive: '4WD',
    location: 'Mombasa, Kenya'
  }
];

export default function UsedCarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const car = usedCars.find((c) => c.id === resolvedParams.id);

  if (!car) {
    notFound();
  }

  // Convert price string to number for CarDetails component
  const priceNumber = parseInt(car.price.replace(/,/g, ''));

  // Prepare data for CarDetailsPage component
  const carDetailsProps = {
    price: priceNumber,
    yearOfManufacture: parseInt(car.year || '2023'),
    currentLocation: car.location || "Nairobi, Kenya",
    availability: car.status || 'Available',
    drive: car.drive || "4WD",
    mileage: parseInt(car.mileage?.replace(/,/g, '') || '0'),
    fuelType: car.fuelType || "Petrol",
    horsePower: parseInt(car.horsePower?.replace(/\D/g, '') || '200'),
    transmission: car.transmission || 'Automatic',
    torque: 350, // Default value as it's not in the car data
    aspiration: "Naturally Aspirated", // Default value as it's not in the car data
    title: car.name,
    dealer: {
      name: "Premium Motors", // Default dealer name
      image: "/essence.webp" // Default dealer image
    }
  };

  // Prepare images for the carousel
  const carImages = car.imageSrc ? [car.imageSrc] : [];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-[#272D3C] text-white py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/used-cars"
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
            Back to Used Cars
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{car.name}</h1>
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
        {car.features && car.features.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}