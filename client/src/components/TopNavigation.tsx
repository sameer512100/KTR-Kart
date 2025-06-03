
import React, { useState } from 'react';
import { ShoppingBag, PenTool, Utensils, Book, Gamepad2, Laptop, User, Moon, Sun, Plus, Package, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const categories = [
  { name: 'All', icon: ShoppingBag },
  { name: 'Snacks', icon: Utensils },
  { name: 'Stationery', icon: PenTool },
  { name: 'Books', icon: Book },
  { name: 'Electronics', icon: Laptop },
  { name: 'Games', icon: Gamepad2 }
];

interface TopNavigationProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onProfileClick: () => void;
  onMyProductsClick: () => void;
  onAddProductClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  selectedCategory, 
  onCategorySelect, 
  onProfileClick, 
  onMyProductsClick, 
  onAddProductClick,
  isDarkMode,
  onToggleTheme 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-green-100 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/c026f09e-a169-4425-9e8e-8a6b07797b19.png" 
            alt="KTR KART Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">KTR KART</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Buy & Sell with your hostel mates
          </div>
          
          <Button
            onClick={onToggleTheme}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button
            onClick={onAddProductClick}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            <Plus size={16} className="mr-2" />
            Sell Item
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onProfileClick}>
                <Settings size={16} className="mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onMyProductsClick}>
                <Package size={16} className="mr-2" />
                My Products
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              <IconComponent size={16} />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopNavigation;
