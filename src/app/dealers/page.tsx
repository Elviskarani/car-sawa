// app/dealers/page.tsx
import React from 'react';
import DealerCard from '@/components/DealerCard';

export default function DealersPage() {
  // Updated dealer data with consistent IDs
  const dealers = [
    { 
      imageSrc: '/essence.webp', 
      name: 'Essence Auto', 
      location: 'Kiambu Road, Nairobi', 
      pageUrl: '/dealers/essence-auto' 
    },
    { 
      imageSrc: '/nissan.webp', 
      name: 'Nissan Motors', 
      location: 'City A', 
      pageUrl: '/dealers/nissan-motors' 
    },
    { 
      imageSrc: '/dealer2.jpg', 
      name: 'Dealer Two', 
      location: 'City B', 
      pageUrl: '/dealers/dealer-two' 
    },
    { 
      imageSrc: '/dealer3.jpg', 
      name: 'Dealer Three', 
      location: 'City C', 
      pageUrl: '/dealers/dealer-three' 
    },
    { 
      imageSrc: '/dealer5.jpg', 
      name: 'Highway Motors', 
      location: 'Mombasa Road', 
      pageUrl: '/dealers/highway-motors' 
    }
  ];

  return (
    <div className="w-full bg-[#DEDCD9] py-5 px-3 md:py-12 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-2 text-gray-800">All Dealers</h1>
        <p className="text-sm text-gray-700 mb-8 max-w-3xl">
          Browse all our partnered dealerships in your area. Find the perfect CarSawa partner dealership that offers exceptional service and the best selection of vehicles.
        </p>
        
        {/* Search section */}
        <div className="bg-white p-2 md:p-2 lg:p-2 rounded-lg mb-4 shadow-sm">
          <h2 className="text-sm font-semibold mb-2">Find a Dealer</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your location"
              className="p-2 rounded border flex-1"
            />
            <button
              className="bg-[#272D3C] text-white py-1 px-3 rounded hover:bg-opacity-90"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Dealers grid with consistent layout */}
        <div className="grid grid-cols-1 lg:px-30 px-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer, index) => (
            <DealerCard
              key={index}
              dealerImageSrc={dealer.imageSrc}
              dealershipName={dealer.name}
              location={dealer.location}
              dealershipPageUrl={dealer.pageUrl}
            />
          ))}
        </div>     
      </div>
    </div>
  );
}