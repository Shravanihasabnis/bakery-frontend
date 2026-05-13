'use client';

import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useState, useEffect } from 'react';

interface ProductProps {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function ProductCard({ _id, name, description, price, image }: ProductProps) {
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [proxyTried, setProxyTried] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(image);

  // Keep internal src in sync when parent updates the `image` prop (async fetch)
  useEffect(() => {
    setImageSrc(image);
    setProxyTried(false);
    setImageError(false);
  }, [image]);

  // Check if item is already in cart
  useEffect(() => {
    const cartItem = cart.find((item) => item._id === (_id || name));
    setQuantity(cartItem?.quantity || 0);
  }, [cart, _id, name]);

  const resetImageError = () => {
    setImageError(false);
    setProxyTried(false);
    setImageSrc(image);
  };

  const handleAddToCart = () => {
    addToCart({
      _id: _id || name,
      name,
      price,
    });
    addToast(`✨ ${name} added to cart!`, 'success', 2500);
  };

  const handleIncrement = () => {
    incrementQuantity(_id || name);
    addToast(`➕ ${name} quantity increased`, 'info', 1500);
  };

  const handleDecrement = () => {
    decrementQuantity(_id || name);
    addToast(`➖ ${name} quantity decreased`, 'info', 1500);
  };

  return (
    <div className="border-2 border-bakery-gold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-bakery-cream hover:border-bakery-bronze">
      <div className="h-44 w-full overflow-hidden bg-gradient-to-b from-bakery-gold via-bakery-rose-gold to-bakery-beige flex items-center justify-center">
        {imageSrc && !imageError ? (
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
            onError={() => {
              // If first load failed, try a simple image proxy to bypass hotlinking/blocking
              if (!proxyTried && imageSrc) {
                const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(imageSrc.replace(/^https?:\/\//, ''))}&w=800&h=400&fit=cover`;
                setImageSrc(proxied);
                setProxyTried(true);
              } else {
                setImageError(true);
              }
            }}
            onLoad={() => setImageError(false)}
          />
        ) : (
          <div className="text-center text-bakery-text-muted">
            <div className="text-4xl mb-2">🍰</div>
            <p className="text-sm">Image not available</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-bakery-plum">{name}</h3>
        <p className="text-bakery-text-muted mb-4 line-clamp-2">{description}</p>
        {/* Image URL removed to keep UI focused on visuals */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-bakery-bronze">₹{price.toFixed(2)}</span>
          {quantity === 0 ? (
            <button onClick={handleAddToCart} className="bg-bakery-olive-dark text-bakery-cream px-4 py-2 rounded-lg hover:bg-bakery-plum shadow-md transition-all font-semibold">
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-bakery-beige border-2 border-bakery-olive-dark rounded-lg px-2 py-1">
              <button onClick={handleDecrement} className="text-bakery-olive-dark hover:bg-bakery-gold w-7 h-7 flex items-center justify-center rounded font-bold transition">
                −
              </button>
              <span className="text-bakery-dark font-bold w-6 text-center">{quantity}</span>
              <button onClick={handleIncrement} className="text-bakery-olive-dark hover:bg-bakery-rose-gold w-7 h-7 flex items-center justify-center rounded font-bold">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}