"use client";

import ImageCarousel from "@/components/imagecarousel";
import CarDetails, { CarDetailsProps } from "@/components/cardetails";
import CarDetailsPage from "@/components/cardata";



export default function InsurancePage() {

    const carImages = [
        '/2024toyotalandcruiser.jpeg',
        '/suzukivitara.jpg',
        '/2024toyotalandcruiser.jpeg',
        // Add all your car images here
      ];

      //
     
      const carData: CarDetailsProps = {
          price: 7499000,
          yearOfManufacture: 2016,
          currentLocation: 'Nairobi, Kenya',
          availability: 'Available',
          drive: 'AWD',
          mileage: 80253,
          fuelType: 'Petrol',
          horsePower: 372,
          transmission: 'Automatic',
          torque: 520,
          aspiration: 'Turbo/Supercharger',
          title: 'Mercedes GLE 450 AMG LINE',
          dealer: {
              name: 'Essence Motors',
              image: '/essence.webp' // Replace with actual dealer image path
          },
      };

      
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">{carData.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <ImageCarousel images={carImages} />
                <CarDetailsPage {...carData} />
                <CarDetails {...carData} />
            </div>
        </div>
    );
}