import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';

interface MyProductsPageProps {
  onBack: () => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const MyProductsPage: React.FC<MyProductsPageProps> = ({ 
  onBack, 
  onAddProduct, 
  onEditProduct 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Filter products by current user
  const [userProducts, setUserProducts] = useState<Product[]>(
    mockProducts.filter(product => product.sellerId === user?.id)
  );

  const toggleAvailability = (productId: string) => {
    setUserProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isAvailable: !product.isAvailable }
          : product
      )
    );
    
    toast({
      title: "Product updated",
      description: "Product availability has been updated.",
    });
  };

  const deleteProduct = (productId: string) => {
    setUserProducts(prev => prev.filter(product => product.id !== productId));
    
    toast({
      title: "Product deleted",
      description: "Your product has been removed from the marketplace.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          
          <Button
            onClick={onAddProduct}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        <Card className="shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">My Products</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your listed products ({userProducts.length} items)
            </p>
          </CardHeader>
          
          <CardContent>
            {userProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No products listed yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Start selling by adding your first product to the marketplace.
                </p>
                <Button
                  onClick={onAddProduct}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userProducts.map((product) => (
                  <Card key={product.id} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold truncate">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                                  ₹{product.price}
                                </span>
                                <Badge variant="secondary">{product.category}</Badge>
                                <span className="text-sm text-gray-500">
                                  Qty: {product.quantity}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              {/* Availability Toggle */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleAvailability(product.id)}
                                className={`${
                                  product.isAvailable 
                                    ? 'text-green-600 hover:text-green-700' 
                                    : 'text-gray-400 hover:text-gray-500'
                                }`}
                              >
                                {product.isAvailable ? (
                                  <ToggleRight className="h-5 w-5" />
                                ) : (
                                  <ToggleLeft className="h-5 w-5" />
                                )}
                              </Button>

                              {/* Edit Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>

                              {/* Delete Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge
                              variant={product.isAvailable ? "default" : "destructive"}
                            >
                              {product.isAvailable ? 'Available' : 'Sold Out'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Listed on {new Date(product.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};