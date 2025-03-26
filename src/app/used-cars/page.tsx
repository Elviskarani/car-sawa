"use client";

import CarCard from "@/components/carcard";
import CarFilter from "@/components/CarFilter";
import { CarData } from "@/app/car-data";




export default function UsedCarsPage() {
    // Car data with the defined type and new properties
    const cars: CarData[] = [
      { 
        id: 'toyota-land-cruiser-2024', // Ensure consistent id
        imageSrc: '/2024toyotalandcruiser.jpeg', 
        name: 'Toyota Land Cruiser', 
        price: '10,000,000', 
        pageUrl: '/used-cars/toyota-land-cruiser-2024',
        year: '2023',
        mileage: '12,500',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        engineSize: '3.0 L',
        status: 'Available',
        description: 'Robust and luxurious SUV with exceptional off-road capabilities.',
        features: [
          'Advanced 4WD System',
          'Leather Interior',
          'Multi-Terrain Select',
          'Adaptive Suspension'
        ]
      },
      { 
        id: 'bmw-x5-2024', // Ensure consistent id
        imageSrc: '/bmwx5.jpg', 
        name: 'BMW X5', 
        price: '7,000,000', 
        pageUrl: '/used-cars/bmw-x5-2024',
        year: '2022',
        mileage: '28,600',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        engineSize: '3.0 L',
        status: 'Available',
        description: 'Luxury mid-size SUV with sporty performance and advanced technology.',
        features: [
          'xDrive All-Wheel Drive',
          'Premium Sound System',
          'Adaptive M Suspension',
          'Gesture Control'
        ]
      },
      { 
        id: 'suzuki-vitara-2024', // Ensure consistent id
        imageSrc: '/suzukivitara.jpg', 
        name: 'Suzuki Vitara', 
        price: '8,000,000', 
        pageUrl: '/used-cars/suzuki-vitara-2024',
        year: '2023',
        mileage: '15,200',
        transmission: 'Manual',
        fuelType: 'Petrol',
        engineSize: '1.6 L',
        status: 'Available',
      },
     
      { 
        id: 'toyota-hilux-2024', // Ensure consistent id
        imageSrc: '/toyotahilux.jpeg', 
        name: 'Toyota Hilux', 
        price: '700,000', 
        pageUrl: '/used-cars/toyota-hilux-2024',
        year: '2022',
        mileage: '42,300',
        transmission: 'Manual',
        fuelType: 'Diesel',
        engineSize: '2.8 L',
        status: 'sold',
      },
      { 
        id: 'mercedes-benz-2024', // Ensure consistent id
        imageSrc: '/mercedes.jpg', 
        name: 'Mercedes Benz', 
        price: '600,000', 
        pageUrl: '/used-cars/mercedes-benz-2024',
        year: '2021',
        mileage: '55,200',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        engineSize: '2.0 L',
        status: 'sold',
      },
      
    ];

   

    return (
        <div className="w-full bg-[#DEDCD9] py-5 px-3 md:py-12 md:px-8">
            <div className="container mx-auto">
                <h1 className="text-xl md:text-4xl font-bold mb-2 text-gray-800">Used Cars</h1>
                <p className="text-sm text-gray-700 mb-8 max-w-3xl">
                    Browse our selection of pre-owned vehicles available for sale. Find the perfect car that matches your needs and budget.
                </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filter sidebar */}
                <div className="w-full lg:w-1/8 xl:w-1/5">
                    <CarFilter />
                </div>


              {/* Car listings */}
              <div className="w-full lg:w-3/4 xl:w-4/5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {cars.map((car) => (
                            <CarCard
                                key={car.id}
                                carImageSrc={car.imageSrc}
                                carName={car.name}
                                price={car.price}
                                carPageUrl={car.pageUrl}
                                year={car.year}
                                mileage={car.mileage}
                                transmission={car.transmission}
                                fuelType={car.fuelType}
                                engineSize={car.engineSize}
                                status={car.status}
                            />
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}