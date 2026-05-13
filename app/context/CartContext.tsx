"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define our types
type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  getTotalItems: () => number;
  updateSpecialInstructions: (id: string, instructions: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Build the Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedCart = localStorage.getItem('cafe-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('cafe-cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [cart, isClient]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === newItem._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const incrementQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateSpecialInstructions = (id: string, instructions: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotalItems, updateSpecialInstructions, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easy access
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}