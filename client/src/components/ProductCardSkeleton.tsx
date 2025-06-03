
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-green-100 dark:border-gray-700 p-6">
      {/* Image skeleton */}
      <Skeleton className="w-full h-40 rounded-lg mb-4" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      
      {/* Details */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      {/* Button */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
