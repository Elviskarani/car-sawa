"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CarManufacturerBrowser = () => {
  const router = useRouter();

  const manufacturers = [
    { name: 'Audi', logo: '/audi.webp' },
    { name: 'BMW', logo: '/bmw.webp' },
    { name: 'Ford', logo: '/ford.webp' },
    { name: 'Honda', logo: '/honda.webp' },
    { name: 'Hyundai', logo: '/hyundai.webp' },
    { name: 'Subaru', logo: '/subaru.webp' },
    { name: 'Mazda', logo: '/mazda.webp' },
    { name: 'Mercedes-Benz', logo: '/mercedes.webp' },
    { name: 'Nissan', logo: '/nissan.webp' },
    { name: 'Toyota', logo: '/toyota.webp' },
    { name: 'Volkswagen', logo: '/VW.webp' },
    { name: 'Volvo', logo: '/volvo.webp' },
    { name: 'Land Rover', logo: '/land_rover.webp' },
    { name: 'Lexus', logo: '/lexus.webp' },
    { name: 'Suzuki', logo: '/suzuki.webp' },
  ];

  const handleManufacturerSelect = (manufacturer: string) => {
    router.push(`/cars?manufacturer=${manufacturer}`);
  };

  return (
    <div className="bg-whitesmoke px-4 md:px-8 py-6">
      <h2 className="text-xl text-gray-800 font-bold mb-4">Browse by manufacturer</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {manufacturers.map((manufacturer) => (
          <button
            key={manufacturer.name}
            onClick={() => handleManufacturerSelect(manufacturer.name)}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent"
          >
            <div className="w-10 h-10 relative mb-2">
              <Image
                src={manufacturer.logo}
                alt={manufacturer.name}
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-center text-gray-800 text-sm">{manufacturer.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarManufacturerBrowser;