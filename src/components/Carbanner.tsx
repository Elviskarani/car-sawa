import Image from 'next/image';
import Link from 'next/link';

export default function CarPlatformBanner() {
  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between bg-white px-8 py-2 overflow-hidden gap-6 md:gap-0">
      {/* Text Content */}
      <div className="z-10 max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          The safest way to buy or sell your car in Kenya.
        </h1>
        <p className="text-gray-600 mb-6">
          We will help you sell or buy your dream car here easily and safely.
        </p>
        
        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link href="/buy-a-car" className="bg-[#272D3C] text-white px-6 py-3 rounded-lg hover:text-[#c1ff72] transition-colors">
            Buy Car
          </Link>
          <Link href="/sell-your-car" className="bg-[#272D3C] text-white px-6 py-3 rounded-lg hover:text-[#c1ff72] transition-colors">
            Sell Car
          </Link>
        </div>
      </div>

      {/* Car Image */}
      <div className="relative w-full md:w-1/2 h-80">
        <Image 
          src="/image.png"  
          alt="Blue Sports Car" 
          layout="fill"
          objectFit="contain"
          className="z-10"
        />
      </div>
    </div>
  );
}