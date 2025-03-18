import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CarTypeBrowser = () => {
  const carTypes = [
    { type: 'SUVs', image: '/suv-dc743039.svg' },
    { type: 'Hatchbacks', image: '/hatchback-235fe02d.svg' },
    { type: 'Saloons', image: '/saloon-b8d4b50e.svg' },
    { type: 'Coupes', image: '/coupe-b6bef833.svg' },
    { type: 'Estate cars', image: '/estate-f29bd84f.svg' },
    { type: 'People carriers', image: '/people_carrier-d75a44fc.svg' },
    { type: 'Sports cars', image: '/sports_car-8604921b.svg' },
    { type: 'Convertibles', image: '/convertible-71f66687.svg' },
  ];

  return (
    <div className="bg-white px-52 py-6">
      <h2 className="text-lg text-gray-800 font-bold mb-4">Browse by car type</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {carTypes.map((car) => (
          <Link 
            href={`/cars/${car.type.toLowerCase().replace(' ', '-')}`} 
            key={car.type}
            className="bg-white rounded p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-10 relative mb-2">
              <Image
                src={car.image}
                alt={car.type}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-center text-gray-800 text-xs">{car.type}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarTypeBrowser;