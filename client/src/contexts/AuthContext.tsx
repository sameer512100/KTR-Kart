import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { currentUser } from '@/data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('ktr-kart-user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email === currentUser.email && password === 'password') {
      setAuthState({
        user: currentUser,
        isAuthenticated: true
      });
      localStorage.setItem('ktr-kart-user', JSON.stringify(currentUser));
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setAuthState({
      user: newUser,
      isAuthenticated: true
    });
    localStorage.setItem('ktr-kart-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem('ktr-kart-user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState({
        user: updatedUser,
        isAuthenticated: true
      });
      localStorage.setItem('ktr-kart-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};