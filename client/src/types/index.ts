export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  hostel: string;
  roomNumber: string;
  profilePicture?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  quantity: number;
  isAvailable: boolean;
  sellerId: string;
  seller: {
    name: string;
    hostel: string;
    roomNumber: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 'Snacks' | 'Stationery' | 'Books' | 'Electronics' | 'Games';

export type Hostel = 
  | 'Paari' 
  | 'Kaari' 
  | 'Oori' 
  | 'Adhiyaman' 
  | 'Nelson Mandela' 
  | 'Manoranjitham' 
  | 'Mullai' 
  | 'Thamarai' 
  | 'Malligai' 
  | 'Sannasi A' 
  | 'Sannasi C' 
  | 'Pierre Fauchard';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ProductFilters {
  category?: ProductCategory;
  hostel?: Hostel;
  priceRange: [number, number];
  searchQuery: string;
  availableOnly: boolean;
}