"use client";

import { useState, ChangeEvent, FormEvent, useEffect, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password?: string;
  rememberMe: boolean;
}

type Role = 'customer' | 'admin';

function LoginContent() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirect') || '/';
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    if (redirectUrl && redirectUrl !== '/') {
      setShowRedirectMessage(true);
    }
  }, [redirectUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call login with the redirect URL
      await login(formData.email, formData.password || '', selectedRole, redirectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bakery-cream via-bakery-light-gray to-bakery-ivory p-4 pt-24">
      <div className="max-w-md w-full bg-gradient-to-br from-bakery-cream to-bakery-light-gray p-10 rounded-2xl shadow-2xl border-2 border-bakery-bronze">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif text-bakery-plum mb-2">Cafe Relish</h2>
          <p className="text-bakery-text-muted text-sm font-medium">Select your portal to sign in</p>
        </div>

        {showRedirectMessage && (
          <div className="bg-bakery-rose-gold text-bakery-dark p-3 rounded-lg mb-6 text-sm border-2 border-bakery-bronze font-medium shadow-md">
            Please log in to complete your checkout.
          </div>
        )}

        <div className="flex p-1 mb-8 bg-bakery-light-gray rounded-lg border-2 border-bakery-bronze">
          <button type="button" onClick={() => { setSelectedRole('customer'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${selectedRole === 'customer' ? 'bg-bakery-bronze text-bakery-cream shadow-md border border-bakery-bronze' : 'text-bakery-text-muted hover:text-bakery-dark'}`}>
            Customer
          </button>
          <button type="button" onClick={() => { setSelectedRole('admin'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${selectedRole === 'admin' ? 'bg-bakery-bronze text-bakery-cream shadow-md border border-bakery-bronze' : 'text-bakery-text-muted hover:text-bakery-dark'}`}>
            Administrator
          </button>
        </div>

        {selectedRole === 'admin' && (
          <div className="bg-bakery-rose-gold text-bakery-dark p-3 rounded-lg mb-4 text-xs border-2 border-bakery-bronze font-medium">
            ℹ️ <strong>Admin Login:</strong> Use email: admin@cafe-relish.com
          </div>
        )}
        
        {error && <div className="bg-bakery-red text-bakery-cream p-3 rounded-lg mb-6 text-sm border-2 border-bakery-red font-medium shadow-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
            <label htmlFor="email" className="block text-sm font-medium text-bakery-burgundy mb-2">Email Address</label>
            <input id="email" type="email" name="email" required 
              className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50 shadow-sm"
              onChange={handleChange} value={formData.email} />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-bakery-burgundy mb-2">Password</label>
            <input id="password" type={showPassword ? "text" : "password"} name="password" required 
              className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50 shadow-sm"
              onChange={handleChange} value={formData.password} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-sm text-bakery-copper hover:text-bakery-burgundy font-medium transition">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="rememberMe" onChange={handleChange} checked={formData.rememberMe}
                className="rounded border-bakery-copper text-bakery-copper focus:ring-bakery-copper" />
              <span className="text-bakery-brown">Remember Me</span>
            </label>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream p-3 rounded-lg hover:shadow-lg disabled:opacity-50 font-semibold transition-all shadow-md uppercase tracking-wide">
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-bakery-copper text-center text-sm text-bakery-brown">
          New to Cafe Relish?{' '}
          <Link href="/register" 
            className="font-semibold text-bakery-copper hover:text-bakery-burgundy transition-all">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bakery-cream">
        <div className="text-bakery-brown font-medium">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}