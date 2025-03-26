import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CarData } from '@/app/car-data';

// Mock car data (you'd typically fetch this from an API or database)
const carInventory: CarData[] = [
  { 
    id: 'toyota-land-cruiser-2024',
    imageSrc: '/2024toyotalandcruiser.jpeg', 
    name: 'Toyota Land Cruiser', 
    price: '10,000,000', 
    pageUrl: '/cars/toyota-land-cruiser-2024',
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
    ],
    horsePower: '300 HP',
    drive: '4WD',
    location: 'Nairobi, Kenya'
  },
  // Add other cars from your existing inventory
];

const CarDetailsPage: NextPage<{ car: CarData }> = ({ car }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative w-full aspect-square">
          <Image 
            src={car.imageSrc} 
            alt={car.name} 
            fill 
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Car Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Price', value: car.price },
                { label: 'Year', value: car.year },
                { label: 'Mileage', value: `${car.mileage} miles` },
                { label: 'Transmission', value: car.transmission },
                { label: 'Fuel Type', value: car.fuelType },
                { label: 'Engine Size', value: car.engineSize },
                { label: 'Horse Power', value: car.horsePower },
                { label: 'Drive', value: car.drive }
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-semibold">{label}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>

            {car.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{car.description}</p>
              </div>
            )}

            {car.features && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {car.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex space-x-4">
              <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Enquire Now
              </button>
              <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = carInventory.map((car) => ({
    params: { id: car.id }
  }));

  return { 
    paths, 
    fallback: 'blocking' // Improved fallback strategy
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const car = carInventory.find((c) => c.id === params?.id);

  if (!car) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      car,
    },
    revalidate: 60 // Incremental Static Regeneration
  };
};

export default CarDetailsPage;