// app/dealers/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock database of dealers
const dealersData = [
  { 
    id: 'essence-auto',
    imageSrc: '/essence.webp', 
    name: 'Essence Auto', 
    location: 'Kiambu Road, Nairobi',
    contactNumber: '+254 712 345 678',
    email: 'info@essenceauto.co.ke',
    description: 'Essence Auto is a premium car dealership specializing in luxury vehicles. With over 15 years of experience, we provide top-quality cars and exceptional customer service.',
    openingHours: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed',
    services: ['New Car Sales', 'Used Car Sales', 'Trade-In', 'Financing', 'Car Service']
  },
  { 
    id: 'nissan-motors',
    imageSrc: '/nissan.webp', 
    name: 'Nissan Motors', 
    location: 'City A',
    contactNumber: '+254 723 456 789',
    email: 'sales@nissanmotors.co.ke',
    description: 'Official Nissan dealership offering the latest models and certified pre-owned vehicles. We provide comprehensive after-sales service and genuine Nissan parts.',
    openingHours: 'Monday - Saturday: 8:30 AM - 5:30 PM\nSunday: 10:00 AM - 2:00 PM',
    services: ['New Nissan Sales', 'Certified Pre-owned', 'Service Center', 'Genuine Parts', 'Test Drives']
  },
  { 
    id: 'highway-motors',
    imageSrc: '/dealer5.jpg', 
    name: 'Highway Motors', 
    location: 'Mombasa Road', 
    contactNumber: '+254 734 567 890',
    email: 'contact@highwaymotors.co.ke',
    description: 'Highway Motors specializes in commercial vehicles and trucks. We offer sales, leasing, and maintenance services for businesses of all sizes.',
    openingHours: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 3:00 PM\nSunday: Closed',
    services: ['Commercial Vehicles', 'Trucks', 'Fleet Solutions', 'Maintenance', 'Parts']
  }
];

// This function generates all possible paths for static generation
export async function generateStaticParams() {
  return dealersData.map((dealer) => ({
    id: dealer.id,
  }));
}

export default function DealerPage({ params }) {
  const { id } = params;
  
  // Find the dealer with the matching ID
  const dealer = dealersData.find(dealer => dealer.id === id);
  
  // If no dealer is found, show 404 page
  if (!dealer) {
    notFound();
  }

  return (
    <div className="bg-[#DEDCD9] min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Back button */}
        <Link href="/dealers" className="inline-flex items-center text-[#272D3C] mb-6 hover:underline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Dealers
        </Link>

        {/* Hero Image */}
              <div className="flex items-center mb-7">
                  <Image
                      src={dealer.imageSrc}
                      alt={`${dealer.name} dealership`}
                      width={150}
                      height={150}
                      priority
                      className="w-[70px] h-[70px] object-contain shadow-lg bg-white rounded-full"
                  />
                  <h1 className="text-xs md:text-2xl font-bold ml-4">{dealer.name}</h1>
              </div>

              {/*listing */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Listings</h2>
            </div>
            
        {/* Dealer Information */}
        <div className="bg-white rounded-lg shadow-md p-5 mt-3 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">

            
            {/* Location and Contact */}
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <div className="flex items-start mb-2">
                <svg className="w-5 h-5 text-[#272D3C] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{dealer.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-[#272D3C] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{dealer.contactNumber}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#272D3C] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{dealer.email}</span>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Opening Hours</h2>
              <div className="whitespace-pre-line">
                {dealer.openingHours}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About {dealer.name}</h2>
            <p className="text-gray-700">{dealer.description}</p>
          </div>

   
        
        </div>

      
      </div>
    </div>
  );
}