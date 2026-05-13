"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiUrl } from '../lib/api';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  loyaltyPoints: number;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(apiUrl('/api/user/profile'), {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
          setFormData({ name: data.user.name, email: data.user.email });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (user && !loading) {
      fetchProfile();
    }
  }, [user, loading]);

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-bakery-brown font-medium">Loading...</div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Add API call to update user profile
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-bakery-cream pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-bakery-copper hover:text-bakery-burgundy transition">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-bakery-beige rounded-2xl shadow-xl border-2 border-bakery-copper p-8">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-serif text-bakery-burgundy mb-2">My Profile</h1>
              <p className="text-bakery-brown font-medium">Manage your account information</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream rounded-lg hover:shadow-lg shadow-md transition-all font-semibold"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Loyalty Points Card */}
          <div className="mb-8 bg-gradient-to-r from-bakery-gold/30 to-bakery-copper/30 border-2 border-bakery-copper rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-bakery-copper text-sm font-medium mb-1">Loyalty Points Balance</p>
                <p className="text-4xl font-serif text-bakery-burgundy">{userProfile.loyaltyPoints}</p>
              </div>
              <div className="text-5xl">⭐</div>
            </div>
            <p className="text-sm text-bakery-copper mt-3 font-medium">Earn 1 point per dollar spent. Redeem for discounts!</p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-bakery-burgundy mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50"
                />
              ) : (
                <p className="text-lg text-bakery-burgundy font-semibold">{userProfile.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-bakery-burgundy mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-bakery-cream border-2 border-bakery-copper rounded-lg focus:ring-2 focus:ring-bakery-copper focus:border-bakery-burgundy outline-none text-bakery-dark placeholder-bakery-brown/50"
                />
              ) : (
                <p className="text-lg text-bakery-burgundy font-semibold">{userProfile.email}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-bakery-burgundy mb-2">Account Type</label>
              <p className="text-lg text-stone-900 capitalize">{userProfile.role}</p>
            </div>

            {/* Save Changes Button */}
            {isEditing && (
              <div className="pt-6 border-t border-stone-200">
                <button
                  onClick={handleSave}
                  className="w-full px-4 py-3 bg-stone-900 text-white rounded-lg hover:opacity-90 transition-all font-medium"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <h3 className="text-lg font-serif text-stone-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href="/menu"
                className="block p-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-900 font-medium transition-all"
              >
                Browse Menu
              </Link>
              <Link
                href="/cart"
                className="block p-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-900 font-medium transition-all"
              >
                View Cart
              </Link>
              <Link
                href="/orders"
                className="block p-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-900 font-medium transition-all"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
