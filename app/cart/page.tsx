'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, updateSpecialInstructions, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-bakery-plum mb-4">Your Cart is Empty</h1>
          <p className="text-bakery-brown mb-8">Start adding items to get started!</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/menu" className="px-6 py-3 bg-bakery-olive text-bakery-cream uppercase tracking-widest font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bakery-cream px-8 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-bakery-plum mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="bg-bakery-light-gray p-6 rounded-xl shadow-lg border-2 border-bakery-bronze">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-bakery-plum mb-2">{item.name}</h2>
                      <p className="text-lg font-bold text-bakery-bronze">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-bakery-red hover:text-bakery-burgundy font-semibold uppercase text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Quantity Adjuster */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-bakery-brown font-medium">Quantity:</span>
                    <div className="flex items-center border-2 border-bakery-copper rounded-lg">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="px-3 py-2 text-bakery-copper hover:bg-bakery-copper hover:text-bakery-cream transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-semibold text-bakery-dark border-l-2 border-r-2 border-bakery-copper">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="px-3 py-2 text-bakery-copper hover:bg-bakery-copper hover:text-bakery-cream transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-bakery-burgundy mb-2">Special Instructions (optional)</label>
                    <textarea
                      value={item.specialInstructions || ''}
                      onChange={(e) => updateSpecialInstructions(item._id, e.target.value)}
                      placeholder="e.g., Extra frosting, no nuts, gluten-free, etc."
                      className="w-full px-3 py-2 border-2 border-bakery-beige rounded-lg text-bakery-dark placeholder-bakery-brown/50 focus:outline-none focus:border-bakery-copper focus:ring-2 focus:ring-bakery-copper/30 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-bakery-cream to-bakery-beige p-8 rounded-xl shadow-2xl border-2 border-bakery-copper sticky top-32">
              <h2 className="text-2xl font-serif text-bakery-burgundy mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b-2 border-bakery-copper">
                <div className="flex justify-between">
                  <span className="text-bakery-brown">Subtotal:</span>
                  <span className="font-semibold text-bakery-dark">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bakery-brown">Delivery:</span>
                  <span className="font-semibold text-bakery-green">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bakery-brown">Tax (10%):</span>
                  <span className="font-semibold text-bakery-dark">₹{(cartTotal * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-bakery-gold/30 to-bakery-copper/30 rounded-lg border-2 border-bakery-copper">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-bakery-dark">Total:</span>
                  <span className="text-3xl font-serif text-bakery-burgundy">₹{(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream py-4 rounded-lg font-semibold uppercase tracking-wider hover:shadow-lg shadow-md transition-all mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/menu"
                className="block text-center text-bakery-copper hover:text-bakery-burgundy font-semibold text-sm transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
