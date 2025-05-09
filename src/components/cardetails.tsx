import React from 'react';

// Define an interface for the car details that matches the API structure
export interface CarDetailsProps {
  price: number;
  yearOfManufacture: number;
  currentLocation: string;
  availability: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  condition: string;
  bodyType: string;
  color: string;
  images: string[];
  dealer: {
    id: string;
    name: string;
    image: string;
    profileImage: string;
    whatsappNumber?: string;
  };
 
}

const CarDetails: React.FC<CarDetailsProps> = ({
  price,
  yearOfManufacture,
  currentLocation,
  availability,
  mileage,
  fuelType,
  transmission,
  engineSize,
  condition,
  bodyType,
  color,
 
}) => {
  // Format price with commas and currency
  const formattedPrice = price ? price.toLocaleString('en-KE', {
    style: 'currency',
    currency: 'KES'
  }) : 'Price not available';

  return (
    <div className="bg-white text-black relative w-full max-w-xl mx-auto rounded-lg shadow-md">
      {/* Price Header */}
      <div className="bg-white text-black p-4 flex justify-between items-center rounded-t-lg">
        <h2 className="text-xl font-bold">{formattedPrice}</h2>
      </div>

      {/* Details Grid */}
      <div className="p-4 space-y-2">
        {[
          { label: 'Year of manufacture', value: yearOfManufacture || 'N/A' },
          { label: 'Current Location', value: currentLocation || 'N/A' },
          { label: 'Availability', value: availability || 'N/A' },
          { label: 'Mileage', value: mileage ? `${mileage.toLocaleString()} KM` : 'N/A' },
          { label: 'Fuel type', value: fuelType || 'N/A' },
          { label: 'Transmission', value: transmission || 'N/A' },
          { label: 'engineSize', value: engineSize || 'N/A' },
          { label: 'condition', value: condition || 'N/A' },
          { label: 'bodyType', value: bodyType || 'N/A' },
          { label: 'color', value: color || 'N/A' },
        
        ].map(({ label, value }) => (
          <div 
            key={label} 
            className="flex justify-between border-b border-gray-200 pb-2 last:border-b-0"
          >
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-black">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetails;