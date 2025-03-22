'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-800 flex items-center">
              <span className="mr-2">CARSAWA</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
                onClick={() => toggleDropdown('buy')}
              > 
                Buy Car
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'buy' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'buy' && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link href="/cars" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Browse All Cars
                  </Link>
                  <Link href="/dealers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Find Dealers
                  </Link>
                  <Link href="/compare" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Compare Cars
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
                onClick={() => toggleDropdown('sell')}
              > 
                Sell Car
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'sell' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'sell' && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link href="/sell" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    List Your Car
                  </Link>
                  <Link href="/value" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Value Your Car
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
                onClick={() => toggleDropdown('services')}
              > 
                Services
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link href="/insurance" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Car Insurance
                  </Link>
                  <Link href="/finance" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Car Finance
                  </Link>
                  <Link href="/inspection" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Car Inspection
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
                onClick={() => toggleDropdown('research')}
              > 
                Research
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'research' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'research' && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link href="/reviews" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Car Reviews
                  </Link>
                  <Link href="/news" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    News & Guides
                  </Link>
                </div>
              )}
            </div>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-bold">FAQ</Link>
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
                onClick={() => toggleDropdown('about')}
              > 
                About CARSAWA
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    About Us
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Contact Us
                  </Link>
                  <Link href="/careers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Careers
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
              <FiPhone className="mr-2" />
              +254791001601
            </Link>
            <Link href="/login" className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
              Sign Up/Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-gray-900"
              onClick={() => toggleDropdown('mobile')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {activeDropdown === 'mobile' && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
                <div className="py-2">
                  <Link href="/cars" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Browse All Cars</Link>
                  <Link href="/dealers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Find Dealers</Link>
                  <Link href="/sell" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">List Your Car</Link>
                  <Link href="/reviews" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Car Reviews</Link>
                  <Link href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">FAQ</Link>
                  <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</Link>
                  <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact Us</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;