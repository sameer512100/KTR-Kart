import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LoginPage } from '@/components/auth/LoginPage';
import { SignupPage } from '@/components/auth/SignupPage';
import { MarketplacePage } from '@/components/marketplace/MarketplacePage';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { MyProductsPage } from '@/components/products/MyProductsPage';
import { AddProductPage } from '@/components/products/AddProductPage';
import { Toaster } from '@/components/ui/sonner';
import { Product } from '@/types';

type Page = 'login' | 'signup' | 'marketplace' | 'profile' | 'my-products' | 'add-product';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setCurrentPage('add-product');
  };

  // Show authentication pages if not logged in
  if (!isAuthenticated) {
    if (currentPage === 'signup') {
      return <SignupPage onSwitchToLogin={() => setCurrentPage('login')} />;
    }
    return <LoginPage onSwitchToSignup={() => setCurrentPage('signup')} />;
  }

  // Show main application pages when authenticated
  switch (currentPage) {
    case 'profile':
      return <ProfilePage onBack={() => handleNavigation('marketplace')} />;
    
    case 'my-products':
      return (
        <MyProductsPage
          onBack={() => handleNavigation('marketplace')}
          onAddProduct={() => handleNavigation('add-product')}
          onEditProduct={handleEditProduct}
        />
      );
    
    case 'add-product':
      return (
        <AddProductPage
          onBack={() => handleNavigation(editingProduct ? 'my-products' : 'marketplace')}
          editProduct={editingProduct}
        />
      );
    
    default:
      return <MarketplacePage onNavigate={handleNavigation} />;
  }
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen">
          <AppContent />
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;