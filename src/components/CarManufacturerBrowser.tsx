import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CarManufacturerBrowser = () => {
  const manufacturers = [
    { name: 'Audi', logo: '/audi.webp' },
    { name: 'BMW', logo: '/bmw.webp' },
    { name: 'Ford', logo: '/ford.webp' },
    { name: 'Honda', logo: '/honda.webp' },
    { name: 'Hyundai', logo: '/hyundai.webp' },
    { name: 'Subaru', logo: '/subaru.webp' },
    { name: 'Mazda', logo: '/mazda.webp' },
    { name: 'Mercedes', logo: '/mercedes.webp' },
    { name: 'Nissan', logo: '/nissan.webp' },
    { name: 'Toyota', logo: '/toyota.webp' },
    { name: 'Volkswagen', logo: '/VW.webp' },
    { name: 'Volvo', logo: '/volvo.webp' },
    { name: 'Land Rover', logo: '/land_rover.webp' },
    { name: 'Lexus', logo: '/lexus.webp' },
  ];

  return (
    <div className="bg-whitesmoke px-8 py-6">
      <h2 className="text-xl font-bold mb-4">Browse by manufacturer</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {manufacturers.map((manufacturer) => (
          <Link 
            href={`/cars/manufacturer/${manufacturer.name.toLowerCase().replace(' ', '-')}`} 
            key={manufacturer.name}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-10 h-10 relative mb-2">
              <Image
                src={manufacturer.logo}
                alt={manufacturer.name}
                width={40}
                height={40}
                objectFit="contain"
              />
            </div>
            <span className="text-center">{manufacturer.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarManufacturerBrowser;