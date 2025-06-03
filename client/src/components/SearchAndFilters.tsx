
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showInStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  maxPrice: number;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  showInStockOnly,
  onInStockOnlyChange,
  maxPrice
}) => {
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const handleApplyFilters = () => {
    onPriceRangeChange(tempPriceRange);
  };

  const handleClearFilters = () => {
    const resetRange: [number, number] = [0, maxPrice];
    setTempPriceRange(resetRange);
    onPriceRangeChange(resetRange);
    onInStockOnlyChange(false);
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < maxPrice || showInStockOnly;

  return (
    <div className="flex items-center space-x-4 mb-6">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filters */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter size={16} className="mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={tempPriceRange[0]}
                  onChange={(e) => setTempPriceRange([Number(e.target.value) || 0, tempPriceRange[1]])}
                  className="w-20"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={tempPriceRange[1]}
                  onChange={(e) => setTempPriceRange([tempPriceRange[0], Number(e.target.value) || maxPrice])}
                  className="w-20"
                />
              </div>
            </div>

            {/* Stock Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStockOnly"
                checked={showInStockOnly}
                onChange={(e) => onInStockOnlyChange(e.target.checked)}
              />
              <label htmlFor="inStockOnly" className="text-sm">
                Show only in-stock items
              </label>
            </div>

            <Button onClick={handleApplyFilters} className="w-full">
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchAndFilters;
