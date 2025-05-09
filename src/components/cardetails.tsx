import React from 'react';
import { Car } from '@/app/services/api';

// Define the props interface that matches the API structure more closely
export interface CarDetailsProps {
  car: Car;
  currentLocation?: string; // Optional field from dealer location
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, currentLocation }) => {
  // Format price with commas and currency
  const formattedPrice = car.price ? car.price.toLocaleString('en-KE', {
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
          { label: 'Year of manufacture', value: car.year || 'N/A' },
          { label: 'Current Location', value: currentLocation || 'N/A' },
          { label: 'Availability', value: car.status || 'N/A' },
          { label: 'Mileage', value: car.mileage ? `${car.mileage.toLocaleString()} KM` : 'N/A' },
          { label: 'Fuel type', value: car.fuelType || 'N/A' },
          { label: 'Transmission', value: car.transmission || 'N/A' },
          { label: 'Engine Size', value: car.engineSize || 'N/A' },
          { label: 'Condition', value: car.condition || 'N/A' },
          { label: 'Body Type', value: car.bodyType || 'N/A' },
          { label: 'Color', value: car.color || 'N/A' },
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