'use client'



import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import LoginModal from '../components/LoginModal';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <header className="bg-[#272D3C] text-white shadow-sm">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl text-[#c1ff72] flex items-center">
                <span className="mr-2">CARSAWA</span>
              </Link>
            </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
        
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('Buy')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-white hover:text-white font-bold"
              > 
                Buy Car
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'Buy' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'Buy' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/cars" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  Browse new Cars
                </Link>
                <Link href="/used-cars" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  Browse used Cars
                </Link>
              </div>
            </div>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('sell')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-white hover:text-white font-bold"
              > 
                Sell Car
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'sell' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'sell' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/sell-your-car" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  List Your Car
                </Link>
                <Link href="/value" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  Value Your Car
                </Link>
              </div>
            </div>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('services')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-white hover:text-white font-bold"
              > 
                Services
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'services' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${activeDropdown === 'services' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <Link href="/insurance" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  Car Insurance
                </Link>
                <Link href="/finance" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  Car Finance
                </Link>
                <Link href="/inspection" className="block px-4 py-2 text-[#272D3C] hover:font-bold hover:underline">
                  Car Inspection
                </Link>
              </div>
            </div>
           
            <Link href="/faq" className="text-white hover:text-white font-bold">FAQ</Link>
            <div className="relative group"
                 onMouseEnter={() => setActiveDropdown('about')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="flex items-center text-white hover:text-white font-bold"
              > 
                About CARSAWA
                <svg className={`ml-1 w-4 h-4 transform ${activeDropdown === 'about' ? 'rotate-180' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </nav>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="flex items-center text-white hover:text-white font-bold"> 
                <FiPhone className="mr-2" />
                +254791001601
              </Link>
              <button 
               onClick={() => setShowLoginModal(true)} 
               className="flex items-center text-white hover:text-white font-bold"
               aria-label="Sign Up or Login"
             >
               <FiUser className="block md:hidden" aria-hidden="true" />
               <span className="hidden md:block">Sign Up/Login</span>
              </button>
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-white hover:text-white"
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

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={handleCloseLoginModal} />
    </>
  );
};

export default Header;