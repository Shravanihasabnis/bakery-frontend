import Link from 'next/link';

export default function Storefront() {
  return (
    <div className="min-h-screen bg-bakery-cream text-bakery-dark font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 bg-gradient-to-br from-bakery-cream via-bakery-beige to-bakery-cream overflow-hidden">
        {/* Placeholder for a beautiful bakery background image */}
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/gps-cs-s/APNQkAG49PnbmYNVmX0JzhxHE5XQVg51Vrtgax8H4TKKwDFoyUouX3L096C7kcezlkkomiT-TdrGMNdgAYiUvuGlPIDEokz8MNZmuopJiPt9_fI1s0rUbAGCYGqbxsaCLtH9ERmIyzwR=s1360-w1360-h1020-rw')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-amber-800 font-semibold mb-4">
            Where French Flair Meets Pure Delight
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif text-bakery-plum mb-6 leading-tight drop-shadow-lg">
            Indulge in happiness.
          </h1>
          <p className="text-lg md:text-xl text-black mb-10 max-w-2xl mx-auto drop-shadow">
            Blending the elegance of French patisserie with a pure, vegetarian menu. Discover a world of hand-crafted breads and buttery pastries.
          </p>
          <Link href="/cafe" className="border-2 border-bakery-brown text-bakery-dark px-8 py-3 uppercase tracking-widest hover:bg-bakery-brown hover:text-bakery-cream transition-all duration-300 font-semibold shadow-lg">
            Explore More
          </Link>
          
        </div>
      </section>

      {/* --- THE BAKERY & THE CAFE (Split Layout) --- */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* The Bakery */}
        <div id="bakery" className="space-y-8">
          <div>
            <h2 className="text-5xl font-serif text-bakery-brown mb-4">🥐 The Bakery</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-bakery-gold to-bakery-bronze rounded-full"></div>
          </div>
          <p className="text-lg text-bakery-text-muted leading-relaxed">
            Your go-to destination for artisan breads and French-inspired pastries. From the irresistible flakiness of a butter croissant to melt-in-your-mouth pralines, every creation is a labour of love, inspired by traditional methods.
          </p>
          <Link href="/menu" className="inline-block px-8 py-3 bg-gradient-to-r from-bakery-gold to-bakery-bronze text-bakery-dark font-semibold uppercase tracking-wide hover:shadow-xl transition-shadow rounded-lg shadow-md">
            Explore Menu →
          </Link>
        </div>
        <div className="h-96 relative shadow-2xl rounded-xl overflow-hidden group border-4 border-bakery-gold">
          <img
          src="https://lh3.googleusercontent.com/p/AF1QipNSJWCNllyERekf9BfpiaAJIQIvYswESUBLLRwK=s1360-w1360-h1020-rw"
          alt="Artisan breads and pastries"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* The Cafe */}
        <div className="h-96 bg-gradient-to-br from-bakery-gold/30 to-bakery-bronze/30 rounded-xl overflow-hidden relative shadow-xl md:order-3 border-4 border-bakery-bronze">
           {/* Placeholder for Cafe/Coffee Image */}
           <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGvEjMvGEw_pOhaPvkBjyFQpjERQdUsK6mxmZy1mDSvBa34iFoeKNDGR4pm6cYsEtF4o8Ja0-uWHBeogWeYKrSS-CWlrLOm1umOgVgVTqKnTfnj9QA3ig3Jcq3YMTuRoXPN86It=s1360-w1360-h1020-rw" alt="Cafe Ambience" className="object-cover w-full h-full" />
        </div>
        <div id="cafe" className="space-y-6 md:order-4 text-right">
          <h2 className="text-4xl font-serif text-bakery-plum">The Café</h2>
          <p className="text-bakery-text-muted leading-relaxed">
            Step into our Café, where the ambience is as inviting as the menu. Whether you're in the mood for a rich cup of coffee or our famed signature pasta, every detail brings you a delightful dining experience combining sophistication with warmth.
          </p>
          <Link href="/cafe" className="inline-block px-8 py-3 bg-gradient-to-r from-bakery-gold to-bakery-bronze text-bakery-dark font-semibold uppercase tracking-wide hover:shadow-xl transition-shadow rounded-lg shadow-md">
            Visit cafe →
          </Link>
        </div>
      </section>

      

      {/* --- FEATURE GRID (Cakes, Bites, Brews) --- */}
      <section className="bg-gradient-to-br from-[#2F1B12] via-[#3E2723] to-[#5C3D2E] text-[#FAF9F6] py-24 px-8 md:px-16 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-[#E9C46A] drop-shadow-md">Enjoy each bite to the fullest!</h2>
            <p className="text-[#EDE0D4] text-lg">Croissants, a true delight baked with love and organic ingredients.</p>
          </div>
          
          {/* Updated Grid with Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Continental', image: 'https://the-garden.in/wp-content/uploads/2024/07/Continental-2.webp', href: '/menu#Continental' },
              { title: 'Quick Bites', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2026/1/19/ab5e67a7-294a-468a-a50f-1cf02dec7945_cdc3fa37-6842-4793-bc8f-1ea13abbe037.JPG', href: '/menu#Quick Bites' },
              { title: 'Hot Beverages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvthhy8frIY2WeY4dgkTfGd9zzChCeVpv5zw&s', href: '/menu#Hot Beverages' },
              { title: "Pop'n'Sip", image: 'https://www.chinasichuanfood.com/wp-content/uploads/2018/03/matcha-milk-tea_-69.webp', href: '/menu#Pop\'n\'Sip' }
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="relative aspect-square overflow-hidden group border border-[#D4A373] block rounded-lg shadow-lg hover:shadow-2xl transition-all"
              >
                {/* The Background Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Dark Overlay so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition"></div>
                
                {/* The Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-serif tracking-wide text-[#E9C46A] relative z-10 drop-shadow-lg">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/menu" className="inline-block bg-[#E9C46A] text-[#2F1B12] px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-[#D4A373] shadow-lg transition rounded-lg">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION (Light Background) --- */}
      <section className="bg-gradient-to-b from-bakery-cream via-bakery-beige to-bakery-cream py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Reviews Section */}
          <div className="pt-8">
            <h3 className="text-3xl font-serif text-center mb-12 text-bakery-burgundy">What Our Guests Say 🌟</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Review 1 */}
              <div className="bg-bakery-beige p-8 rounded-xl border-2 border-bakery-gold hover:border-bakery-copper shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-bakery-dark mb-6 italic leading-relaxed">
                  "Cafe relish is the most elegant and beautiful cafe serves mouth watering food with amazing ambience 😍 don't forget to try their desserts and special dishes"
                </p>
                <p className="text-bakery-burgundy font-semibold">Shri Deshpande</p>
                <p className="text-bakery-brown text-sm">Local Guide • 441 reviews • 6 months ago</p>
              </div>

              {/* Review 2 */}
              <div className="bg-bakery-beige p-8 rounded-xl border-2 border-bakery-gold hover:border-bakery-copper shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-bakery-dark mb-6 italic leading-relaxed">
                  "This cafe is fabulous! The food was absolutely delicious especially veg bruschetta and veg lasagne. Every bite and sip was a flavor explosion. The ambiance was incredibly inviting with warm lighting and a peaceful atmosphere."
                </p>
                <p className="text-bakery-burgundy font-semibold">Cafe Connoisseur</p>
                <p className="text-bakery-brown text-sm">Local Guide • Premium Experience</p>
              </div>

              {/* Review 3 */}
              <div className="bg-bakery-beige p-8 rounded-xl border-2 border-bakery-gold hover:border-bakery-copper shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-bakery-dark mb-6 italic leading-relaxed">
                  "Cafe relish located near new palace kolhapur, has a modern and minimalist interior. The food is delicious, with a variety of shakes, desserts, and ice cream. Great quality and presentation!"
                </p>
                <p className="text-bakery-burgundy font-semibold">ravishankar chavare</p>
                <p className="text-bakery-brown text-sm">Local Guide • 138 reviews • a year ago</p>
              </div>

              {/* Review 4 */}
              <div className="bg-bakery-beige p-8 rounded-xl border-2 border-bakery-gold hover:border-bakery-copper shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-bakery-dark mb-6 italic leading-relaxed">
                  "Best Experience At A Cafe I Ever Had. 10/10. Would Recommend To Every Person. Specifically for Morning Coffee and Breakfast. Good Atmosphere, Vibes and Service. Glad I Found It!"
                </p>
                <p className="text-bakery-burgundy font-semibold">Gaurav Powar</p>
                <p className="text-bakery-brown text-sm">Local Guide • Breakfast Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}