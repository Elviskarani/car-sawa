import React from 'react';

// Define an interface for the car details
export interface CarDetailsProps {
  price: number;
  yearOfManufacture: number;
  currentLocation: string;
  availability: string;
  drive: string;
  mileage: number;
  fuelType: string;
  horsePower: number;
  transmission: string;
  torque: number;
  aspiration: string;
  title: string;
  dealer: {
    name: string;
    image: string;
  };
  
}




const CarDetails: React.FC<CarDetailsProps> = ({
  price,
  yearOfManufacture,
  currentLocation,
  availability,
  drive,
  mileage,
  fuelType,
  horsePower,
  transmission,
  torque,
  aspiration,
  title,
  dealer,

  

}) => {
  // Format price with commas and currency
  const formattedPrice = price.toLocaleString('en-KE', {
    style: 'currency',
    currency: 'KES'
  });

  return (
    <div className="bg-white text-black relative w-full max-w-xl mx-auto">
      {/* Price Header */}
      <div className="bg-white text-black p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{formattedPrice}</h2>
      
      </div>

      {/* Details Grid */}
      <div className="p-4 space-y-2">
        {[
          { label: 'Year of manufacture', value: yearOfManufacture },
          { label: 'Current Location', value: currentLocation },
          { label: 'Availability', value: availability },
          { label: 'Drive', value: drive },
          { label: 'Mileage', value: `${mileage.toLocaleString()} miles` },
          { label: 'Fuel type', value: fuelType },
          { label: 'Horse Power', value: `${horsePower} Hp` },
          { label: 'Transmission', value: transmission },
          { label: 'Torque', value: `${torque} Nm` },
          { label: 'Aspiration', value: aspiration }
        ].map(({ label, value }) => (
          <div 
            key={label} 
            className="flex justify-between border-b border-gray-700 pb-2 last:border-b-0"
          >
            <span className="text-black">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetails;