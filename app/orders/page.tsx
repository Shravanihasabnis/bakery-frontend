"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiUrl } from '../lib/api';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName: string;
  totalAmount: number;
  loyaltyPointsEarned: number;
  orderStatus: string;
  items: OrderItem[];
  createdAt: string;
}

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(apiUrl('/api/orders'), {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error loading orders');
      } finally {
        setIsLoadingOrders(false);
      }
    };

    if (user && !loading) {
      fetchOrders();
    }
  }, [user, loading]);

  if (loading || isLoadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-bakery-brown font-medium">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bakery-cream pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-bakery-copper hover:text-bakery-burgundy transition">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-bakery-beige rounded-2xl shadow-xl border-2 border-bakery-copper p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-bakery-burgundy mb-2">My Orders</h1>
            <p className="text-bakery-brown font-medium">View and track your orders</p>
          </div>

          {error && (
            <div className="bg-bakery-red/20 text-bakery-red p-4 rounded-lg mb-6 border-2 border-bakery-red font-medium">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-bakery-brown mb-6 font-medium">You haven't placed any orders yet.</p>
              <Link
                href="/menu"
                className="inline-block px-6 py-3 bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream rounded-lg hover:shadow-lg shadow-md transition-all font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gradient-to-r from-bakery-cream to-bakery-beige hover:shadow-lg border-2 border-bakery-copper rounded-lg p-6 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-bakery-burgundy">Order #{order._id.slice(-8).toUpperCase()}</h3>
                      <p className="text-sm text-bakery-brown">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-bakery-burgundy">${order.totalAmount.toFixed(2)}</p>
                      <p className={`text-sm font-medium capitalize ${
                        order.orderStatus === 'delivered'
                          ? 'text-bakery-green'
                          : order.orderStatus === 'shipped'
                          ? 'text-bakery-blue'
                          : order.orderStatus === 'processing'
                          ? 'text-bakery-copper'
                          : 'text-bakery-brown'
                      }`}>
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t-2 border-bakery-copper pt-4 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-bakery-brown">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded p-3">
                    <p className="text-sm">
                      <span className="font-semibold text-amber-900">+{order.loyaltyPointsEarned}</span>
                      <span className="text-amber-700"> loyalty points earned</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

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
                href="/profile"
                className="block p-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-900 font-medium transition-all"
              >
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
