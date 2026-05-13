import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from './components/Navbar' 
import { AuthProvider } from '../app/context/AuthContext'
import { CartProvider } from '../app/context/CartContext'
import { ToastProvider } from '../app/context/ToastContext'

// Load Fonts
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif' 
})

export const metadata: Metadata = {
  title: 'Cafe relish',
  description: 'French-inspired vegetarian patisserie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-bakery-cream text-bakery-dark">
        
        {/* Wrap the app in ToastProvider for notifications */}
        <ToastProvider>
          {/* Wrap the app in AuthProvider so login is required first */}
          <AuthProvider>
            <CartProvider>
              <Navbar /> 
              
              <main className="pt-20">{children}</main>
            
            {/* Rich Footer */}
            <footer className="relative bg-gradient-to-br from-[#2F1B12] via-[#3E2723] to-[#5C3D2E] text-[#FAF9F6] py-12 px-8 md:px-16 border-t border-[#D4A373] overflow-hidden">
               <div className="absolute top-0 left-0 w-72 h-72 bg-[#E9C46A]/20 rounded-full blur-3xl opacity-40"></div>
               <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D4A373]/20 rounded-full blur-3xl opacity-40"></div>
               <div className="max-w-7xl mx-auto text-center">
                <div className="mb-8">
                  <p className="font-serif text-3xl text-[#E9C46A] mb-2 tracking-wide">Cafe Relish</p>
                  <p className="text-[#EDE0D4] text-sm italic max-w-2xl mx-auto">Experience the artistry of French patisserie with vegetarian excellence and timeless elegance</p>
                </div>
                <div className="flex flex-col md:flex-row justify-around items-center gap-4 mb-8">
                  <div className="p-4 bg-[#3E2723]/50 rounded-xl shadow-md border border-[#D4A373]/30 hover:border-[#D4A373]/60 hover:shadow-lg transition backdrop-blur-sm">
                    <p className="text-[#E9C46A] font-semibold mb-1 text-sm">Hours</p>
                    <p className="text-[#EDE0D4] text-xs">Mon-Fri: 8AM - 8PM</p>
                    <p className="text-[#EDE0D4] text-xs">Sat-Sun: 9AM - 9PM</p>
                  </div>
                  <div className="p-4 bg-[#3E2723]/50 rounded-xl shadow-md border border-[#D4A373]/30 hover:border-[#D4A373]/60 hover:shadow-lg transition backdrop-blur-sm">
                    <p className="text-[#E9C46A] font-semibold mb-1 text-sm">Contact</p>
                    <p className="text-[#E9C46A] font-semibold text-xs">+91 8149916776</p>
                    <p className="text-[#EDE0D4] text-xs">For catering & orders</p>
                  </div>
                  <div className="p-4 bg-[#3E2723]/50 rounded-xl shadow-md border border-[#D4A373]/30 hover:border-[#D4A373]/60 hover:shadow-lg transition backdrop-blur-sm">
                    <p className="text-[#E9C46A] font-semibold mb-1 text-sm">Follow Us</p>
                    <p className="text-[#EDE0D4] text-xs">Instagram • Facebook</p>
                    <p className="text-[#EDE0D4] text-xs">Twitter • TikTok</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#D4A373]/30">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A373]">
                    © {new Date().getFullYear()} Cafe Relish. All Rights Reserved. Crafted with ❤️ for you.
                  </p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
        </ToastProvider>

      </body>
    </html>
  )
}