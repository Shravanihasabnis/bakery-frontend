import Link from 'next/link';

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-stone-800 font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4 bg-stone-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://b.zmtcdn.com/data/pictures/4/20989334/549972ae607d4267acc0d640bae45af9.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-6 leading-tight">Our Story</h1>
          <p className="text-lg md:text-xl text-stone-800 max-w-2xl mx-auto">
            Born in the heart of Kolhapur, Cafe Relish is where good food, great coffee, and even better company come together.
          </p>
        </div>
      </section>

      {/* --- THE BEGINNING --- */}
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-serif text-stone-900 mb-6">Where It All Began</h2>
              <p className="text-stone-700 mb-4 leading-relaxed">
                Cafe Relish was born out of a simple but passionate idea — to give Kolhapur a café experience that felt truly special. Nestled near Mahavir College on New Palace Road, we opened our doors with one clear mission: serve food worth relishing, in a space worth returning to.
              </p>
              <p className="text-stone-700 mb-4 leading-relaxed">
                From the very first day, the neighbourhood welcomed us with open arms. Students from nearby colleges, families from the area, and working professionals on their lunch breaks all found a home here — one cup of cold coffee and one plate of sizzler at a time.
              </p>
              <p className="text-stone-700 leading-relaxed">
                What started as a modest café in the Oasis Apartment complex has grown into one of Kolhapur's most loved dining spots, celebrated for its diverse menu, vibrant atmosphere, and consistent quality.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFeHkATDfjCBMNKQFEPbkU7QOjtaCBk20PLLJghwmQ5Drf5ldKpRZfL9mCdtnFY-EW3Mq-DZrnIVxWSpW0Y4Zq2AVDHBJSm6LAdYk7_MnD4O8tsODwXpQG2eqcWhANVp50EhMFX0Q=s1360-w1360-h1020-rw"
                alt="Cafe Relish interior"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR VALUES --- */}
      <section className="py-20 bg-[#F4F1EA] px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-stone-900 mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-2xl font-serif text-stone-900 mb-3">Something for Everyone</h3>
              <p className="text-stone-700">From Continental breakfasts to Chinese sizzlers, from bubble tea to wood-fired pizzas — our menu is built so every guest finds exactly what they're craving.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-serif text-stone-900 mb-3">Freshness First</h3>
              <p className="text-stone-700">Every dish is freshly prepared in our kitchen. We don't believe in shortcuts — only in ingredients that are honest, fresh, and full of flavour.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-2xl font-serif text-stone-900 mb-3">Community at Heart</h3>
              <p className="text-stone-700">We're not just a café — we're part of this neighbourhood. From college hangouts to family dinners and first dates, Cafe Relish has been the backdrop to countless Kolhapur memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CRAFT & PASSION --- */}
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1000&auto=format&fit=crop"
                alt="Kitchen at Cafe Relish"
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif text-stone-900 mb-6">Cooked with Passion</h2>
              <p className="text-stone-700 mb-4 leading-relaxed">
                Our kitchen team takes pride in every plate that leaves the pass. Whether it's a perfectly toasted Cheese Garlic Bread, a sizzling Herb Garlic Chicken platter, or a creamy Triple Chocó Chunk Brownie shake — every item is crafted with care and consistency.
              </p>
              <p className="text-stone-700 mb-4 leading-relaxed">
                We continuously evolve our menu to bring Kolhapur new experiences. When we introduced Pop'n'Sip — Kolhapur's first fruit bursting boba bubble tea — the response was overwhelming. That kind of excitement is exactly what drives us.
              </p>
              <p className="text-stone-700 leading-relaxed">
                We believe great food has the power to lift your mood, spark a conversation, and turn an ordinary afternoon into something memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <section className="py-20 bg-[#F4F1EA] px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-stone-900 mb-12 text-center">Our Journey So Far</h2>
          <div className="space-y-8">

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-700 text-white text-sm font-bold">.</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Doors Open on New Palace Road</h3>
                <p className="text-stone-700">We opened at G-5/6, Oasis Apartment, near Mahavir College — a small café with a big menu and even bigger ambitions. The neighbourhood showed up, and they never really left.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-700 text-white text-sm font-bold">.</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">The Menu Grows</h3>
                <p className="text-stone-700">Driven by customer love and feedback, we expanded to include sizzlers, wood-fired pizzas, and a full Chinese menu. Each addition brought new regulars through the door.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-700 text-white text-sm font-bold">Milestone</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Pop'n'Sip — Kolhapur's First Boba Experience</h3>
                <p className="text-stone-700">We became the first café in Kolhapur to introduce fruit bursting boba bubble teas. From Thai Milk Tea to Peach Passion Iced Tea, our Pop'n'Sip section became an instant favourite.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-700 text-white text-sm font-bold">Today</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Kolhapur's Favourite Café</h3>
                <p className="text-stone-700">With hundreds of happy guests every week and a menu spanning 10 categories, Cafe Relish continues to grow — always with the same spirit we started with: good food, warm hospitality, and a genuine love for this city.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- LOCATION CALLOUT --- */}
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-stone-900 mb-6">Find Us in Kolhapur</h2>
              <p className="text-stone-700 mb-4 leading-relaxed">
                We're located in the heart of the city, just a short walk from Mahavir College. Whether you're coming in for a quick cold coffee between lectures, a weekend brunch with family, or a long dinner with friends — we're easy to find and always ready to welcome you.
              </p>
              <p className="text-stone-700 mb-6 leading-relaxed font-medium">
                G-5/6, Oasis Apartment, New Palace Road,<br />
                Near Mahavir College, Ramanmala,<br />
                Kolhapur, Maharashtra — 416003
              </p>
              <Link
                href="/menu"
                className="inline-block px-8 py-3 bg-stone-900 text-white uppercase tracking-widest font-semibold rounded-md hover:bg-amber-800 transition-colors"
              >
                Browse Our Menu
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://b.zmtcdn.com/data/pictures/4/20989334/0d55ba23779a2cf17592ccd204bfc06c.jpg?fit=around|750:500&crop=750:500;*,*"
                alt="Cafe Relish Kolhapur"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- JOIN US --- */}
      <section className="py-20 bg-[#F4F1EA] px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-stone-900 mb-6">Be Part of Our Story</h2>
          <p className="text-lg text-stone-700 mb-10 max-w-2xl mx-auto">
            Every guest who walks through our door adds a new chapter to the Cafe Relish story. Come hungry, leave happy — and bring someone you love.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/menu"
              className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest font-semibold rounded-md hover:bg-amber-800 transition-colors"
            >
              Explore Our Menu
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-stone-900 uppercase tracking-widest font-semibold border-2 border-stone-900 rounded-md hover:bg-stone-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
