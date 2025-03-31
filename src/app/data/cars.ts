export interface Car {
  image: string;
  name: string;
  id: string;
  year: number;
  make: string;
  model: string;
  transmission: string;
  engineSize: string;
  condition: string;
  price: number;
  leasePrice?: number;
  description: string;
  dealer: {
    id:string;
    name: string;
    verified: boolean;
    profileImage: string;
    online?: boolean;
    location?: string;
    whatsappNumber?: string;
  };
  imageUrl: string;
  images: string[];  
  status: "AVAILABLE" | "SOLD";
  savings?: string;
  features?: string[];
  mileage?: number;
  fuelType?: string;
  bodyType?: string;
  color?: string;
}

export const cars: Car[] = [
  {
    id: "1",
    year: 2024,
    make: "Toyota",
    model: "Land Cruiser",
    transmission: "Automatic",
    engineSize: "3500 CC",
    condition: "Brand New",
    price: 15000000,
    leasePrice: 180000,
    description: "The all-new Land Cruiser combines legendary capability with modern luxury",
    dealer: {
      id: "1",
      name: "Premium Motors",
      verified: true,
      profileImage: "https://placehold.co/100x100?text=Premium+Motors",
      online: true,
      location: "Nairobi",
      whatsappNumber:"25791001601"

    },
    imageUrl: "/2024toyotalandcruiser.jpeg",
    images: [
      "/2024toyotalandcruiser.jpeg",
      "/assets/landcruiser/interior1.jpg",
      "/assets/landcruiser/rear.jpg",
      "/assets/landcruiser/dashboard.jpg",
      "/assets/landcruiser/engine.jpg"
    ],
    status: "AVAILABLE",
    features: [
      "Multi-Terrain Select",
      "Crawl Control",
      "JBL Premium Audio",
      "Leather Seats",
      "Sunroof",
      "360° Camera"
    ],
    mileage: 0,
    fuelType: "Diesel",
    bodyType: "SUV",
    color: "Precious White Pearl",
    image: "/2024toyotalandcruiser.jpeg",
    name: "Toyota Land Cruiser"
  },
  {
    id: "2",
    year: 2024,
    make: "Mercedes-Benz",
    model: "C200",
    transmission: "Automatic",
    engineSize: "2000 CC",
    condition: "Brand New",
    price: 8500000,
    leasePrice: 120000,
    description: "The latest C-Class combines luxury with cutting-edge technology",
    dealer: {
      id: "2",

      name: "AutoXpress",
      verified: true,
      profileImage: "https://placehold.co/100x100?text=AutoXpress",
      online: true,
      location: "Nairobi",
      whatsappNumber:"25791001601"
    },
    imageUrl: "/assets/cars/mercedes.jpg",
    images: [
      "/2024toyotalandcruiser.jpeg",
      "/assets/landcruiser/interior1.jpg",
      "/assets/landcruiser/rear.jpg",
      "/assets/landcruiser/dashboard.jpg",
      "/assets/landcruiser/engine.jpg"
    ],
    status: "AVAILABLE",
    features: [
      "MBUX Infotainment",
      "LED Headlights",
      "Leather Interior",
      "Parking Assist",
      "Wireless Charging"
    ],
    mileage: 0,
    fuelType: "Petrol",
    bodyType: "Sedan",
    color: "Obsidian Black",
    image: "/assets/cars/mercedes.jpg",
    name: "Mercedes-Benz C200"
  },
  {
    id: "3",
    year: 2024,
    make: "BMW",
    model: "X5",
    transmission: "Automatic",
    engineSize: "3000 CC",
    condition: "Brand New",
    price: 12000000,
    description: "The BMW X5 sets the standard for luxury SUVs",
    dealer: {
      id: "3",
      name: "Car City",
      verified: true,
      profileImage: "https://placehold.co/100x100?text=Car+City",
      online: false,
       location: "Nairobi",
      whatsappNumber:"25791001601"
    },
    imageUrl: "/assets/cars/bmwx5.jpg",
    images: [
      "/2024toyotalandcruiser.jpeg",
      "/assets/landcruiser/interior1.jpg",
      "/assets/landcruiser/rear.jpg",
      "/assets/landcruiser/dashboard.jpg",
      "/assets/landcruiser/engine.jpg"
    ],
    status: "AVAILABLE",
    features: [
      "xDrive All-Wheel Drive",
      "BMW Live Cockpit",
      "Panoramic Sunroof",
      "Harman Kardon Audio",
      "Gesture Control"
    ],
    mileage: 0,
    fuelType: "Diesel",
    bodyType: "SUV",
    color: "Alpine White",
    image: "",
    name: ""
  },
  {
    id: "4",
    year: 2023,
    make: "Toyota",
    model: "Hilux",
    transmission: "Manual",
    engineSize: "2800 CC",
    condition: "Brand New",
    price: 6500000,
    description: "The unbreakable legend, perfect for both work and leisure",
    dealer: {
      id: "4",
      name: "Premium Motors",
      verified: true,
      profileImage: "https://placehold.co/100x100?text=Premium+Motors",
      online: true,
      location: "Nairobi",
      whatsappNumber:"25791001601"
    },
    imageUrl: "/assets/cars/toyotahilux.jpeg",
    images: [
      "/2024toyotalandcruiser.jpeg",
      "/assets/landcruiser/interior1.jpg",
      "/assets/landcruiser/rear.jpg",
      "/assets/landcruiser/dashboard.jpg",
      "/assets/landcruiser/engine.jpg"
    ],
    status: "AVAILABLE",
    features: [
      "4x4 System",
      "Tough-deck Bed Liner",
      "Smart Entry",
      "Push Start",
      "Cruise Control"
    ],
    mileage: 0,
    fuelType: "Diesel",
    bodyType: "Pickup",
    color: "Super White",
    image: "/assets/cars/toyotahilux.jpeg",
    name: "Toyota Hilux"
  },
  {
    id: "5",
    year: 2024,
    make: "Suzuki",
    model: "Vitara",
    transmission: "Automatic",
    engineSize: "1600 CC",
    condition: "Brand New",
    price: 4200000,
    description: "Compact SUV with style and efficiency",
    dealer: {
      id: "5",
      name: "Car City",
      verified: true,
      profileImage: "https://placehold.co/100x100?text=Car+City",
      online: true,
      location: "Nairobi",
      whatsappNumber:"25791001601"
    },
    imageUrl: "/assets/cars/suzukivitara.jpg",
    images: [
      "/2024toyotalandcruiser.jpeg",
      "/assets/landcruiser/interior1.jpg",
      "/assets/landcruiser/rear.jpg",
      "/assets/landcruiser/dashboard.jpg",
      "/assets/landcruiser/engine.jpg"
    ],
    status: "AVAILABLE",
    features: [
      "AllGrip 4WD",
      "Panoramic Sunroof",
      "Apple CarPlay",
      "Android Auto",
      "Safety Sense"
    ],
    mileage: 0,
    fuelType: "Petrol",
    bodyType: "SUV",
    color: "Bright Red",
    image: "/assets/cars/suzukivitara.jpg",
    name: "Suzuki Vitara"
  },
  
];
