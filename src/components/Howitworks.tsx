"use client";


import React, { useState } from 'react';


const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('buy');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-19">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-15 h-1 bg-[#c1ff72] mx-auto mb-2"></div>
          <h2 className="text-xl font-bold text-gray-800">How It Works</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="border-b border-gray-200 w-full max-w-xl">
            <nav className="flex justify-center space-x-8">
              <button
                onClick={() => handleTabChange('buy')}
                className={`pb-4 px-2 relative ${
                  activeTab === 'buy'
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                How to Buy
                {activeTab === 'buy' && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#c1ff72]"></span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('sell')}
                className={`pb-4 px-2 relative ${
                  activeTab === 'sell'
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                How to Sell
                {activeTab === 'sell' && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#c1ff72]"></span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'buy' && <HowToBuy />}
        {activeTab === 'sell' && <HowToSell />}
      </div>
    </section>
  );
};

const HowToBuy = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Step 1 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">1</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img src="/images/find-car-icon.svg" alt="Find Your Car" className="w-16 h-16" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Find Your Car</h3>
            <p className="text-gray-600 text-xs mb-4">
            Explore a wide selection of cars from certified dealers using our easy-to-use search tools.
            </p>
            <a href="/cars" className="text-blue-500 font-medium hover:text-blue-600">
              View All Cars
            </a>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">2</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img src="/images/test-drive-icon.svg" alt="Enquire with the dealer" className="w-16 h-16" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Enquire with the dealer</h3>
            <p className="text-gray-600 text-xs mb-4">
             Interested in a car? Click the 'Enquire' button on the listing to send a message directly to the dealer.           
             </p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">3</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img src="/images/doorstep-delivery-icon.svg" alt="Book a Test Drive" className="w-16 h-16" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Book a Test Drive</h3>
            <p className="text-gray-600 text-xs mb-4">
             Schedule a test drive to experience the car firsthand.
             </p>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">4</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img src="/images/worry-free-purchase-icon.svg" alt="Purchase Your Car" className="w-16 h-16" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Purchase Your Car</h3>
            <p className="text-gray-600 text-xs mb-4">
            Seal the deal with confidence. Once you’ve found the perfect car, proceed to purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowToSell = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Step 1 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">1</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img 
                src="/images/book-appointment.jpg" 
                alt="Sell Your Car" 
                className="w-16 h-16 "
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Sell Your Car</h3>
            <p className="text-gray-600 text-xs mb-4">
            Take clear, well-lit photos of your car from multiple angles and upload these pictures to your listing to show off your car’s condition.
            </p>
            <a href="/book-appointment" className="text-blue-500 font-medium hover:text-blue-600">
             Sell Now
            </a>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">2</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img 
                src="/images/car-inspection.jpg" 
                alt="Car Inspection" 
                className="w-16 h-16 "
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Dealers Bid on Your Car</h3>
            <p className="text-gray-600 text-xs mb-4">
            After you post your pictures, provide details about your car.Dealers on our platform will review your listing and place bids.You’ll be notified as bids come in, and you can choose the best offer.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">3</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img 
                src="/images/sell-your-car.jpg" 
                alt="Sell Your Car" 
                className="w-16 h-16 "
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Carsawa can facilitate the Sale</h3>
            <p className="text-gray-600 text-xs mb-4">
            Our team at Carsawa will evaluate your car.We’ll make you a competitive offer on your behalf.If you accept our offer, we’ll handle the rest of the selling process for you.
            </p>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="bg-white rounded-lg w-60 h-70 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center absolute top-4 right-4">
            <span className="text-gray-800 font-medium">4</span>
          </div>
          <div className="p-5 pt-10">
            <div className="mb-2">
              <img 
                src="/images/get-paid.jpg" 
                alt="Get Paid" 
                className="w-16 h-16 "
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Get paid securely without delay</h3>
            <p className="text-gray-600 text-xs mb-4">
            After your car is sold—whether through a dealer’s bid or Carsawa’s facilitated sale—you’ll receive your payment securely.We ensure all transactions are safe and fast, so you get your money without any hassle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default HowItWorks;