"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cars, type Car } from "@/app/data/cars";
import CarCard from "@/components/carcard";

function Cars() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showBudgetFilter, setShowBudgetFilter] = useState(false);

  const carBrands = [
    "Toyota",
    "Mazda",
    "Nissan",
    "Honda",
    "Mitsubishi",
    "Subaru",
    "Mercedes-Benz",
    "BMW",
    "Audi",
    "Volkswagen",
    "Hyundai",
    "Kia",
    "Suzuki",
  ];

  // Filter cars based on search query and price filter
  const filteredCars = cars.filter((car) => {
    const matchesSearch = searchQuery
      ? car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.condition.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesPrice = priceFilter
      ? (() => {
          const [min, max] = priceFilter.split("-").map((range) => {
            if (range.includes("Above")) return Infinity;
            return (
              parseFloat(range.replace(/[KM]/g, "")) *
              (range.includes("M") ? 1000000 : 1000)
            );
          });
          return car.price >= min && (max === Infinity || car.price <= max);
        })()
      : true;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#272D3C] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Car</h1>
          <p className="text-gray-300">
            Browse through our extensive collection of quality vehicles
          </p>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by make, model, or condition..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0 text-[#272D3C]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full text-[#272D3C] hover:text-[#1a1a1a] mb-4"
                  onClick={() => setShowBudgetFilter(!showBudgetFilter)}
                >
                  <h3 className="font-semibold text-lg">Filter by budget</h3>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      showBudgetFilter ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showBudgetFilter && (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "0- 500K",
                      "500K- 1M",
                      "1M- 2M",
                      "2M- 3M",
                      "3M- 5M",
                      "5M- 10M",
                      "Above 10M",
                    ].map((range) => (
                      <button
                        key={range}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                          priceFilter === range
                            ? "bg-[#272D3C] text-white"
                            : "bg-gray-50 hover:bg-[#c1ff72] hover:text-[#1a1a1a]"
                        }`}
                        onClick={() => setPriceFilter(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="flex items-center justify-between w-full text-[#272D3C] hover:text-[#1a1a1a]"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                <span className="font-semibold text-lg">Advanced search</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    showAdvancedSearch ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showAdvancedSearch && (
                <div className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-[#272D3C]">
                      Brand & Model
                    </h3>
                    <select
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">Vehicle Brand</option>
                      {carBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-[#272D3C]">
                      Year of Manufacture
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Min YOM"
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0"
                        value={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Max YOM"
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0"
                        value={maxYear}
                        onChange={(e) => setMaxYear(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-[#272D3C]">
                      Price & Currency
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Min Price"
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Max Price"
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                    <select
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c1ff72] focus:ring-0"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="KES">KES</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              )}

              <button className="w-full bg-[#272D3C] text-white py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors">
                Search Cars
              </button>
            </div>
          </div>

          {/* Main Content - Car Listings */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 lg:px-30 px-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <Link href={`/cars/${car.id}`} key={car.id}>
                  <CarCard
                    carImageSrc={car.imageUrl}
                    carName={`${car.make} ${car.model}`}
                    price={(car.price).toLocaleString()}
                    carPageUrl={`/cars/${car.id}`}
                    year={car.year.toString()}
                    mileage={car.mileage ? car.mileage.toLocaleString() : '0'}
                    transmission={car.transmission}
                    fuelType={car.fuelType || 'Petrol'}
                    engineSize={car.engineSize}
                    status="Available"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cars;
