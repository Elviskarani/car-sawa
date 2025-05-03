"use client";

import React, { useState, useEffect } from 'react';
import DealerCard from '@/components/DealerCard';
import { getAllDealers, Dealer } from '@/app/services/api';

export default function DealersPage() {
  // States
  const [dealers, setDealers] = useState<Array<{
    imageSrc: string;
    name: string;
    location: string;
    pageUrl: string;
    verified?: boolean;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const dealersPerPage = 6;

  // Fetch dealers data
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        setLoading(true);
        const dealersData = await getAllDealers();
        
        // Transform dealer data to match component props
        const formattedDealers = dealersData.map((dealer: Dealer) => ({
          imageSrc: dealer.profileImage || '/default-dealer.jpg',
          name: dealer.name,
          location: dealer.location || 'Location not specified',
          pageUrl: `/dealers/${dealer.id}`,
          verified: dealer.verified
        }));
        
        setDealers(formattedDealers);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dealers:', err);
        setError('Failed to load dealers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  // Get current dealers for pagination
  const indexOfLastDealer = currentPage * dealersPerPage;
  const indexOfFirstDealer = indexOfLastDealer - dealersPerPage;
  const currentDealers = dealers.slice(indexOfFirstDealer, indexOfLastDealer);
  
  // Calculate total pages
  const totalPages = Math.ceil(dealers.length / dealersPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-whitesmoke text-gray-800 py-12 px-8">
        <div className="container mx-auto flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#c1ff72] border-t-[#272D3C] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dealers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-whitesmoke text-gray-800 py-12 px-8">
        <div className="container mx-auto flex justify-center items-center min-h-[60vh]">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700">{error}</p>
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
    <div className="w-full bg-whitesmoke text-gray-800 py-5 px-4 md:py-12 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-2 text-gray-800">All Dealers</h1>
        <p className="text-sm text-gray-700 mb-8 max-w-3xl">
          Browse all our partnered dealerships in your area. Find the perfect CarSawa partner dealership that offers exceptional service and the best selection of vehicles.
        </p>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-[#272D3C] font-medium">
            Showing {indexOfFirstDealer + 1}-{Math.min(indexOfLastDealer, dealers.length)} of {dealers.length} dealers
          </p>
        </div>
        
        {/* Dealers grid with consistent layout */}
        <div className="grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.length > 0 ? (
            currentDealers.map((dealer, index) => (
              <DealerCard
                key={index}
                dealerImageSrc={dealer.imageSrc}
                dealershipName={dealer.name}
                location={dealer.location}
                dealershipPageUrl={dealer.pageUrl}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No dealers found.</p>
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
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
  );
}