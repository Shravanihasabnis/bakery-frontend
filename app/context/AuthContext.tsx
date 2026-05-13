'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiUrl } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'admin' | 'customer', redirect?: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Redirect unauthenticated users from protected routes
  useEffect(() => {
    if (!loading && !user && pathname?.startsWith('/admin')) {
      router.push('/login');
    }
  }, [user, pathname, router, loading]);

  const login = async (email: string, password: string, role: 'admin' | 'customer', redirect?: string) => {
    try {
      console.log('🔐 Login attempt:', { email, role, redirect });
      
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, requestedRole: role }),
      });

      const data = await res.json();
      console.log('📨 Backend response:', data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };

      console.log('✅ Setting user data:', userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Use redirect parameter if provided, otherwise use role-based redirect
      const finalRedirect = redirect || (data.user.role === 'admin' ? '/admin' : '/');
      console.log('🚀 Redirecting to:', finalRedirect, 'with role:', data.user.role);
      
      setTimeout(() => {
        router.push(finalRedirect);
      }, 100);
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: 'customer',
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTimeout(() => {
      console.log('🔄 Redirecting to home...');
      router.push('/');
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};