"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Check on initial render
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <div className={`fixed inset-0 bg-white/30 backdrop-blur-lg shadow-lg flex items-center justify-center z-50 ${isMobile ? 'items-end' : ''}`}>
      <div 
        className={`bg-[#DEDCD9] rounded-lg w-full max-w-md p-4 relative ${
          isMobile ? 'h-[50vh] rounded-b-none rounded-t-2xl' : 'p-6'
        }`}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Title */}
        <h2 className="text-center text-xl font-bold mb-4">Sign Up/Login</h2>
        
        {/* Login method - SMS only */}
        <div className="w-full mb-3">
          <button
            className="w-full py-2 text-center rounded-full bg-blue-900 text-[#c1ff72] font-medium text-sm"
          >
            Via SMS
          </button>
        </div>
        
        {/* Phone input */}
        <div className="flex items-center border border-gray-300 rounded mb-3">
          <div className="px-2 py-2 bg-white text-gray-600 border-r text-sm">+254</div>
          <input
            type="tel"
            placeholder="Mobile"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 px-2 py-2 outline-none text-sm"
          />
        </div>
        
        {/* Get OTP button */}
        <button className="w-full py-2 bg-gray-100 text-gray-500 rounded mb-3 text-sm">
          Get OTP
        </button>
        
        {/* Terms text */}
        <p className="text-xs text-gray-500 text-center mb-3">
          By doing this, I agree to CARSAWA's{' '}
          <a href="#" className="text-blue-500">Terms</a> and{' '}
          <a href="#" className="text-blue-500">Privacy Policy</a>
        </p>
        
        {/* Divider */}
        <div className="flex items-center mb-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        {/* Google login button */}
        <button className="w-full py-2 border border-gray-300 rounded flex items-center justify-center text-sm">
           <FaGoogle size={15} />
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;