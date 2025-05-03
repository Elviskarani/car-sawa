// app/services/api.ts

// Types
export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    description: string;
    condition: string;
    imageUrl: string;
    images?: string[];
    mileage?: number;
    fuelType?: string;
    transmission?: string;
    engineSize?: string;
    bodyType?: string;
    status: string;
    dealer: Dealer;
  }
  
  export interface Dealer {
    id: string;
    name: string;
    location?: string;
    profileImage: string;
    whatsappNumber?: string;
    verified?: boolean;
  }
  
  // API base URL - replace with your actual API URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.yourcarsite.com';
  
  // Helper function for API requests
  async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Car API functions
  export async function getAllCars(filters?: Record<string, string>): Promise<Car[]> {
    let queryString = '';
    
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      queryString = `?${params.toString()}`;
    }
    
    return fetchApi<Car[]>(`/cars${queryString}`);
  }
  
  export async function getCarById(id: string): Promise<Car> {
    return fetchApi<Car>(`/cars/${id}`);
  }
  
  export async function getCarsByDealerId(dealerId: string): Promise<Car[]> {
    return fetchApi<Car[]>(`/cars?dealerId=${dealerId}`);
  }
  
  // Dealer API functions
  export async function getAllDealers(): Promise<Dealer[]> {
    return fetchApi<Dealer[]>('/dealers');
  }
  
  export async function getDealerById(id: string): Promise<Dealer> {
    return fetchApi<Dealer>(`/dealers/${id}`);
  }
  
  // Search functions
  export interface SearchFilters {
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    make?: string;
    minYear?: number;
    maxYear?: number;
    transmission?: string;
    fuelType?: string;
    bodyType?: string;
    page?: number;
    limit?: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export async function searchCars(filters: SearchFilters): Promise<PaginatedResponse<Car>> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    
    return fetchApi<PaginatedResponse<Car>>(`/cars/search?${params.toString()}`);
  }