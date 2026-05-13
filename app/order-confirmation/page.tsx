'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'Unknown';

  return (
    <div className="min-h-screen bg-bakery-cream flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full bg-bakery-beige rounded-xl shadow-2xl border-2 border-bakery-copper p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="inline-block bg-bakery-gold/30 rounded-full p-4 mb-6 border-2 border-bakery-gold">
            <svg className="w-16 h-16 text-bakery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-serif text-bakery-burgundy mb-4">Order Confirmed! 🎉</h1>
        <p className="text-xl text-bakery-brown mb-8 font-medium">Thank you for your order. We're getting started on your delicious treats!</p>

        <div className="bg-gradient-to-r from-bakery-gold/30 to-bakery-copper/30 p-8 rounded-lg mb-8 border-2 border-bakery-copper">
          <p className="text-bakery-brown mb-2 font-medium">Your Order ID:</p>
          <p className="text-2xl font-mono font-bold text-bakery-burgundy break-all">{orderId}</p>
        </div>

        <div className="space-y-4 mb-12 text-left">
          <div className="flex items-start gap-4 p-4 bg-bakery-gold/20 rounded-lg border-2 border-bakery-gold">
            <div className="text-2xl">📧</div>
            <div>
              <p className="font-semibold text-bakery-burgundy">Confirmation Email Sent</p>
              <p className="text-sm text-bakery-brown">We've sent a detailed confirmation email with your order details.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-bakery-gold/20 rounded-lg border-2 border-bakery-gold">
            <div className="text-2xl">⏱️</div>
            <div>
              <p className="font-semibold text-bakery-burgundy">Estimated Delivery: 3-5 Business Days</p>
              <p className="text-sm text-bakery-brown">We'll contact you when your order is ready for pickup or delivery.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-bakery-gold/20 rounded-lg border-2 border-bakery-gold">
            <div className="text-2xl">📞</div>
            <div>
              <p className="font-semibold text-bakery-burgundy">Have Questions?</p>
              <p className="text-sm text-bakery-brown">Call us at <span className="font-semibold">+91 123 456 7890</span> or email <span className="font-semibold">hello@cafe.relish</span></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="px-8 py-3 bg-gradient-to-r from-bakery-olive to-bakery-olive-dark text-bakery-cream uppercase tracking-widest font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-bakery-cream text-bakery-burgundy uppercase tracking-widest font-semibold border-2 border-bakery-burgundy rounded-lg hover:bg-bakery-beige transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-bakery-copper text-sm text-bakery-brown font-medium">
          <p>Order ID: <span className="font-mono text-bakery-burgundy">{orderId}</span></p>
          <p>Order Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bakery-cream flex items-center justify-center">
        <div className="text-bakery-brown font-medium">Loading...</div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
