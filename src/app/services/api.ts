// app/services/api.ts

// Types
export interface Car {
  _id?: string;
  id ?: string;
  dealer: string | { _id?: string; id?: string; [key: string]: any };
  name: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
  engineSize: string;
  condition: string;
  price: number;
  mileage: number;
  fuelType: string;
  bodyType: string;
  color: string;
  comfortFeatures: string[];
  safetyFeatures: string[];
  images: string[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
  
export interface Dealer {
  _id: string; 
  id?: string; 
  name: string;
  email: string;
  phone: string;
  whatsapp: string; 
  location: string;
  profileImage?: string;

}

export interface PaginatedCarResponse {
  cars: Car[];
  page: number;
  pages: number;
  total: number;
}

// NEW: Interface for paginated dealer response from the backend
export interface PaginatedDealerResponse {
  dealers: Dealer[];
  page: number;
  pages: number;
  total: number;
}

// API base URL - replace with your actual API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://carsawa-backend-6zf3.onrender.com';

// Helper function for API requests
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, 
  };
  
  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      // Handle error response
      const errorText = await response.text();
      return Promise.reject(`API error: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    return Promise.reject(error);
  }
}

// Car API functions
export async function getAllCars(params?: Record<string, string | number>): Promise<PaginatedCarResponse> {
  let queryString = '';
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    queryString = `?${searchParams.toString()}`;
  }
  
  return fetchApi<PaginatedCarResponse>(`/cars${queryString}`);
}

export async function getCarById(id: string): Promise<Car> {
  return fetchApi<Car>(`/cars/${id}`);
}

// Updated to match backend controller for getting cars by dealer
export async function getCarsByDealer(
  dealerId: string,
  params?: { page?: number; pageSize?: number; status?: string }
): Promise<PaginatedCarResponse> {
  if (!dealerId) {
    return Promise.reject('Dealer ID cannot be empty for getCarsByDealer');
  }
  const queryParams = new URLSearchParams();
  if (params) {
    if (params.page) queryParams.append('page', String(params.page));
    if (params.pageSize) queryParams.append('pageSize', String(params.pageSize));
    if (params.status) queryParams.append('status', String(params.status));
  }
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return fetchApi<PaginatedCarResponse>(`/dealers/${dealerId}/cars${queryString}`);
}


// MODIFIED: getAllDealers to support pagination and use PaginatedDealerResponse
export async function getAllDealers(params?: { page?: number; pageSize?: number }): Promise<PaginatedDealerResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) {
    searchParams.append('page', String(params.page));
  }
  if (params?.pageSize) {
    searchParams.append('pageSize', String(params.pageSize));
  }
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return fetchApi<PaginatedDealerResponse>(`/dealers${queryString}`);
}

export async function getDealerById(id: string): Promise<Dealer> {
  if (!id) {
    return Promise.reject('Dealer ID cannot be empty');
  }
  return fetchApi<Dealer>(`/dealers/${id}`);
}

// Search cars with filters matching backend expectations
export interface SearchFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  transmission?: string;
  condition?: string;
  fuelType?: string;
  bodyType?: string;
  status?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export async function searchCars(filters: SearchFilters): Promise<PaginatedCarResponse> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  const queryString = params.toString();
  console.log(`Searching cars with query: /cars?${queryString}`);
  return fetchApi<PaginatedCarResponse>(`/cars?${queryString}`);
}