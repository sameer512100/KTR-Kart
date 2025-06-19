import React from 'react';
import { Filter, MapPin, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hostels } from '@/data/mockData';
import { Hostel, ProductFilters } from '@/types';

interface SidebarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, onFiltersChange, className = '' }) => {
  const handleHostelChange = (hostel: string) => {
    onFiltersChange({
      ...filters,
      hostel: hostel === 'all' ? undefined : hostel as Hostel
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [values[1], values[0]] // Reverse for higher to lower
    });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      availableOnly: checked
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: undefined,
      hostel: undefined,
      priceRange: [2000, 0], // Higher to lower
      searchQuery: '',
      availableOnly: false
    });
  };

  return (
    <div className={`w-80 space-y-4 ${className}`}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hostel Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Hostel</h3>
            </div>
            <Select 
              value={filters.hostel || 'all'} 
              onValueChange={handleHostelChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hostel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hostels</SelectItem>
                {hostels.map((hostel) => (
                  <SelectItem key={hostel} value={hostel}>
                    {hostel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Price Range</h3>
            </div>
            <div className="space-y-3">
              <Slider
                value={[filters.priceRange[1], filters.priceRange[0]]} // Reverse for display
                onValueChange={handlePriceRangeChange}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹{filters.priceRange[1]}</span>
                <span>₹{filters.priceRange[0]}</span>
              </div>
              <p className="text-xs text-gray-400 text-center">Higher to Lower</p>
            </div>
          </div>

          {/* Availability Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Availability</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="available-only"
                checked={filters.availableOnly}
                onCheckedChange={handleAvailabilityChange}
              />
              <label htmlFor="available-only" className="text-sm">
                Show only available items
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};