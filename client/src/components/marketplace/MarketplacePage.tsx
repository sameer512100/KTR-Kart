import React, { useState, useMemo } from 'react';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductModal } from '@/components/products/ProductModal';
import { mockProducts } from '@/data/mockData';
import { Product, ProductFilters, ProductCategory } from '@/types';

interface MarketplacePageProps {
  onNavigate: (page: 'marketplace' | 'profile' | 'my-products' | 'add-product') => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<ProductFilters>({
    category: undefined,
    hostel: undefined,
    priceRange: [2000, 0], // Higher to lower
    searchQuery: '',
    availableOnly: false
  });

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Hostel filter
      if (filters.hostel && product.seller.hostel !== filters.hostel) {
        return false;
      }

      // Price range filter (higher to lower)
      if (product.price < filters.priceRange[1] || product.price > filters.priceRange[0]) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSeller = product.seller.name.toLowerCase().includes(query);
        
        if (!matchesName && !matchesDescription && !matchesCategory && !matchesSeller) {
          return false;
        }
      }

      // Availability filter
      if (filters.availableOnly && !product.isAvailable) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleCategoryChange = (category: ProductCategory | undefined) => {
    setFilters(prev => ({ ...prev, category }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <TopNavigation
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        onNavigate={onNavigate}
      />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar
            filters={filters}
            onFiltersChange={setFilters}
            className="sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto p-4"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Marketplace
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                {filters.category && ` in ${filters.category}`}
                {filters.hostel && ` from ${filters.hostel}`}
              </p>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-6">
              <Sidebar
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};