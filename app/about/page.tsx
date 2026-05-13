export default function AboutPage() {
    return (
      <main className="min-h-screen bg-bakery-cream text-bakery-dark py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] text-bakery-copper font-semibold mb-4">
            Our Story
          </h2>
          <h1 className="text-5xl md:text-6xl font-serif text-bakery-burgundy mb-8 leading-tight">
            Where French Flair <br /> Meets Pure Delight
          </h1>
          
          <div className="h-96 w-full bg-bakery-beige rounded-xl overflow-hidden shadow-2xl mb-12 relative border-4 border-bakery-copper">
             {/* Placeholder for a beautiful bakery kitchen image */}
             <img 
               src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" 
               alt="Baking Process" 
               className="object-cover w-full h-full" 
              />
          </div>
  
          <div className="space-y-6 text-lg text-bakery-brown leading-relaxed text-left md:text-center max-w-3xl mx-auto">
            <p>
              At Cafe Relish, we believe that baking is an art form. We blend the elegance of French patisserie with a pure, vegetarian menu that speaks to a love for uncompromising quality.
            </p>
            <p>
              Every single loaf of sourdough, every flaky croissant, and every delicate pastry is a labour of love. We use only the finest organic ingredients, traditional methods, and a touch of modern creativity to bring you the sweetest haven for freshly baked goods.
            </p>
          </div>
        </div>
      </main>
    );
  }