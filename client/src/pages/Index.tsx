import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavigation from '../components/TopNavigation';
import ProductCard, { Product } from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductModal from '../components/ProductModal';
import SearchAndFilters from '../components/SearchAndFilters';
import Login from '../components/Login';
import Profile from '../components/Profile';
import MyProducts from '../components/MyProducts';
import AddProduct from '../components/AddProduct';

// Mock data with single image property
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Maggi Noodles (Pack of 12)",
    price: 180,
    inStock: true,
    quantity: 5,
    category: "Snacks",
    hostel: "Paari",
    roomNumber: "A-204",
    sellerPhone: "9876543210",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Notebook Set (5 Books)",
    price: 150,
    inStock: true,
    quantity: 3,
    category: "Stationery",
    hostel: "Nelson Mandela",
    roomNumber: "B-156",
    sellerPhone: "9876543211",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Engineering Mathematics Book",
    price: 450,
    inStock: false,
    quantity: 0,
    category: "Books",
    hostel: "Kaari",
    roomNumber: "C-089",
    sellerPhone: "9876543212",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Bluetooth Earphones",
    price: 899,
    inStock: true,
    quantity: 2,
    category: "Electronics",
    hostel: "Oori",
    roomNumber: "D-234",
    sellerPhone: "9876543213",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Instant Coffee Sachets",
    price: 120,
    inStock: true,
    quantity: 10,
    category: "Snacks",
    hostel: "Adhiyaman",
    roomNumber: "E-167",
    sellerPhone: "9876543214",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Geometry Box",
    price: 85,
    inStock: true,
    quantity: 1,
    category: "Stationery",
    hostel: "Manoranjitham",
    roomNumber: "F-045",
    sellerPhone: "9876543215"
  }
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('marketplace');
  const [selectedHostel, setSelectedHostel] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    hostel: 'Paari',
    roomNumber: 'A-204'
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculate max price for filters
  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price));
  }, [products]);

  // Update price range when products change
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // Enhanced filtering with search and price range
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const hostelMatch = !selectedHostel || selectedHostel === '' || product.hostel === selectedHostel;
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const searchMatch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.hostel.toLowerCase().includes(searchTerm.toLowerCase());
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const stockMatch = !showInStockOnly || product.inStock;
      
      return hostelMatch && categoryMatch && searchMatch && priceMatch && stockMatch;
    });
  }, [products, selectedHostel, selectedCategory, searchTerm, priceRange, showInStockOnly]);

  const userProducts = products.filter(product => 
    product.hostel === user.hostel && product.roomNumber === user.roomNumber
  );

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentView('marketplace');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleStock = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? productData : product
      ));
      setEditingProduct(null);
    } else {
      setProducts([...products, productData]);
    }
    setCurrentView('my-products');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setCurrentView('add-product');
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleSaveProfile = (userData: any) => {
    setUser(userData);
    setCurrentView('marketplace');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentView === 'profile') {
    return (
      <Profile
        onBack={() => setCurrentView('marketplace')}
        user={user}
        onSave={handleSaveProfile}
      />
    );
  }

  if (currentView === 'my-products') {
    return (
      <MyProducts
        onBack={() => setCurrentView('marketplace')}
        onAddProduct={() => {
          setEditingProduct(null);
          setCurrentView('add-product');
        }}
        userProducts={userProducts}
        onToggleStock={handleToggleStock}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    );
  }

  if (currentView === 'add-product') {
    return (
      <AddProduct
        onBack={() => setCurrentView('my-products')}
        onSave={handleSaveProduct}
        userHostel={user.hostel}
        userRoomNumber={user.roomNumber}
        userPhone={user.phone}
        editingProduct={editingProduct}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[#F5FFFA] dark:bg-gray-900 flex">
        {/* Sidebar */}
        <Sidebar 
          selectedHostel={selectedHostel} 
          onHostelSelect={setSelectedHostel} 
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <TopNavigation 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onProfileClick={() => setCurrentView('profile')}
            onMyProductsClick={() => setCurrentView('my-products')}
            onAddProductClick={() => {
              setEditingProduct(null);
              setCurrentView('add-product');
            }}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
          
          {/* Products Grid */}
          <div className="flex-1 p-6">
            {/* Search and Filters */}
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showInStockOnly={showInStockOnly}
              onInStockOnlyChange={setShowInStockOnly}
              maxPrice={maxPrice}
            />

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {selectedHostel ? `Products from ${selectedHostel} Hostel` : 'All Products'}
                {selectedCategory !== 'All' && ` • ${selectedCategory}`}
                {searchTerm && ` • "${searchTerm}"`}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isLoading ? 'Loading...' : `${filteredProducts.length} items available`}
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">No products found</div>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default Index;
