"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
            className="w-full py-2 text-center rounded-full bg-blue-900 text-yellow-400 font-medium text-sm"
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;