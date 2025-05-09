"use client";

import React, { useState, useEffect } from "react";
import { getAllCars, type Car, type PaginatedCarResponse } from "@/app/services/api";
import dynamic from 'next/dynamic';

// Dynamically import the CarCard component
const CarCard = dynamic(() => import("@/components/carcard"), {
  loading: () => <div className="bg-white rounded-xl h-80 animate-pulse"></div>,
});

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
  
  // Cars data state
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const carsPerPage = 9;

  // Common car brands
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

  // Parse price filter into min-max values for the API
  const getPriceRangeFromFilter = (filterValue: string): { min: number, max: number } => {
    if (!filterValue) return { min: 0, max: 0 };
    
    const parts = filterValue.split("-").map(part => part.trim());
    
    let min = 0;
    let max = 0;
    
    if (parts[0]) {
      // Convert "500K" to 500000, "1M" to 1000000, etc.
      min = parseFloat(parts[0].replace(/[KM]/g, "")) * 
        (parts[0].includes("M") ? 1000000 : (parts[0].includes("K") ? 1000 : 1));
    }
    
    if (parts[1]) {
      if (parts[1].includes("Above")) {
        max = 999999999; // Essentially no upper limit
      } else {
        max = parseFloat(parts[1].replace(/[KM]/g, "")) * 
          (parts[1].includes("M") ? 1000000 : (parts[1].includes("K") ? 1000 : 1));
      }
    }
    
    return { min, max };
  };

  // Fetch cars from API
  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build filters object
      const filters: Record<string, string | number> = {
        page: currentPage,
        pageSize: carsPerPage,
        status: 'Available' // Default to available cars
      };
      
      // Add query filter if provided (backend will need to handle this)
      if (searchQuery) {
        filters.query = searchQuery;
      }
      
      // Add make filter if selected
      if (selectedBrand) {
        filters.make = selectedBrand;
      }
      
      // Add year filters
      if (minYear && !isNaN(parseInt(minYear))) {
        filters.minYear = parseInt(minYear);
      }
      
      if (maxYear && !isNaN(parseInt(maxYear))) {
        filters.maxYear = parseInt(maxYear);
      }
      
      // Add price filters
      if (priceFilter) {
        const { min, max } = getPriceRangeFromFilter(priceFilter);
        if (min > 0) filters.minPrice = min;
        if (max > 0) filters.maxPrice = max;
      } else {
        // Use custom price inputs if available
        if (minPrice && !isNaN(parseInt(minPrice))) {
          filters.minPrice = parseInt(minPrice);
        }
        if (maxPrice && !isNaN(parseInt(maxPrice))) {
          filters.maxPrice = parseInt(maxPrice);
        }
      }
      
      console.log("Fetching with filters:", filters);
      
      // Call the API
      const response = await getAllCars(filters);
      console.log("API response:", response);
      
      // Update states with response data
      setCars(response.cars || []);
      setTotalCars(response.total || 0);
      setTotalPages(response.pages || 1);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars. Please try again later.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars when filters change or on initial load
  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Only re-fetch when page changes
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceFilter, selectedBrand, minYear, maxYear, minPrice, maxPrice]);

  // Function to handle search button click
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCars();
  };

  // Pagination function
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-6">
              <form onSubmit={handleSearch}>
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
                    type="button"
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
                          type="button"
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
                  type="button"
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

                <button 
                  type="submit"
                  className="w-full bg-[#272D3C] text-white py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors mt-4"
                >
                  Search Cars
                </button>
              </form>
            </div>
          </div>

          {/* Main Content - Car Listings */}
          <div className="lg:w-3/4">
            {/* Results count and pagination info */}
            <div className="flex justify-between items-center mb-6 px-4">
              <div className="text-[#272D3C]">
                <p className="font-medium">
                  {loading ? (
                    "Loading cars..."
                  ) : error ? (
                    "Error loading cars"
                  ) : cars.length === 0 ? (
                    "No cars found"
                  ) : (
                    `Showing ${(currentPage - 1) * carsPerPage + 1}-${
                      Math.min(currentPage * carsPerPage, totalCars)
                    } of ${totalCars} cars`
                  )}
                </p>
              </div>
            </div>
            
            {/* Error display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#272D3C]"></div>
              </div>
            )}
            
            {/* Car grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.length > 0 ? (
                  cars.map((car) => (
                    <CarCard
                      key={car._id || car.id || `${car.make}-${car.model}-${car.year}`}
                      id={car._id || car.id || `${car.make}-${car.model}-${car.year}`}
                      make={car.make || ""}
                      model={car.model || ""}
                      price={car.price || 0}
                      year={car.year || 0}
                      mileage={car.mileage || 0}
                      transmission={car.transmission || "N/A"}
                      fuelType={car.fuelType || "N/A"}
                      engineSize={car.engineSize || "N/A"}
                      status={car.status || "Available"}
                      images={car.images || []}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-500">
                    <p>No cars found matching your criteria.</p>
                    <p className="mt-2">Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Pagination controls */}
            {!loading && !error && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#272D3C] text-white hover:bg-[#1a1a1a]"
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex space-x-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show first page, last page, current page, and pages around current
                      let pageToShow;
                      
                      if (totalPages <= 5) {
                        // If 5 or fewer pages, show all
                        pageToShow = i + 1;
                      } else if (currentPage <= 3) {
                        // If near beginning, show first 5 pages
                        pageToShow = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // If near end, show last 5 pages
                        pageToShow = totalPages - 4 + i;
                      } else {
                        // Show current page and 2 pages on each side
                        pageToShow = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageToShow}
                          onClick={() => paginate(pageToShow)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === pageToShow
                              ? "bg-[#c1ff72] text-[#272D3C] font-bold"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {pageToShow}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#272D3C] text-white hover:bg-[#1a1a1a]"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cars;