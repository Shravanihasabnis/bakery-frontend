"use client";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

type Category =
  | 'all'
  | 'Continental'
  | 'Quick Bites'
  | 'Pizzas'
  | 'Pastas'
  | 'Burgers'
  | 'Rolls & Sandwiches'
  | 'Chinese & Sizzler'
  | 'Hot Beverages'
  | 'Cold Beverages'
  | "Pop'n'Sip";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All',                value: 'all' },
  { label: 'Continental',        value: 'Continental' },
  { label: 'Quick Bites',        value: 'Quick Bites' },
  { label: 'Pizzas',             value: 'Pizzas' },
  { label: 'Pastas',             value: 'Pastas' },
  { label: 'Burgers',            value: 'Burgers' },
  { label: 'Rolls & Sandwiches', value: 'Rolls & Sandwiches' },
  { label: 'Chinese & Sizzler',  value: 'Chinese & Sizzler' },
  { label: 'Hot Beverages',      value: 'Hot Beverages' },
  { label: 'Cold Beverages',     value: 'Cold Beverages' },
  { label: "Pop'n'Sip",          value: "Pop'n'Sip" },
];

export default function MenuList({ items }: { items: any[] }) {
  const [category, setCategory] = useState<Category>('all');

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1)) as Category;
    const valid = CATEGORIES.map((c) => c.value);
    if (valid.includes(hash)) setCategory(hash);
  }, []);

  const visible =
    category === 'all'
      ? items
      : items.filter((i) => i?.category === category);

  // Debug: log a snapshot of visible items to verify which image fields are used
  useEffect(() => {
    if (!visible) return;
    try {
      // show up to first 6 items with their resolved image value
      const sample = visible.slice(0, 6).map((i) => ({ name: i?.name, image: i?.imageUrl || i?.image }));
      // eslint-disable-next-line no-console
      console.debug('MenuList visible sample:', sample);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.debug('MenuList debug error', err);
    }
  }, [visible]);

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex gap-3 mb-12 justify-center flex-wrap">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            className={`px-5 py-2.5 rounded-lg font-semibold uppercase tracking-wide text-sm transition-all shadow-md
              ${category === value
                ? 'bg-bakery-olive text-bakery-cream shadow-lg border-2 border-bakery-gold'
                : 'bg-bakery-beige text-bakery-dark hover:bg-bakery-gold border-2 border-bakery-beige'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Section heading */}
      {category !== 'all' && (
        <h2 className="text-3xl font-serif text-bakery-dark mb-8 text-center">
          {category}
        </h2>
      )}

      {/* Items grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((product: any, idx: number) => (
            <ProductCard
              key={product._id ?? idx}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.imageUrl || product.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-bakery-brown text-lg py-16">
          No items found in this category.
        </p>
      )}
    </div>
  );
}
