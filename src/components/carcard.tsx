"use client";

import Image from 'next/image';
import Link from 'next/link';

// Define interface for CarCard props
interface CarCardProps {
  carImageSrc: string;
  carName: string;
  price: string;
  carPageUrl: string;
  year?: string;
  mileage?: string;
  transmission?: string;
  fuelType?: string;
  engineSize?: string;
  status?: 'Available' | 'sold';
  dealerLocation?: string;
  dealerWhatsappNumber?: string;
}

// CarCard component
const CarCard = ({ 
  carImageSrc, 
  carName, 
  price, 
  carPageUrl, 
  year, 
  mileage,
  transmission,
  fuelType,
  engineSize,
  status = 'Available',
  dealerLocation,
  dealerWhatsappNumber,
}: CarCardProps) => {
  // Construct fallback placeholder with the car name
  const getPlaceholderImage = () => {
    const encodedName = encodeURIComponent(carName);
    return `https://placehold.co/600x400?text=${encodedName}`;
  };

  return (
    <Link 
      href={carPageUrl} 
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image container with status badge */}
      <div className="relative w-full pb-[55%]">
        <Image
          src={carImageSrc}
          alt={`${carName}`}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.src = getPlaceholderImage();
          }}
        />
        
        {/* Status badge - Highlight for sold cars */}
        <div className={`absolute bottom-0 left-0 px-3 py-1 text-sm font-medium 
          ${status === 'sold' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {status}
        </div>
      </div>
      
      {/* Car details section */}
      <div className="p-4">
        {/* Car name */}
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          {carName} {year && `(${year})`}
        </h2>
        
        {/* Specs row with conditional rendering */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          {[transmission, fuelType, engineSize]
            .filter(Boolean)
            .join(' • ')}
        </div>
        
        {/* Price */}
        <div className="text-xl font-bold text-primary mb-2">
          KES {price}
        </div>
        
        {/* Mileage */}
        {mileage && (
          <div className="text-sm text-gray-600">
            {mileage} Kilometres
          </div>
        )}
      </div>
    </Link>
  );
};

export default CarCard;