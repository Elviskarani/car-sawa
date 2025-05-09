"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getDealerById, getCarsByDealerId, Car, Dealer } from '@/app/services/api';
import CarCard from "@/components/carcard";
import { FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

export default function DealerDetailPage() {
  const params = useParams();
  const dealerId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [dealerCars, setDealerCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDealerData = async () => {
      if (!dealerId) {
        notFound();
        return;
      }

      try {
        setLoading(true);
        
        // Fetch dealer details and their cars in parallel
        const [dealerData, carsData] = await Promise.all([
          getDealerById(dealerId),
          getCarsByDealerId(dealerId)
        ]);
        
        setDealer(dealerData);
        setDealerCars(carsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dealer details:', err);
        setError('Failed to load dealer information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDealerData();
  }, [dealerId]);

  if (loading) {
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

  if (error || !dealer) {
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
            <p className="text-gray-700">{error || 'Dealer not found'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#272D3C] text-white rounded-lg hover:bg-[#1a1a1a] transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-whitesmoke w-full">
      <div className="flex items-center w-full px-4 py-4 bg-[#272D3C] mb-7">
        {/* Back button */}
        <Link href="/dealers" className="inline-flex items-center text-white mb-6 hover:underline">
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
              src={dealer.profileImage}
              alt={`${dealer.name} dealership`}
              width={150}
              height={150}
              priority
              className="w-[70px] h-[70px] object-contain shadow-lg bg-white rounded-full"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-xs md:text-2xl font-bold">{dealer.name}</h1>
          </div>
        </div>

        {/* Dealer Details */}
        <div className="flex flex-col md:flex-row gap-4 px-4 md:gap-8 lg:gap-16 mb-8">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-gray-100">
              <FiMapPin className="w-5 h-5 text-gray-700" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium">{dealer.location || "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-4 rounded-full bg-gray-100">
              <FiPhone className="w-5 h-5 text-gray-700" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Contact</p>
              <p className="font-medium">{dealer.whatsapp || "Not available"}</p>
            </div>
          </div>
        </div>

        {/* Dealer Cars Section */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Available Cars</h2>
            <p className="text-sm text-gray-600">{dealerCars.length} vehicles found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {dealerCars.length > 0 ? (
              dealerCars.map((car) => (
                <CarCard 
                  key={car.name}
                  carImageSrc={car.images[0]}
                  carName={`${car.make} ${car.model}`}
                  price={car.price.toString()}
                  carPageUrl={`/cars/${car.name}`}
                  year={car.year?.toString()}
                  mileage={car.mileage?.toString()}
                  transmission={car.transmission}
                  fuelType={car.fuelType}
                  engineSize={car.engineSize}
                  status={car.status === 'AVAILABLE' ? 'Available' : 'Sold'}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No cars available from this dealer.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}