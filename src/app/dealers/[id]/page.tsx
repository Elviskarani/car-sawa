"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation'; // useRouter for programmatic navigation
import { getDealerById, getCarsByDealer, Dealer, PaginatedCarResponse } from '@/app/services/api';
import CarCard from "@/components/carcard"; // Assuming this path is correct
import { FiPhone, FiMapPin } from 'react-icons/fi'; // FiCheck might not be used here directly

// Default image paths (place these in your /public directory or adjust paths)
const DEFAULT_DEALER_IMAGE = '/images/default-dealer.jpg';


export default function DealerDetailPage() {
  const params = useParams();
  const dealerId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  const [dealer, setDealer] = useState<Dealer | null>(null);
  // State to hold the paginated response for cars, or just the cars array if not paginating here
  const [dealerCarsResponse, setDealerCarsResponse] = useState<PaginatedCarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination for dealer's cars (optional, but good for many cars)
  const [carsCurrentPage, setCarsCurrentPage] = useState(1);
  const carsPerPage = 8; // Or your preferred number

  const fetchDealerData = useCallback(async (page: number) => {
    if (!dealerId) {
      // This should ideally trigger Next.js notFound behavior if dealerId is truly invalid from URL
      // For client-side checks after mount, you might redirect or show an error.
      setError("Dealer ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch dealer details
      // Only fetch dealer details once, or if dealerId changes.
      // Cars can be fetched independently if paginating them.
      let currentDealer = dealer;
      if (!currentDealer) { // Fetch dealer only if not already fetched
        currentDealer = await getDealerById(dealerId);
        setDealer(currentDealer);
      }

      // Fetch dealer's cars with pagination
      const carsData = await getCarsByDealer(dealerId, {
        page: page,
        pageSize: carsPerPage,
      });

      setDealerCarsResponse(carsData);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch dealer details or cars:', err);
      // If getDealerById fails with 404, it might reject with a specific message
      if (err.message && err.message.toLowerCase().includes('not found')) {
          notFound(); // Trigger Next.js 404 page
          return;
      }
      setError(err.message || 'Failed to load dealer information. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [dealerId, dealer, carsPerPage]); // Added dealer to dependencies for the conditional fetch logic


  useEffect(() => {
    if (dealerId) {
      fetchDealerData(carsCurrentPage);
    } else if (!dealerId && typeof params.id !== 'undefined') {
        // If params.id was processed and resulted in an empty dealerId (e.g. from array)
        setError("Invalid Dealer ID in URL.");
        setLoading(false);
        // Optionally call notFound() here if this state is definitively an error
        // notFound();
    } else if (typeof params.id === 'undefined' && !loading){
        // This case might occur if the page is loaded without an ID parameter at all.
        // Depending on your routing, this might be an impossible state or require a notFound().
        // For now, we assume dealerId will be present or handled by the initial check.
    }
  }, [dealerId, carsCurrentPage, fetchDealerData]); // fetchDealerData is memoized

  const handleCarsPageChange = (newPage: number) => {
    if (newPage > 0 && dealerCarsResponse && newPage <= dealerCarsResponse.pages) {
      setCarsCurrentPage(newPage);
      // Data fetching is handled by useEffect watching carsCurrentPage
    }
  };


  if (!dealerId && !loading && typeof params.id !== 'undefined') { // If dealerId ended up empty after parsing
    // This can happen if params.id is an empty array or some other unexpected value.
    // It's better to show a specific message or redirect.
    // Forcing a Next.js 404 page might be more appropriate here.
    // router.push('/404'); // or return a dedicated error component
    // For now, rely on the error state set in useEffect or fetchDealerData.
    // Or, more directly:
    // notFound(); // if dealerId is essential and missing after parsing.
  }


  // Display loading state
  if (loading && !dealer && !dealerCarsResponse) { // Show full page loader only on initial data load
    return (
      <div className="bg-whitesmoke w-full min-h-screen">
        <div className="flex items-center w-full px-4 py-4 bg-[#272D3C] mb-7">
          <Link href="/dealers" className="inline-flex items-center text-white hover:underline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Dealers
          </Link>
        </div>
        <div className="container mx-auto flex justify-center items-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#c1ff72] border-t-[#272D3C] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dealer information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) { // Removed !dealer check here, error state should be sufficient
    return (
      <div className="bg-whitesmoke w-full min-h-screen">
        <div className="flex items-center w-full px-4 py-4 bg-[#272D3C] mb-7">
          <Link href="/dealers" className="inline-flex items-center text-white hover:underline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Dealers
          </Link>
        </div>
        <div className="container mx-auto flex justify-center items-center py-20">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700">{error}</p>
            <Link href="/dealers"
              className="mt-4 px-4 py-2 bg-[#272D3C] text-white rounded-lg hover:bg-[#1a1a1a] transition"
            >
              Go to Dealers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If loading is false, error is null, but dealer is still null (should have been caught by notFound or error)
  if (!dealer) {
     
      return ( // Fallback if notFound() wasn't triggered properly.
        <div className="bg-whitesmoke w-full min-h-screen">
             <div className="flex items-center w-full px-4 py-4 bg-[#272D3C] mb-7">
                <Link href="/dealers" className="inline-flex items-center text-white hover:underline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Dealers
                </Link>
            </div>
            <div className="container mx-auto flex justify-center items-center py-20">
                <p className="text-gray-700 text-xl">Dealer information could not be loaded.</p>
            </div>
        </div>
      );
  }


  const carsToDisplay = dealerCarsResponse?.cars || [];
  const totalCarsFound = dealerCarsResponse?.total || 0;
  const totalCarPages = dealerCarsResponse?.pages || 0;

  return (
    <div className="bg-whitesmoke w-full">
      <div className="flex items-center w-full px-4 py-4 bg-[#272D3C] mb-7">
        <Link href="/dealers" className="inline-flex items-center text-white hover:underline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Dealers
        </Link>
      </div>

      <div className="container mx-auto">
        {/* Hero Image and Name */}
        <div className="flex px-4 items-center mb-7">
          <div className="relative">
            <Image
              src={dealer.profileImage || DEFAULT_DEALER_IMAGE}
              alt={`${dealer.name} dealership`}
              width={70} // Adjust based on desired display size
              height={70}
              priority // Keep for important above-the-fold images
              className="w-[70px] h-[70px] object-cover shadow-lg bg-white rounded-full border border-gray-200" // Added object-cover and border
            />
          </div>
          <div className="ml-4">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">{dealer.name}</h1>
            {/* You could add a 'verified' badge here if you implement that feature */}
            {/* e.g., dealer.verified && <FiCheck className="text-green-500 inline ml-2" /> */}
          </div>
        </div>

        {/* Dealer Details */}
        <div className="flex flex-col md:flex-row gap-4 px-4 md:gap-8 lg:gap-16 mb-8">
          <div className="flex items-center">
            <div className="p-3 md:p-4 rounded-full bg-gray-100"> {/* Adjusted padding */}
              <FiMapPin className="w-5 h-5 text-gray-700" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-gray-700">{dealer.location || "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-3 md:p-4 rounded-full bg-gray-100"> {/* Adjusted padding */}
              <FiPhone className="w-5 h-5 text-gray-700" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Contact</p>
              <a href={`https://wa.me/${dealer.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-green-600">
                {dealer.whatsapp || "Not available"}
              </a>
            </div>
          </div>
        </div>

        {/* Dealer Cars Section */}
        <div className="px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
            <h2 className="font-semibold text-2xl text-gray-800">Available Cars ({totalCarsFound})</h2>
            {/* Optional: Message if loading cars for a new page */}
            {loading && dealerCarsResponse && <p className="text-sm text-gray-600">Loading cars...</p>}
          </div>

          {carsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {carsToDisplay.map((car) => (
                <CarCard
                  key={car._id || car.id} // Use _id as primary, fallback to id
                  id={car._id || car.id}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                  year={car.year}
                  mileage={car.mileage} 
                  transmission={car.transmission}
                  fuelType={car.fuelType}
                  engineSize={car.engineSize}
                  status={car.status === 'Available' ? 'Available' : car.status}
                  images={car.images}
                />
              ))}
            </div>
          ) : (
             !loading && ( // Only show if not loading and no cars
                <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">No cars currently available from this dealer.</p>
                </div>
             )
          )}

          {/* Pagination for Dealer's Cars */}
          {totalCarPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8 mb-12">
              <button
                onClick={() => handleCarsPageChange(carsCurrentPage - 1)}
                disabled={carsCurrentPage === 1 || loading}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {carsCurrentPage} of {totalCarPages}
              </span>
              <button
                onClick={() => handleCarsPageChange(carsCurrentPage + 1)}
                disabled={carsCurrentPage === totalCarPages || loading}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}