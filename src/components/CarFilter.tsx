// components/CarFilter.tsx
"use client";

import React, { useState } from 'react';

const CarFilter = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string>("Used");
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const selectPrice = (price: string) => {
    setSelectedPrice(price);
    setOpenDropdown(null);
  };

  const selectCondition = (condition: string) => {
    setSelectedCondition(condition);
    setOpenDropdown(null);
  };

  const selectMake = (make: string) => {
    setSelectedMake(make);
    setOpenDropdown(null);
  };

  const selectBodyType = (bodyType: string) => {
    setSelectedBodyType(bodyType);
    setOpenDropdown(null);
  };


  const priceRanges = [
    "0 - 500K",
    "500K - 1M",
    "1M - 2M",
    "2M - 3M",
    "3M - 5M",
    "5M - 10M",
    "Above 10M"
  ];

  const makes = [ 
    "Audi",
    "BMW",
    "Ford",
    "Honda",
    "Hyundai",
    "Subaru",
    "Mazda",
    "Mercedes",
    "Nissan",
    "Toyota",
    "Volkswagen",
    "Volvo",
    "Land Rover",
    "Lexus",
  ];

  const bodyTypes = [
    "SUVs",
    "Hatchbacks",
    "Saloons",
    "Coupes",
    "Estate Cars",
    "People carriers",
    "Sports cars",
    "Convertibles",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      {/* Clear filters */}
      <div className="mb-1">
        <button 
          className="font-medium text-gray-900 text-sm"
          onClick={() => {
            setSelectedPrice(null);
            setOpenDropdown(null);
          }}
        >
          Clear filters
        </button>
      </div>
      
      {/* Sort by */}
      <div className="py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Sort by</span>
        </div>
      </div>
      
      {/* Price */}
      <div className="py-3 border-b border-gray-200 relative">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown('price')}
        >
          <span className="font-bold text-gray-900">Price</span>
          <div className="flex items-center">
            {selectedPrice && (
              <span className="text-gray-600 mr-1">{selectedPrice}</span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'price' ? 'transform rotate-180' : ''}`}
            >
              <path 
                fillRule="evenodd" 
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
        
        {/* Price dropdown */}
        {openDropdown === 'price' && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="grid grid-cols-2 gap-2 p-2">
              {priceRanges.map((range) => (
                <button 
                  key={range} 
                  className={`px-4 py-2 rounded border ${selectedPrice === range ? 'border-black font-medium' : 'border-gray-300'} hover:border-gray-500`}
                  onClick={() => selectPrice(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* New/Used */}
      <div className="py-3 border-b border-gray-200 relative">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown('condition')}
        >
          <span className="font-bold text-gray-900">New/Used</span>
          <div className="flex items-center">
            <span className="text-gray-600 mr-1">{selectedCondition}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'condition' ? 'transform rotate-180' : ''}`}
            >
              <path 
                fillRule="evenodd" 
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
        
        {/* New/Used dropdown */}
        {openDropdown === 'condition' && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="grid grid-cols-2 gap-2 p-2">
              <button 
                className={`px-4 py-2 rounded border ${selectedCondition === 'New' ? 'border-black font-medium' : 'border-gray-300'} hover:border-gray-500`}
                onClick={() => selectCondition('New')}
              >
                Buy New
              </button>
              <button 
                className={`px-4 py-2 rounded border ${selectedCondition === 'Used' ? 'border-black font-medium' : 'border-gray-300'} hover:border-gray-500`}
                onClick={() => selectCondition('Used')}
              >
                Buy Used
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Make */}
      <div className="py-3 border-b border-gray-200 relative">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown('make')}
        >
          <span className="font-bold text-gray-900">Make</span>
          {selectedMake && (
            <span className="text-gray-600 mr-1">{selectedMake}</span>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Make dropdown */}
      {openDropdown === 'make' && (
       <div className="absolute left-0 w-78 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
       <div className="max-h-[200px] overflow-y-auto">
         <div className="grid grid-cols-1 gap-2 p-2">
           {makes.map((make) => (
             <button
               key={make}
               className={`px-4 py-2 rounded border ${selectedMake === make ? 'border-black font-medium' : 'border-gray-300'} hover:border-gray-500`}
               onClick={() => selectMake(make)}
             >
               {make}
             </button>
           ))}
         </div>
       </div>
     </div>
      )}
      
      {/* Body Type */}
      <div className="py-3 border-b border-gray-200 relative">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown('bodyType')}
        >
          <span className="font-bold text-gray-900">Body Type</span>
          {selectedBodyType && (
            <span className="text-gray-600 mr-1">{selectedBodyType}</span>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Body Type dropdown */}
      {openDropdown === 'bodyType' && (
        <div className="absolute left-0 w-78 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="max-h-[200px] overflow-y-auto">
            <div className="grid grid-cols-1 gap-2 p-2">
              {bodyTypes.map((bodyType) => (
                <button
                  key={bodyType}
                  className={`px-4 py-2 rounded border ${selectedBodyType === bodyType ? 'border-black font-medium' : 'border-gray-300'} hover:border-gray-500`}
                  onClick={() => selectBodyType(bodyType)}
                >
                  {bodyType}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CarFilter;