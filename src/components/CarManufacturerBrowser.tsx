"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchCars, Car } from "@/app/services/api";
import CarCard from "@/components/carcard";

const CarManufacturerBrowser = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  // Fetch cars based on selected manufacturer
  useEffect(() => {
    if (!selectedManufacturer) {
      setFilteredCars([]);
      return;
    }
    
    const fetchCarsByManufacturer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the search API with make filter
        const response = await searchCars({
          make: selectedManufacturer
        });
        
        setFilteredCars(response.data);
      } catch (err) {
        console.error('Error fetching cars by manufacturer:', err);
        setError('Failed to load vehicles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarsByManufacturer();
  }, [selectedManufacturer]);

  // Handle manufacturer selection
  const handleManufacturerSelect = (manufacturer: string) => {
    setSelectedManufacturer(manufacturer);
    // Scroll to the results section
    setTimeout(() => {
      document.getElementById('manufacturerResults')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Reset selection
  const handleReset = () => {
    setSelectedManufacturer(null);
  };

  return (
    <div className="bg-whitesmoke px-4 md:px-8 py-6">
      <h2 className="text-xl text-gray-800 font-bold mb-4">Browse by manufacturer</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {manufacturers.map((manufacturer) => (
          <button 
            key={manufacturer.name}
            onClick={() => handleManufacturerSelect(manufacturer.name)}
            className={`bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
              selectedManufacturer === manufacturer.name ? 'border-[#c1ff72]' : 'border-transparent'
            }`}
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
      
      {/* Manufacturer Results Section */}
      {selectedManufacturer && (
        <div id="manufacturerResults" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#272D3C]">
              {selectedManufacturer} Cars
            </h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors"
            >
              Back to all manufacturers
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
                onClick={() => handleManufacturerSelect(selectedManufacturer)}
                className="mt-4 px-4 py-2 bg-[#272D3C] text-white rounded-lg hover:bg-[#1a1a1a]"
              >
                Try Again
              </button>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  carImageSrc={car.imageUrl}
                  carName={`${car.make} ${car.model}`}
                  price={car.price.toLocaleString()}
                  carPageUrl={`/cars/${car.id}`}
                  year={car.year.toString()}
                  mileage={car.mileage ? car.mileage.toLocaleString() : undefined}
                  transmission={car.transmission}
                  fuelType={car.fuelType}
                  engineSize={car.engineSize}
                  status={car.status === "AVAILABLE" ? "Available" : "Sold"}
                  dealerLocation={car.dealer.location}
                  dealerWhatsappNumber={car.dealer.whatsappNumber}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg shadow p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No {selectedManufacturer} Cars Available
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any {selectedManufacturer} vehicles in our current inventory.
              </p>
              <p className="text-gray-500">
                Please try selecting a different manufacturer or check back later as our inventory is updated regularly.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarManufacturerBrowser;