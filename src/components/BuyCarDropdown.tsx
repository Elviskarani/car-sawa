"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';


const BuyCarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center text-white hover:text-white font-bold"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      > 
        Buy Car
        <svg 
          className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
          <Link 
            href="/dealers" 
            className="block px-4 py-2 text-sm text-white hover:bg-[#c1ff72] hover:text-[#272D3C]"
          >
            View All Dealers
          </Link>
          <Link 
            href="/cars" 
            className="block px-4 py-2 text-sm text-white hover:bg-[#c1ff72] hover:text-[#272D3C]"
          >
            Browse New Cars
          </Link>
          <Link 
            href="/used-cars" 
            className="block px-4 py-2 text-sm text-white hover:bg-[#c1ff72] hover:text-[#272D3C]"
          >
            Browse Used Cars
          </Link>
          <Link 
            href="/cars/compare" 
            className="block px-4 py-2 text-sm text-white hover:bg-[#c1ff72] hover:text-[#272D3C]"
          >
            Compare Models
          </Link>
        </div>
      )}
    </div>
  );
};

export default BuyCarDropdown;