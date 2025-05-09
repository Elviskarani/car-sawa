"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchCars, Car } from "@/app/services/api";
import CarCard from "@/components/carcard";

const CarTypeBrowser = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const carTypes = [
    { type: 'SUV', image: '/suv-dc743039.svg', displayName: 'SUVs' },
    { type: 'Hatchback', image: '/hatchback-235fe02d.svg', displayName: 'Hatchbacks' },
    { type: 'Sedan', image: '/saloon-b8d4b50e.svg', displayName: 'Saloons' },
    { type: 'Coupe', image: '/coupe-b6bef833.svg', displayName: 'Coupes' },
    { type: 'Wagon', image: '/estate-f29bd84f.svg', displayName: 'Estate cars' },
    { type: 'Van', image: '/people_carrier-d75a44fc.svg', displayName: 'People carriers' },
    { type: 'Sports', image: '/sports_car-8604921b.svg', displayName: 'Sports cars' },
    { type: 'Convertible', image: '/convertible-71f66687.svg', displayName: 'Convertibles' },
  ];

  // Fetch cars based on selected type
  useEffect(() => {
    if (!selectedType) {
      setFilteredCars([]);
      return;
    }
    
    const fetchCarsByType = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the search API with body type filter
        const response = await searchCars({
          bodyType: selectedType
        });
        
        setFilteredCars(response.data);
      } catch (err) {
        console.error('Error fetching cars by type:', err);
        setError('Failed to load vehicles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarsByType();
  }, [selectedType]);

  // Handle type selection
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // Scroll to the results section
    setTimeout(() => {
      document.getElementById('carResults')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Reset selection
  const handleReset = () => {
    setSelectedType(null);
  };

  return (
    <div className="bg-white px-4 md:px-8 py-6">
      <h2 className="text-xl text-gray-800 font-bold mb-4">Browse by car type</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
        {carTypes.map((car) => (
          <button 
            key={car.type}
            onClick={() => handleTypeSelect(car.type)}
            className={`bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
              selectedType === car.type ? 'border-[#c1ff72]' : 'border-transparent'
            }`}
          >
            <div className="w-10 h-10 relative mb-2">
              <Image
                src={car.image}
                alt={car.displayName}
                width={40}
                height={40}
              />
            </div>
            <span className="text-center text-gray-800 text-sm">{car.displayName}</span>
          </button>
        ))}
      </div>
      
      {/* Car Results Section */}
      {selectedType && (
        <div id="carResults" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#272D3C]">
              {carTypes.find(c => c.type === selectedType)?.displayName || selectedType}
            </h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors"
            >
              Back to all types
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#c1ff72] border-t-[#272D3C] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading vehicles...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => handleTypeSelect(selectedType)}
                className="mt-4 px-4 py-2 bg-[#272D3C] text-white rounded-lg hover:bg-[#1a1a1a]"
              >
                Try Again
              </button>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.name}
                  carImageSrc={car.images[0]}
                  carName={`${car.make} ${car.model}`}
                  price={car.price.toLocaleString()}
                  carPageUrl={`/cars/${car.name}`}
                  year={car.year.toString()}
                  mileage={car.mileage ? car.mileage.toLocaleString() : '0'}
                  transmission={car.transmission}
                  fuelType={car.fuelType || 'Petrol'}
                  engineSize={car.engineSize}
                  status={car.status === "AVAILABLE" ? "Available" : "Sold"}
                  dealerLocation={car.dealer?.location}
                  dealerWhatsapp={car.dealer?.whatsapp}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg shadow p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No {carTypes.find(c => c.type === selectedType)?.displayName || selectedType} Available
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any {selectedType.toLowerCase()} vehicles in our current inventory.
              </p>
              <p className="text-gray-500">
                Please try selecting a different vehicle type or check back later as our inventory is updated regularly.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarTypeBrowser;