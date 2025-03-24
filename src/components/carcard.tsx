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
}: CarCardProps) => {
  // Extract the car ID from the URL or use a formatted version of the name
  const carId = carPageUrl.split('/').pop() || 
                carName.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image container with status badge */}
      <div className="relative w-full pb-[55%]">
        <Image
          src={carImageSrc}
          alt={`${carName}`}
          fill
          className="object-cover"
          priority={false}
        />
        
        {/* Status badge - Used/New */}
        <div className="absolute bottom-0 left-0 bg-black text-white px-3 py-1 text-sm font-medium">
          {status}
        </div>
      </div>
      
      {/* Car details section */}
      <div className="p-2">
        {/* Engine/Trim info */}
        <div className="text-gray-500 text-xs mb-1 flex items-center">
          {engineSize && <span>{engineSize}</span>}
          {fuelType && <span className="mx-1">{fuelType}</span>}
        </div>
        
        {/* Car name */}
        <h2 className="text-sm font-bold text-gray-900 mb-1">
          {carName}
        </h2>
        
        {/* Specs row */}
        <div className="flex items-center text-gray-600 text-xs mb-1">
          {transmission && <span>{transmission}</span>}
          {transmission && fuelType && <span className="mx-1">•</span>}
          {fuelType && <span>{fuelType}</span>}
          {(fuelType && engineSize) && <span className="mx-1">•</span>}
          {engineSize && <span>{engineSize}</span>}
        </div>
        
        {/* Price */}
        <div className="text-sm font-bold mb-1">
          ksh:{price}
        </div>
        
        {/* Year and mileage */}
        <div className="text-xs text-gray-600 border-t pt-2">
          {year && <span>{year}</span>}
          {year && mileage && <span className="mx-1">•</span>}
          {mileage && <span>{mileage} Kilometres</span>}
        </div>
      </div>
    </div>
  );
};

export default CarCard;