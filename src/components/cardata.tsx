import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaPhoneAlt, FaArrowRight, FaTimes } from 'react-icons/fa';
import { Car, Dealer } from '@/app/services/api';

export interface CarDataPageProps {
  car: Car;
  dealer: Dealer | null;
}

const CarDetailsPage: React.FC<CarDataPageProps> = ({ car, dealer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'comfort' | 'safety'>('comfort');
  const [isRunningCostsModalOpen, setIsRunningCostsModalOpen] = useState(false);

  // Create a formatted title from car data
  const title = `${car.year || ''} ${car.make || ''} ${car.model || ''}`.trim() || "Car Details";
  
  // Create local dealer image path for Next.js Image compatibility
  const dealerImagePath = dealer?.profileImage ? 
    (dealer.profileImage.startsWith("http") ? "/placeholder-image.webp" : dealer.profileImage) 
    : "/placeholder-image.webp";

  // Use actual comfort features from API if available, otherwise use defaults
  const comfortFeatures = car.comfortFeatures && car.comfortFeatures.length > 0 
    ? car.comfortFeatures.map(feature => ({ name: feature, value: true }))
    : [
        { name: 'Trimming', value: 'Plastic' },
        { name: 'Sound System', value: 'Factory Sound system' },
        { name: 'Seat Material', value: 'Fabric' },
        { name: 'Air Conditioning', value: 'Dual Zone' },
        { name: 'Steering Controls', value: true },
        { name: 'Phone Connectivity', value: true },
        { name: 'Auto Start And Stop', value: true },
        { name: 'Infotainment System', value: true },
        { name: 'Isofix Child Seat Anchors', value: true },
        { name: 'Fm Radio With Bluetooth Aux And Usb', value: true },
        { name: 'Keyless Entry And Push Button Start', value: true }
      ];

  // Use actual safety features from API if available, otherwise use defaults
  const safetyFeatures = car.safetyFeatures && car.safetyFeatures.length > 0
    ? car.safetyFeatures.map(feature => ({ name: feature, value: true }))
    : [
        { name: 'Srs Air Bags', value: true },
        { name: 'Lane Assistance', value: true },
        { name: 'Standard Cruise Control', value: true }
      ];

  return (
    <div className="bg-white text-black relative w-full max-w-xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Car Title and Description */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{title}</h1>
        </div>

        {/* Dealer Information */}
        {dealer && (
          <div className="flex items-center mb-6 bg-white p-4 rounded-lg">
            <Link href={`/dealers/${dealer.id || dealer._id}`} className="flex items-center bg-white p-4 rounded-lg hover:bg-gray-100 transition">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-4">
                <Image
                  src={dealerImagePath}
                  alt={dealer.name}
                  fill
                  className="rounded-full object-contain"
                />
              </div>
              <div>
                <h2 className="font-semibold text-sm sm:text-base">{dealer.name}</h2>
              </div>
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          {dealer?.whatsapp && (
            <button
              className="flex-1 bg-[#25D366] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition"
              onClick={() =>
                window.open(
                  `https://wa.me/${dealer.whatsapp}?text=Enquiry about ${title}`,
                  '_blank'
                )
              }
            >
              <FaWhatsapp className="w-6 h-6" />
              <span>Enquire via WhatsApp</span>
            </button>
          )}
          {dealer?.phone && (
            <button
              className="flex-1 bg-white text-black py-3 rounded-lg border border-gray-500 flex items-center hover:bg-gray-100 transition justify-center space-x-2"
              onClick={() => window.open(`tel:${dealer.phone}`)}
            >
              <FaPhoneAlt className="w-6 h-6" />
              <span>Call Now</span>
            </button>
          )}
        </div>

        {/* Specifications Accordion-like Sections */}
        <div className="w-full space-y-2">
          <div 
            className="bg-white rounded-lg w-full"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex justify-between items-center p-4 cursor-pointer transition">
              <span className="font-semibold text-sm sm:text-base">Specifications</span>
              <FaArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setIsModalOpen(false)}
              ></div>

              {/* Modal Content */}
              <div className="ml-auto w-full max-w-md h-full bg-white text-black shadow-xl relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">{title} Specifications</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-black hover:text-[#25D366]"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-black">
                  <button
                    className={`w-1/2 py-3 ${activeTab === 'comfort' ? 'bg-[#25D366] text-white' : 'bg-white text-black'}`}
                    onClick={() => setActiveTab('comfort')}
                  >
                    Comfort Features
                  </button>
                  <button
                    className={`w-1/2 py-3 ${activeTab === 'safety' ? 'bg-[#25D366] text-white' : 'bg-white text-black'}`}
                    onClick={() => setActiveTab('safety')}
                  >
                    Safety Features
                  </button>
                </div>

                {/* Feature List */}
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                  {(activeTab === 'comfort' ? comfortFeatures : safetyFeatures).map((feature, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
                    >
                      <span className="text-sm">{feature.name}</span>
                      {feature.value === true ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-sm text-gray-400">{feature.value || '-'}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-black mx-4" />

          <div className="bg-white rounded-lg">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer transition"
              onClick={() => setIsRunningCostsModalOpen(true)}
            >
              <span className="font-semibold text-sm sm:text-base">Running Costs</span>
              <FaArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Running Costs Modal */}
          {isRunningCostsModalOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setIsRunningCostsModalOpen(false)}
              ></div>

              {/* Modal Content */}
              <div className="ml-auto w-full max-w-md h-full bg-white text-black shadow-xl relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-black">
                  <h2 className="text-xl font-bold">Running Costs</h2>
                  <button
                    onClick={() => setIsRunningCostsModalOpen(false)}
                    className="text-black hover:text-[#25D366]"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                {/* Running Costs Content */}
                <div className="p-4 space-y-6">
                  {/* Insurance Section */}
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <h3 className="text-lg font-semibold">Insurance</h3>
                    </div>
                    <p className="text-sm text-black">(Approximate cost. Amount may change depending on insurer)</p>
                    <div className="mt-2 text-xl font-bold">KES 22,000 / Annually</div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-black mx-4" />

                  {/* Fuel Section */}
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <path d="M4 4h16v12H4z" />
                        <path d="M8 20h8" />
                        <path d="M8 22h8" />
                        <line x1="12" x2="12" y1="4" y2="20" />
                      </svg>
                      <h3 className="text-lg font-semibold">Fuel</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-black">Highway</span>
                        <span className="font-medium">11 Km/Litre</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-black">Urban</span>
                        <span className="font-medium">9 Km/Litre</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;