"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Full name is required');
      return;
    }

    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bakery-cream via-bakery-beige to-bakery-cream p-4 pt-24">
      <div className="max-w-md w-full bg-gradient-to-br from-bakery-cream to-bakery-light-gray p-10 rounded-2xl shadow-2xl border-2 border-bakery-bronze">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-bakery-burgundy mb-2">Cafe Relish</h2>
          <p className="text-bakery-brown text-sm font-medium">Create an Account</p>
        </div>

        {error && <div className="bg-bakery-red text-bakery-cream p-3 rounded-lg mb-6 text-sm border-2 border-bakery-red font-medium shadow-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-bakery-burgundy mb-2">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" required onChange={handleChange} value={formData.name}
              className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-bakery-burgundy mb-2">Email Address</label>
            <input type="email" name="email" placeholder="your@email.com" required onChange={handleChange} value={formData.email}
              className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-bakery-burgundy mb-2">Password</label>
            <input type="password" name="password" placeholder="Min. 6 characters" required minLength={6} onChange={handleChange} value={formData.password}
              className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-bakery-burgundy mb-2">Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Re-enter password" required minLength={6} onChange={handleChange} value={formData.confirmPassword}
              className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50 shadow-sm" />
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream p-3 rounded-lg hover:shadow-lg disabled:opacity-50 mt-4 font-semibold transition-all shadow-md uppercase tracking-wide">
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-bakery-brown">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-bakery-copper hover:text-bakery-burgundy transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}