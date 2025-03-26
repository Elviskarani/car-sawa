export type CarData = {
    id?: string;
    imageSrc: string;
    name: string;
    price: string;
    pageUrl: string;
    year?: string;
    mileage?: string;
    transmission?: string;
    fuelType?: string;
    engineSize?: string;
    status?: 'Available' | 'sold';
    description?: string;
    features?: string[];
    horsePower?: string;
    drive?: string;
    location?: string;
  };