'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('buy')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
              > 
                Buy Car
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'buy' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'buy' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/cars" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Browse All Cars
                </Link>
                <Link href="/dealers" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Find Dealers
                </Link>
                <Link href="/compare" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Compare Cars
                </Link>
              </div>
            </div>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('sell')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
              > 
                Sell Car
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'sell' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'sell' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/sell" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  List Your Car
                </Link>
                <Link href="/value" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Value Your Car
                </Link>
              </div>
            </div>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('services')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
              > 
                Services
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'services' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'services' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/insurance" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Car Insurance
                </Link>
                <Link href="/finance" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Car Finance
                </Link>
                <Link href="/inspection" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Car Inspection
                </Link>
              </div>
            </div>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('research')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
              > 
                Research
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'research' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'research' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/reviews" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Car Reviews
                </Link>
                <Link href="/news" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  News & Guides
                </Link>
              </div>
            </div>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-bold">FAQ</Link>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('about')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
              > 
                About CARSAWA
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'about' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  About Us
                </Link>
                <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Contact Us
                </Link>
                <Link href="/careers" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">
                  Careers
                </Link>
              </div>
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
              onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className={`absolute top-16 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-200 ${activeDropdown === 'mobile' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="py-2">
                <Link href="/cars" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">Browse All Cars</Link>
                <Link href="/dealers" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">Find Dealers</Link>
                <Link href="/sell" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">List Your Car</Link>
                <Link href="/reviews" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">Car Reviews</Link>
                <Link href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">FAQ</Link>
                <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">About Us</Link>
                <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-[#c1ff72] hover:text-[#1a1a1a]">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;