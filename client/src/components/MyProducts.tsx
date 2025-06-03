
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash2, Package } from 'lucide-react';
import { Product } from './ProductCard';

interface MyProductsProps {
  onBack: () => void;
  onAddProduct: () => void;
  userProducts: Product[];
  onToggleStock: (productId: number) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const MyProducts: React.FC<MyProductsProps> = ({ 
  onBack, 
  onAddProduct, 
  userProducts, 
  onToggleStock, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  return (
    <div className="min-h-screen bg-[#F5FFFA] dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              onClick={onBack}
              variant="ghost"
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Products</h1>
          </div>
          
          <Button
            onClick={onAddProduct}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </div>

        {userProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No products yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Start selling by adding your first product
              </p>
              <Button onClick={onAddProduct} className="bg-green-600 hover:bg-green-700">
                <Plus size={16} className="mr-2" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditProduct(product)}
                        className="h-8 w-8"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteProduct(product.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        product.inStock ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      
                      <Button
                        onClick={() => onToggleStock(product.id)}
                        variant={product.inStock ? "destructive" : "default"}
                        size="sm"
                        className={product.inStock ? "" : "bg-green-600 hover:bg-green-700"}
                      >
                        {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
