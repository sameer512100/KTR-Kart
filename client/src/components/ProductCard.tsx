
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  quantity: number;
  category: string;
  hostel: string;
  roomNumber: string;
  sellerPhone: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 relative group">
      <div className="relative">
        <div onClick={onClick} className="p-4">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
          
          <CardContent className="p-0 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm leading-tight">
                {product.name}
              </h3>
              <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs ml-2 flex-shrink-0">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
              <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                {product.category}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <div>{product.hostel} • Room {product.roomNumber}</div>
              <div>Qty: {product.quantity}</div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
