'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { apiUrl } from '../lib/api';

declare global {
  interface Window {
    Stripe: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { user, loading } = useAuth();
  const { addToast } = useToast();
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal'>('card');
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'dine-in' | null>(null);
  const [tableNumber, setTableNumber] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="text-bakery-brown font-medium">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-bakery-burgundy mb-4">No Items in Cart</h1>
          <Link href="/menu" className="text-bakery-copper hover:text-bakery-burgundy font-semibold transition">
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleDineInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber.trim()) {
      alert('Please enter a table number');
      return;
    }
    
    setOrderLoading(true);
    try {
      // Create order for dine-in
      const finalFormData = {
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: '',
        address: `Table ${tableNumber}`,
        city: 'Dine-In',
        zipCode: 'Dine-In',
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: parseFloat((cartTotal * 1.1).toFixed(2)),
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        orderType: 'dine-in',
        tableNumber: tableNumber,
      };

      // Send order to backend
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl('/api/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        const result = await response.json();
        clearCart();
        setOrderConfirmed(true);
        addToast('✅ Your order has been placed successfully!', 'success', 5000);
      } else {
        const error = await response.json();
        console.error('Order creation error:', error);
        alert(error.message || 'Error creating order. Please try again.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setOrderLoading(false);
    }
  };

  // Show Dine-In confirmation screen
  if (deliveryMethod === 'dine-in' && orderConfirmed) {
    return (
      <div className="min-h-screen bg-bakery-cream px-8 md:px-16 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-bakery-gold/20 to-bakery-copper/10 p-12 rounded-2xl shadow-xl border-3 border-bakery-olive text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-serif text-bakery-burgundy mb-2">Order Placed Successfully!</h1>
            <p className="text-xl text-bakery-brown mb-6">Your order has been received</p>
            
            <div className="bg-bakery-beige p-8 rounded-xl mb-8 border-2 border-bakery-copper">
              <p className="text-xl text-bakery-dark mb-4 font-semibold">Table Number: <span className="text-bakery-burgundy text-2xl">{tableNumber}</span></p>
              <p className="text-lg text-bakery-brown mb-6">Your order will be taken shortly.</p>
              <div className="bg-bakery-olive/10 p-6 rounded-lg border-2 border-bakery-olive mb-6">
                <p className="text-bakery-dark font-semibold text-lg">💳 Please make the payment at the counter.</p>
              </div>
            </div>

            <p className="text-2xl font-serif text-bakery-burgundy mb-8">Thank you for choosing Café Relish! 🍽️</p>
            
            <Link 
              href="/menu"
              className="inline-block bg-bakery-olive text-bakery-cream px-8 py-4 rounded-lg font-semibold hover:bg-bakery-olive-dark transition-all shadow-md"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show Home Delivery options
  if (deliveryMethod === 'home') {
    return (
      <div className="min-h-screen bg-bakery-cream px-8 md:px-16 py-16">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setDeliveryMethod(null)}
            className="mb-8 text-bakery-copper hover:text-bakery-burgundy font-semibold transition flex items-center gap-2"
          >
            ← Change Delivery Method
          </button>

          <div className="bg-bakery-beige p-8 rounded-2xl shadow-xl border-2 border-bakery-copper">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🏠</div>
              <h1 className="text-3xl font-serif text-bakery-burgundy mb-4">Home Delivery</h1>
              <p className="text-lg text-bakery-brown">Please place your order through:</p>
            </div>

            <div className="space-y-6 mb-12">
              {/* Zomato Button */}
              <a 
                href="https://www.zomato.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-bakery-burgundy to-bakery-burgundy hover:shadow-xl transition-all transform hover:scale-105 text-bakery-cream p-8 rounded-xl text-center font-bold text-xl"
              >
                🍔 Zomato
              </a>

              {/* Swiggy Button */}
              <a 
                href="https://www.swiggy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-bakery-olive to-bakery-olive-dark hover:shadow-xl transition-all transform hover:scale-105 text-bakery-cream p-8 rounded-xl text-center font-bold text-xl"
              >
                🛵 Swiggy
              </a>
            </div>

            <div className="bg-bakery-gold/30 p-6 rounded-xl border-2 border-bakery-gold">
              <p className="text-bakery-dark font-semibold text-lg text-center mb-3">📝 Instructions:</p>
              <p className="text-bakery-dark text-center text-lg">
                Search for <span className="font-bold text-bakery-burgundy">Café Relish Kolhapur</span> and complete your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show Dine-In form
  if (deliveryMethod === 'dine-in') {
    return (
      <div className="min-h-screen bg-bakery-cream px-8 md:px-16 py-16">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setDeliveryMethod(null)}
            className="mb-8 text-bakery-copper hover:text-bakery-burgundy font-semibold transition flex items-center gap-2"
          >
            ← Change Delivery Method
          </button>

          <div className="bg-bakery-beige p-8 rounded-2xl shadow-xl border-2 border-bakery-copper">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🍽️</div>
              <h1 className="text-3xl font-serif text-bakery-burgundy mb-4">Dine-In Order</h1>
              <p className="text-lg text-bakery-brown">Please enter your table number</p>
            </div>

            <form onSubmit={handleDineInSubmit} className="space-y-6">
              <div>
                <label className="block text-bakery-dark font-semibold mb-3">Table Number</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g., 5, A1, VIP-1"
                  className="w-full px-6 py-4 text-center text-2xl font-bold border-2 border-bakery-copper rounded-lg focus:outline-none focus:border-bakery-burgundy focus:ring-2 focus:ring-bakery-copper/30 text-bakery-dark placeholder-bakery-brown/50"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={orderLoading}
                className="w-full bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream py-4 rounded-lg font-semibold uppercase tracking-wider hover:shadow-lg shadow-md transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderLoading ? 'Processing Order...' : 'Confirm Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Show delivery method selection (initial screen)
  return (
    <div className="min-h-screen bg-bakery-cream px-8 md:px-16 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-bakery-beige p-8 rounded-2xl shadow-xl border-2 border-bakery-copper">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-bakery-burgundy mb-4">How would you like to place your order?</h1>
            <p className="text-lg text-bakery-brown">👉 Please choose an option:</p>
          </div>

          <div className="space-y-6">
            {/* Home Delivery Button */}
            <button
              onClick={() => setDeliveryMethod('home')}
              className="w-full group relative overflow-hidden rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-bakery-burgundy to-bakery-copper opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-bakery-burgundy to-bakery-copper text-bakery-cream p-8 rounded-xl text-center font-bold text-2xl flex items-center justify-center gap-4">
                <span className="text-4xl">🏠</span>
                <span>Home Delivery</span>
              </div>
            </button>

            {/* Dine-In Button */}
            <button
              onClick={() => setDeliveryMethod('dine-in')}
              className="w-full group relative overflow-hidden rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-bakery-olive to-bakery-olive-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream p-8 rounded-xl text-center font-bold text-2xl flex items-center justify-center gap-4">
                <span className="text-4xl">🍽️</span>
                <span>Dine-In (Order on Table)</span>
              </div>
            </button>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/menu"
              className="text-bakery-copper hover:text-bakery-burgundy font-semibold transition"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
