
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Upload, X, Plus, Minus } from 'lucide-react';

interface AddProductProps {
  onBack: () => void;
  onSave: (productData: any) => void;
  userHostel: string;
  userRoomNumber: string;
  userPhone: string;
  editingProduct?: any;
}

const AddProduct: React.FC<AddProductProps> = ({ 
  onBack, 
  onSave, 
  userHostel, 
  userRoomNumber, 
  userPhone,
  editingProduct 
}) => {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || '',
    price: editingProduct?.price || '',
    category: editingProduct?.category || '',
    image: editingProduct?.image || '',
    inStock: editingProduct?.inStock ?? true,
    quantity: editingProduct?.quantity || 1
  });

  const categories = ['Snacks', 'Stationery', 'Books', 'Electronics', 'Games'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          image: newImage
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const incrementQuantity = () => {
    setFormData(prev => ({
      ...prev,
      quantity: prev.quantity + 1
    }));
  };

  const decrementQuantity = () => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(0, prev.quantity - 1)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
      hostel: userHostel,
      roomNumber: userRoomNumber,
      sellerPhone: userPhone,
      id: editingProduct?.id || Date.now()
    };
    onSave(productData);
  };

  return (
    <div className="min-h-screen bg-[#F5FFFA] dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? 'Edit Product' : 'List Your Product'}</CardTitle>
            <CardDescription>
              Fill in the details to {editingProduct ? 'update' : 'list'} your product on KTR KART
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <form onSubmit={handleSubmit} className="space-y-6 pr-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Maggi Noodles Pack"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category-select" className="block text-sm font-medium mb-2">Category</label>
                  <select
                    id="category-select"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      className="h-10 w-10"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-semibold min-w-[2rem] text-center">
                      {formData.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      className="h-10 w-10"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  
                  {/* Current Image */}
                  {formData.image && (
                    <div className="mb-4 relative inline-block">
                      <img 
                        src={formData.image} 
                        alt="Product preview" 
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={removeImage}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  )}

                  {/* Upload Area */}
                  {!formData.image && (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        Add a product image
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
                      >
                        <Upload size={16} />
                        <span>Choose Image</span>
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Stock Status</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="stockStatus"
                        checked={formData.inStock === true}
                        onChange={() => setFormData({...formData, inStock: true})}
                        className="text-green-600"
                      />
                      <span className="text-sm font-medium text-green-600">In Stock</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="stockStatus"
                        checked={formData.inStock === false}
                        onChange={() => setFormData({...formData, inStock: false})}
                        className="text-red-600"
                      />
                      <span className="text-sm font-medium text-red-600">Out of Stock</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {editingProduct ? 'Update Product' : 'List Product'}
                  </Button>
                </div>
              </form>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
