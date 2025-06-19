import React from 'react';
import { Search, ShoppingCart, Sun, Moon, User, Plus, Package, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/mockData';
import { ProductCategory } from '@/types';

interface TopNavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory | undefined;
  onCategoryChange: (category: ProductCategory | undefined) => void;
  onNavigate: (page: 'marketplace' | 'profile' | 'my-products' | 'add-product') => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onNavigate
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      {/* Main Navigation */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('marketplace')}>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-700 dark:text-green-400">KTR KART</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Buy & Sell with your hostel mates</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-10 w-10 p-0"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Add Product Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('add-product')}
              className="hidden sm:flex items-center space-x-1 h-10"
            >
              <Plus className="h-4 w-4" />
              <span>Sell</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profilePicture} alt={user?.name} />
                    <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-500">{user?.hostel} - Room {user?.roomNumber}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('my-products')}>
                  <Package className="mr-2 h-4 w-4" />
                  My Products
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('add-product')} className="sm:hidden">
                  <Plus className="mr-2 h-4 w-4" />
                  Sell Product
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2 max-w-7xl mx-auto overflow-x-auto">
          <Button
            variant={selectedCategory === undefined ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(undefined)}
            className={selectedCategory === undefined ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600" : ""}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={selectedCategory === category ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};