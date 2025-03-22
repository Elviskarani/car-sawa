"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';

import BuyCarDropdown from '../components/BuyCarDropdown';
import LoginModal from '../components/LoginModal';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <header className="bg-[#DEDCD9] shadow-sm">
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
                <BuyCarDropdown />
              </div>
              <div className="relative group">
                <Link href="/sell-your-car" className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
                  Sell Car
                  
                
                </Link>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
                  Services
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-bold">FAQ</Link> 
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
                  About CARSAWA
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
                  More
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="flex items-center text-gray-700 hover:text-gray-900 font-bold"> 
                <FiPhone className="mr-2" />
                +254791001601
              </Link>
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="flex items-center text-gray-700 hover:text-gray-900 font-bold"
              > 
                Sign Up/Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
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