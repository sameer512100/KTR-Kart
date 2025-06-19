import React, { useState } from 'react';
import { Heart, MapPin, User, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleWhatsAppContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in your "${product.name}" listed on KTR KART for ₹${product.price}. Is it still available?`;
    const whatsappUrl = `https://wa.me/${product.seller.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative" onClick={() => onProductClick(product)}>
        {/* Image Gallery */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {product.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Like Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {/* Stock Status Badge */}
          <Badge
            variant={product.isAvailable ? "default" : "destructive"}
            className="absolute top-2 left-2"
          >
            {product.isAvailable ? 'Available' : 'Sold Out'}
          </Badge>

          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="absolute bottom-2 right-2 bg-black/60 text-white hover:bg-black/70"
          >
            {product.category}
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{product.price}
              </span>
              <div className="text-right">
                <div className="text-sm text-gray-500">Quantity</div>
                <div className="text-lg font-semibold">{product.quantity}</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>

            {/* Seller Info */}
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.seller.name}
              </span>
              <div className="flex items-center space-x-1 ml-auto">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {product.seller.hostel} - {product.seller.roomNumber}
                </span>
              </div>
            </div>

            {/* WhatsApp Contact Button */}
            <Button
              onClick={handleWhatsAppContact}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              disabled={!product.isAvailable}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact on WhatsApp
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};