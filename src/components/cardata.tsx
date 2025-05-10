import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaPhoneAlt, FaArrowRight, FaTimes, FaUser, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { Car, Dealer } from '@/app/services/api';

export interface CarDataPageProps {
  car: Car;
  dealer: Dealer | null;
}

const CarDetailsPage: React.FC<CarDataPageProps> = ({ car, dealer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'comfort' | 'safety'>('comfort');
  
  // For debugging dealer info
  const [showDebug, setShowDebug] = useState(false);

  // Create a formatted title from car data
  const title = `${car.year || ''} ${car.name || ''} ${car.make || ''} ${car.model || ''}`.trim() || "Car Details";

  // Create local dealer image path for Next.js Image compatibility
  const dealerImagePath = dealer?.profileImage 
    ? dealer.profileImage 
    : "/placeholder-image.webp";

  // Prepare comfort features list from API.
  const comfortFeatures = (Array.isArray(car.comfortFeatures) && car.comfortFeatures.length > 0)
    ? car.comfortFeatures.map(feature => ({ name: feature, value: true }))
    : [];

  // Prepare safety features list from API.
  const safetyFeatures = (Array.isArray(car.safetyFeatures) && car.safetyFeatures.length > 0)
    ? car.safetyFeatures.map(feature => ({ name: feature, value: true }))
    : [];

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KSH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string | undefined) => {
    if (!phone) return '';
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Format based on length
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone; // Return original if cannot format
  };

  // Car key specifications
  const keySpecs = [
    { label: 'Year', value: car.year },
    { label: 'Name', value: car.name },
    { label: 'Make', value: car.make },
    { label: 'Model', value: car.model },
    { label: 'Mileage', value: car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A' },
    { label: 'Transmission', value: car.transmission || 'N/A' },
    { label: 'Fuel Type', value: car.fuelType || 'N/A' },
    { label: 'Body Type', value: car.bodyType || 'N/A' },
    { label: 'Color', value: car.color || 'N/A' },
    { label: 'Engine Size', value: car.engineSize || 'N/A' },
    { label: 'Condition', value: car.condition || 'N/A' },
  ];

  console.log("Dealer in CarDetailsPage:", dealer);

  return (
    <div className="bg-white text-black rounded-lg shadow-md w-full max-w-xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Car Title and Price */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{title}</h1>
          {car.price && (
            <div className="text-lg sm:text-xl font-bold text-[#25D366]">
              {formatPrice(car.price)}
            </div>
          )}
          {car.status && (
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              car.status === 'Available' ? 'bg-green-100 text-green-800' :
              car.status === 'Sold' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {car.status}
            </div>
          )}
        </div>

        {/* Key Specifications */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-3">Key Specifications</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {keySpecs.map((spec, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs text-gray-500">{spec.label}</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        
        {/* Dealer Information */}
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="font-semibold text-lg mb-3">Dealer Information</h2>
          
          {dealer ? (
            <>
              <Link 
                href={`/dealers/${dealer.id || dealer._id}`} 
                className="flex items-center hover:bg-gray-50 p-2 rounded-lg transition mb-4"
              >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-4">
                  <Image
                    src={dealerImagePath}
                    alt={dealer.name}
                    fill
                    className="rounded-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{dealer.name}</h3>
                  <p className="text-xs text-gray-500">{dealer.location || 'Location not specified'}</p>
                </div>
              </Link>
              
             
            </>
          ) : (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <FaUser className="mr-2" />
              <span>Dealer information not available</span>
            </div>
          )}
        </div>

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
              <FaWhatsapp className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          )}
          {dealer?.phone && (
            <button
              className="flex-1 bg-white text-black py-3 rounded-lg border border-gray-500 flex items-center hover:bg-gray-100 transition justify-center space-x-2"
              onClick={() => window.open(`tel:${dealer.phone}`)}
            >
              <FaPhoneAlt className="w-5 h-5" />
              <span>Call Dealer</span>
            </button>
          )}
        </div>

        {/* Specifications Button */}
        <div className="w-full space-y-2">
          <div
            className="bg-[#272D3C] text-white rounded-lg w-full hover:bg-[#3a4053] transition"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex justify-between items-center p-4 cursor-pointer">
              <span className="font-semibold text-sm sm:text-base">View Features & Specifications</span>
              <FaArrowRight className="w-5 h-5" />
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
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold">{title} Features</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-black hover:text-[#25D366]"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
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
                  {activeTab === 'comfort' && (
                    comfortFeatures.length > 0 ? (
                      comfortFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                        >
                          <span className="text-sm">{feature.name}</span>
                          {feature.value === true ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-sm text-gray-400">{String(feature.value) || '-'}</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 p-3">Comfort features not specified.</p>
                    )
                  )}
                  {activeTab === 'safety' && (
                    safetyFeatures.length > 0 ? (
                      safetyFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                        >
                          <span className="text-sm">{feature.name}</span>
                          {feature.value === true ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-sm text-gray-400">{String(feature.value) || '-'}</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 p-3">Safety features not specified.</p>
                    )
                  )}
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