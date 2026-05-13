'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const { getTotalItems } = useCart();
  const { user, logout, loading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = getTotalItems();
  const displayItems = totalItems > 5 ? '5+' : totalItems;

  // Only render after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-16 bg-bakery-cream shadow-xl border-b-2 border-bakery-bronze">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="relative w-[240px] h-[90px] hover:opacity-80 transition">
            {/* Cafe (top-left) */}
            <span className="absolute top-0 left-2 text-3xl italic text-green-950 font-serif z-10">
              Cafe
            </span>

            {/* Pot (center) */}
            <span className="absolute top-2.5 left-[58px] text-3xl">
              🍲
            </span>

            {/* Relish (main focus, bottom) */}
            <span className="absolute top-5 left-5 text-6xl italic text-green-800 font-serif tracking-tight">
              Relish
            </span>

            {/* Tagline */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.35em] text-red-900 whitespace-nowrap">
              THE HUNGER STATION
            </span>
          </div>
        </Link>

        {/* Horizontal Menu - Consistent styling */}
        <div className="flex items-center gap-8 text-[15px] uppercase tracking-[0.3em] font-bold">
          <Link href="/" className={`pb-1 border-b-2 transition-all ${isActive('/') ? 'text-bakery-bronze border-bakery-bronze' : 'text-bakery-dark hover:text-bakery-bronze border-b-2 border-transparent'}`}>
            Home
          </Link>
          <Link href="/menu" className={`pb-1 border-b-2 transition-all ${isActive('/menu') ? 'text-bakery-bronze border-bakery-bronze' : 'text-bakery-dark hover:text-bakery-bronze border-b-2 border-transparent'}`}>
            Menu
          </Link>
          <Link href="/our-story" className={`pb-1 border-b-2 transition-all ${isActive('/our-story') ? 'text-bakery-bronze border-bakery-bronze' : 'text-bakery-dark hover:text-bakery-bronze border-b-2 border-transparent'}`}>
            Our Story
          </Link>
          <Link href="/cafe" className={`pb-1 border-b-2 transition-all ${isActive('/cafe') ? 'text-bakery-bronze border-bakery-bronze' : 'text-bakery-dark hover:text-bakery-bronze border-b-2 border-transparent'}`}>
            Café
          </Link>
        </div>

        {/* Right side: Cart and Auth */}
        <div className="flex items-center gap-4 ml-6">
          <Link href="/cart" className="relative text-black-500 hover:text-bakery-bronze text-2xl transition-colors">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-bakery-red text-bakery-cream text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {displayItems}
              </span>
            )}
          </Link>

          {isMounted && !loading && (
            <>
              {user ? (
                // User Profile Dropdown
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 bg-bakery-olive-dark text-bakery-cream px-4 py-2 rounded-md font-semibold hover:bg-bakery-plum shadow-md transition"
                  >
                    <span className="text-lg">👤</span>
                    {user.role === 'admin' && <span className="text-[10px] bg-bakery-red text-bakery-cream px-1.5 rounded">ADMIN</span>}
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-bakery-cream border-2 border-bakery-bronze rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-bakery-dark hover:bg-bakery-beige transition font-medium"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-bakery-dark hover:bg-bakery-beige transition font-medium"
                      >
                        My Orders
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-bakery-dark hover:bg-bakery-beige transition font-medium"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-bakery-dark hover:bg-bakery-beige transition font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Auth Buttons
                <div className="flex gap-3">
                  <Link href="/login" className="bg-bakery-olive-dark text-bakery-cream px-5 py-2 rounded-md font-semibold hover:bg-bakery-plum shadow-md transition uppercase text-xs">
                    Login
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}