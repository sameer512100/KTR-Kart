import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/data/mockData';
import { ProductCategory, Product } from '@/types';

interface AddProductPageProps {
  onBack: () => void;
  editProduct?: Product | null;
}

export const AddProductPage: React.FC<AddProductPageProps> = ({ onBack, editProduct }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: editProduct?.name || '',
    description: editProduct?.description || '',
    price: editProduct?.price || 0,
    category: editProduct?.category || '' as ProductCategory | '',
    quantity: editProduct?.quantity || 1,
    isAvailable: editProduct?.isAvailable ?? true,
    images: editProduct?.images || [] as string[]
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const adjustQuantity = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      toast({
        title: "Images required",
        description: "Please add at least one image for your product.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - in real app, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: editProduct ? "Product updated!" : "Product added!",
        description: editProduct 
          ? "Your product has been successfully updated."
          : "Your product has been added to the marketplace.",
      });
      
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {editProduct ? 'My Products' : 'Marketplace'}
          </Button>
        </div>

        <Card className="shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {editProduct ? 'Update your product details' : 'List your item for sale in the hostel marketplace'}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Images */}
              <div className="space-y-4">
                <Label>Product Images</Label>
                
                {/* Image Upload */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload images or drag and drop
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB each
                    </span>
                  </label>
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                    placeholder="Enter price"
                    required
                    min="1"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your product..."
                    required
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Quantity Controls */}
                <div className="md:col-span-2 space-y-3">
                  <Label>Quantity</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => adjustQuantity(-1)}
                      disabled={formData.quantity <= 1}
                      className="h-12 w-12 p-0"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {formData.quantity}
                      </div>
                      <div className="text-sm text-gray-500">Available</div>
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => adjustQuantity(1)}
                      className="h-12 w-12 p-0"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="md:col-span-2 space-y-3">
                  <Label>Stock Status</Label>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant={formData.isAvailable ? "default" : "outline"}
                      onClick={() => handleInputChange('isAvailable', true)}
                      className={formData.isAvailable ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      Available
                    </Button>
                    <Button
                      type="button"
                      variant={!formData.isAvailable ? "destructive" : "outline"}
                      onClick={() => handleInputChange('isAvailable', false)}
                    >
                      Sold Out
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading 
                  ? (editProduct ? 'Updating...' : 'Adding...') 
                  : (editProduct ? 'Update Product' : 'Add Product')
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};