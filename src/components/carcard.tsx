"use client";
// components/carcard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CarCardProps {
  id: string;
  make: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  engineSize: string;
  status: string;
  images: string[];
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  make,
  model,
  price,
  year,
  mileage,
  transmission,
  fuelType,
  engineSize,
  status,
  images
}) => {
  // Get the first image or use a placeholder
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : '/placeholder-car.jpg';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <Link href={`/cars/${id}`}>
        <div className="relative h-48 w-full">
          {/* Use Image component for better performance */}
          <Image
            src={imageUrl}
            alt={`${make} ${model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Status badge */}
          {status && (
            <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
              status === 'Available' ? 'bg-green-100 text-green-800' :
              status === 'Sold' ? 'bg-red-100 text-red-800' :
              status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {status}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#272D3C] mb-1">{make} {model}</h3>
          <p className="text-xl font-bold text-[#272D3C] mb-2">KES {price.toLocaleString()}</p>
          
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{year}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{engineSize}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>{transmission}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{mileage.toLocaleString()} km</span>
            </div>
            
            <div className="flex items-center gap-1 col-span-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{fuelType}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;