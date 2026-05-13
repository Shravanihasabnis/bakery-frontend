'use client'

import Link from 'next/link'

export default function CafePage(){
  return (
    <main className="min-h-screen bg-bakery-cream text-bakery-dark">

      {/* --- HERO --- */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/gps-cs-s/APNQkAEMzw7SpDVYNOEPqrMCKK-rqXqaOlE46uV8ibwv84WAk6FmHq-m17VNIVZwKnnh9yVZyf_oExNYhTBdAg2y4jSJR3LxsNu9rwawvHR5FYUNxyEUUmMIZx4HYpZig6-XEp_3YF16=s1360-w1360-h1020-rw')] bg-cover bg-center filter brightness-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-plum/30 to-bakery-olive-dark/50"></div>
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-7xl font-serif text-bakery-cream mb-4 drop-shadow-lg">Cafe Relish</h1>
          <p className="text-lg md:text-xl text-bakery-light-gray mb-6 drop-shadow">
            Kolhapur's favourite spot for great food, craft beverages, and memories worth making.
          </p>
          <Link href="/menu" className="inline-block bg-bakery-bronze text-bakery-cream px-6 py-3 rounded-lg font-semibold hover:bg-bakery-gold transition shadow-lg">
            Explore Our Menu
          </Link>
        </div>
      </section>

      {/* --- AMBIENCE & WHAT WE OFFER --- */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif text-bakery-plum mb-4">More Than Just a Café</h2>
            <p className="text-bakery-text-muted mb-4 text-lg">
              Nestled near Mahavir College on New Palace Road, Cafe Relish is where Kolhapur comes to eat, unwind, and connect. Whether you're here for a quick breakfast before class, a sizzler dinner with family, or a bubble tea catch-up with friends — there's always a reason to visit.
            </p>
            <ul className="space-y-3 text-bakery-dark font-medium">
              <li>• Continental breakfasts & all-day bites</li>
              <li>• Wood-fired 8-inch pizzas & handmade pastas</li>
              <li>• Sizzlers, Chinese starters & fried rice</li>
              <li>• Craft hot & cold coffees, teas & mocktails</li>
              <li>• Kolhapur's first fruit bursting boba bubble teas</li>
            </ul>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Link href="/menu" className="px-5 py-2 rounded-lg bg-bakery-olive text-bakery-cream font-semibold hover:bg-bakery-olive-dark shadow-md hover:shadow-lg transition">
                Browse Full Menu
              </Link>
              <a href="#visit" className="px-5 py-2 rounded-lg bg-bakery-cream border-2 border-bakery-plum text-bakery-plum font-semibold hover:bg-bakery-light-gray transition">
                Plan a Visit
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAHHDTLIlXokSiOrQdF21opv_Lz1yRpO_pqx3wMSmqQWYQnzTsAndH2lxKJQTERos9dhRmPIRPs1XM14KOwBwZFmRkGsBt_q2frwRigycHa8j_m1hImw6s9gZYPU363bnpc5AFvP=s1360-w1360-h1020-rw" alt="Cafe Relish interior" className="w-full h-44 object-cover rounded-lg shadow-lg border-2 border-bakery-bronze" />
            <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAE3hMp7qV_y9adX5mbRBenHAHf0-XUy9puJwljJ-tZvEI5k2pAJ5UcG-2XV_MGJtkYYMx4xUTEuG3KC3AFAXKDbRlBPX6fgVXN8ibZo0EpOvmkhf4FtjjkGXEUwt6YiAtbibYc0=s1360-w1360-h1020-rw" alt="Cafe Relish" className="w-full h-44 object-cover rounded-lg shadow-lg border-2 border-bakery-bronze" />
            <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGStSlYk4bVbZdXwuHY6aQEwNX19u9tFFzz2mVS6UppbJgToCux-HxvJUQ8W2PN6h3EhpTkK3pXa9vVQndDFz0TZk44pUWLSJ2658H7vjD2Edp5lMiWqidwPbiDJmTr4qKxpIqN0z6mJj8O=s1360-w1360-h1020-rw" alt="Burger" className="w-full h-44 object-cover rounded-lg shadow-lg border-2 border-bakery-bronze" />
            <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAHXuoNXlBgPK1PPDlguSTe78A1w6qK1VX2Ht7XMPZcyhDslemYZZnhzY_Y8WqjNEORjXvZxT_7tUFqSDc4L8fU7H4CSnPefhbrsSoh-v8vjzKfEW53iMhDuhcaC3HTQO3BSfgI35g=s1360-w1360-h1020-rw" alt="Cafe Relish" className="w-full h-44 object-cover rounded-lg shadow-lg border-2 border-bakery-bronze" />
          </div>
        </div>
      </section>

      {/* --- HIGHLIGHTS STRIP --- */}
      <section className="py-14 bg-[#F4F1EA] px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-3">☕</div>
            <h3 className="text-lg font-serif text-bakery-plum mb-1">Craft Beverages</h3>
            <p className="text-bakery-text-muted text-sm">From espresso flights to exotic teas, cold blends and fresh juices — there's a drink for every mood.</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🍕</div>
            <h3 className="text-lg font-serif text-bakery-plum mb-1">Pizzas & Pastas</h3>
            <p className="text-bakery-text-muted text-sm">Freshly made 8-inch pizzas and handcrafted pastas in veg & non-veg varieties that keep you coming back.</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🔥</div>
            <h3 className="text-lg font-serif text-bakery-plum mb-1">Sizzlers</h3>
            <p className="text-bakery-text-muted text-sm">A Cafe Relish signature — flame-hot sizzler platters with your choice of sauce and fries, served dramatically at the table.</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🧋</div>
            <h3 className="text-lg font-serif text-bakery-plum mb-1">Pop'n'Sip Boba</h3>
            <p className="text-bakery-text-muted text-sm">Kolhapur's first fruit bursting boba bubble teas — Thai Milk Tea, Taro, Mango Peach and more.</p>
          </div>
        </div>
      </section>

      {/* --- VIBE SECTION --- */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFuJxj5ONpzT5YMjj22O2dXo5lRG3d4Zt0UugJqAQmHAlCFeEsKKGWpXgfFb9WDUeWQY_v42ua0zp1ZnZrmwbuOYkxUnKnlz9SmHRN2K2GxJ_wZ_-WNV4wkgFq7-BH7JJeig3ix=s1360-w1360-h1020-rw"
              alt="Kitchen at Cafe Relish"
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-bakery-plum mb-4">Freshly Made, Every Time</h2>
            <p className="text-bakery-text-muted mb-4 text-lg">
              Everything on our menu is prepared fresh in our kitchen. No pre-packaged shortcuts — just real ingredients, real recipes, and real effort put into every single order.
            </p>
            <p className="text-bakery-text-muted mb-4 text-lg">
              Our team takes pride in the details — the right amount of heat in a Chicken Chilli, the perfect crunch on a Veg Spring Roll, the creaminess of a cold Triple Chocó Chunk Brownie shake.
            </p>
            <p className="text-bakery-text-muted text-lg">
              That commitment to quality is what turns first-time guests into regulars, and regulars into family.
            </p>
          </div>
        </div>
      </section>

      {/* --- VISIT US --- */}
      <section id="visit" className="py-16 bg-gradient-to-r from-bakery-light-gray to-bakery-cream border-t-4 border-bakery-bronze">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-serif text-bakery-plum mb-3">Visit Cafe Relish</h3>
          <p className="text-bakery-text-muted mb-2 text-lg">
            G-5/6, Oasis Apartment, New Palace Road,<br />
            Near Mahavir College, Ramanmala,<br />
            Kolhapur, Maharashtra — 416003
          </p>
          <p className="text-bakery-text-muted mb-8 text-base">
            Open daily — dine in, takeaway, and online orders welcome.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              className="px-6 py-3 bg-bakery-olive text-bakery-cream rounded-lg font-semibold shadow-md hover:shadow-lg transition"
              href="https://maps.google.com/?q=G-5/6+Oasis+Apartment+New+Palace+Road+Kolhapur"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
            <Link
              href="/menu"
              className="px-6 py-3 border-2 border-bakery-plum text-bakery-plum rounded-lg font-semibold hover:bg-bakery-light-gray transition"
            >
              See Full Menu
            </Link>
            <a
              className="px-6 py-3 border-2 border-bakery-bronze text-bakery-bronze rounded-lg font-semibold hover:bg-bakery-light-gray transition"
              href="mailto:hello@caferelish.in"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
