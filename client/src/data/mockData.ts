import { Product, User, Hostel, ProductCategory } from '@/types';

export const hostels: Hostel[] = [
  'Paari',
  'Kaari', 
  'Oori',
  'Adhiyaman',
  'Nelson Mandela',
  'Manoranjitham',
  'Mullai',
  'Thamarai',
  'Malligai',
  'Sannasi A',
  'Sannasi C',
  'Pierre Fauchard'
];

export const categories: ProductCategory[] = [
  'Snacks',
  'Stationery', 
  'Books',
  'Electronics',
  'Games'
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Arjun Kumar',
    email: 'arjun@example.com',
    phone: '+91 9876543210',
    hostel: 'Paari',
    roomNumber: '101',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    hostel: 'Kaari',
    roomNumber: '205',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-16T11:00:00Z'
  },
  {
    id: '3',
    name: 'Rahul Patel',
    email: 'rahul@example.com',
    phone: '+91 9876543212',
    hostel: 'Nelson Mandela',
    roomNumber: '312',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-17T12:00:00Z'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Maggi Noodles Pack (12 pieces)',
    description: 'Fresh pack of Maggi noodles, perfect for late night cravings. Masala flavor.',
    price: 180,
    category: 'Snacks',
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
    ],
    quantity: 5,
    isAvailable: true,
    sellerId: '1',
    seller: {
      name: 'Arjun Kumar',
      hostel: 'Paari',
      roomNumber: '101',
      phone: '+91 9876543210'
    },
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    name: 'Scientific Calculator Casio FX-991ES',
    description: 'Brand new scientific calculator, perfect for engineering calculations. All functions working perfectly.',
    price: 850,
    category: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&h=300&fit=crop'
    ],
    quantity: 2,
    isAvailable: true,
    sellerId: '2',
    seller: {
      name: 'Priya Sharma',
      hostel: 'Kaari',
      roomNumber: '205',
      phone: '+91 9876543211'
    },
    createdAt: '2024-01-21T11:00:00Z',
    updatedAt: '2024-01-21T11:00:00Z'
  },
  {
    id: '3',
    name: 'Data Structures and Algorithms Book',
    description: 'Comprehensive DSA book by Narasimha Karumanchi. Excellent condition, minimal highlighting.',
    price: 450,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    ],
    quantity: 1,
    isAvailable: true,
    sellerId: '3',
    seller: {
      name: 'Rahul Patel',
      hostel: 'Nelson Mandela',
      roomNumber: '312',
      phone: '+91 9876543212'
    },
    createdAt: '2024-01-22T12:00:00Z',
    updatedAt: '2024-01-22T12:00:00Z'
  },
  {
    id: '4',
    name: 'Wireless Bluetooth Earbuds',
    description: 'High quality wireless earbuds with noise cancellation. 6 months old, excellent battery life.',
    price: 1200,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop'
    ],
    quantity: 1,
    isAvailable: false,
    sellerId: '1',
    seller: {
      name: 'Arjun Kumar',
      hostel: 'Paari',
      roomNumber: '101',
      phone: '+91 9876543210'
    },
    createdAt: '2024-01-23T13:00:00Z',
    updatedAt: '2024-01-23T13:00:00Z'
  },
  {
    id: '5',
    name: 'Chess Board Set',
    description: 'Wooden chess board with magnetic pieces. Perfect for hostel room gaming sessions.',
    price: 320,
    category: 'Games',
    images: [
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop'
    ],
    quantity: 3,
    isAvailable: true,
    sellerId: '2',
    seller: {
      name: 'Priya Sharma',
      hostel: 'Kaari',
      roomNumber: '205',
      phone: '+91 9876543211'
    },
    createdAt: '2024-01-24T14:00:00Z',
    updatedAt: '2024-01-24T14:00:00Z'
  },
  {
    id: '6',
    name: 'Oreo Cookies Variety Pack',
    description: 'Mixed pack of different Oreo flavors - Original, Chocolate, Strawberry. Great for sharing!',
    price: 240,
    category: 'Snacks',
    images: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
    ],
    quantity: 8,
    isAvailable: true,
    sellerId: '3',
    seller: {
      name: 'Rahul Patel',
      hostel: 'Nelson Mandela',
      roomNumber: '312',
      phone: '+91 9876543212'
    },
    createdAt: '2024-01-25T15:00:00Z',
    updatedAt: '2024-01-25T15:00:00Z'
  },
  {
    id: '7',
    name: 'Mechanical Pencil Set',
    description: 'Set of 5 mechanical pencils with extra leads. Perfect for technical drawings and notes.',
    price: 150,
    category: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop'
    ],
    quantity: 4,
    isAvailable: true,
    sellerId: '1',
    seller: {
      name: 'Arjun Kumar',
      hostel: 'Paari',
      roomNumber: '101',
      phone: '+91 9876543210'
    },
    createdAt: '2024-01-26T16:00:00Z',
    updatedAt: '2024-01-26T16:00:00Z'
  },
  {
    id: '8',
    name: 'Gaming Mouse RGB',
    description: 'High DPI gaming mouse with RGB lighting. Perfect for gaming and productivity work.',
    price: 890,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop'
    ],
    quantity: 2,
    isAvailable: true,
    sellerId: '2',
    seller: {
      name: 'Priya Sharma',
      hostel: 'Kaari',
      roomNumber: '205',
      phone: '+91 9876543211'
    },
    createdAt: '2024-01-27T17:00:00Z',
    updatedAt: '2024-01-27T17:00:00Z'
  }
];

// Current logged in user for demo
export const currentUser: User = mockUsers[0];