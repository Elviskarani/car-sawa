import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cars } from '@/app/data/cars';
import CarCard from "@/components/carcard";

interface PageParams {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  // Generate static params from unique dealer IDs in the cars array
  const uniqueDealerIds = [...new Set(cars.map(car => car.dealer.id))];
  return uniqueDealerIds.map((id) => ({
    id: id,
  }));
}

export default function DealerPage({ params }: PageParams): React.ReactNode {
  const { id } = params;
  
  // Find the first car with this dealer ID to get dealer details
  const dealerCar = cars.find(car => car.dealer.id === id);
  
  if (!dealerCar) {
    notFound();
  }

  // Get dealer information from the first car
  const dealer = dealerCar.dealer;

  // Filter cars for this specific dealer
  const dealerCars = cars.filter(car => car.dealer.id === id);

  return (
    <div className="bg-whitesmoke w-full">
        <div className="flex items-center w-full px-8 py-4 bg-[#272D3C] mb-7">
        {/* Back button */}
        <Link href="/dealers" className="inline-flex items-center text-white mb-6 hover:underline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Dealers
        </Link>
        </div>

        <div className="container mx-auto">

        {/* Hero Image */}
        <div className="flex items-center mb-7">
          <Image
            src={dealer.profileImage}
            alt={`${dealer.name} dealership`}
            width={150}
            height={150}
            priority
            className="w-[70px] h-[70px] object-contain shadow-lg bg-white rounded-full"
          />
          <h1 className="text-xs md:text-2xl font-bold ml-4">{dealer.name}</h1>
        </div>

      
        <h1 className="font-semibold text-2xl mb-6">Listings</h1>

        {/* Dealer Cars Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-5 lg:grid-cols-4 gap-6">
          {dealerCars.length > 0 ? (
            dealerCars.map((car) => (
              <CarCard 
                key={car.id}
                carImageSrc={car.image}
                carName={car.name}
                price={car.price.toString()}
                carPageUrl={`/cars/${car.id}`}
                year={car.year?.toString()}
                mileage={car.mileage?.toString()}
                transmission={car.transmission}
                fuelType={car.fuelType}
                engineSize={car.engineSize}
                status={car.status === 'AVAILABLE' ? 'Available' : 'sold'}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No cars available for this dealer.
            </p>
          )}
        </div>
        </div>
     
    </div>
  );
}