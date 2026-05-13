'use client';

import { useEffect, useState } from 'react';

interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState('Our Bakery');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/google-reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data.reviews || []);
        setBusinessName(data.businessName || 'Our Bakery');
        setError(null);
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError('Unable to load reviews at this time');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    // Refresh reviews every 5 minutes
    const interval = setInterval(fetchReviews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 bg-[#FAFAF7] border border-stone-200 rounded-lg animate-pulse">
            <div className="h-6 bg-stone-300 rounded mb-4 w-24"></div>
            <div className="h-20 bg-stone-200 rounded mb-4"></div>
            <div className="h-4 bg-stone-300 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-600 mb-4">{error || 'Unable to load live reviews'}</p>
        <a 
          href="https://www.google.com/maps/search/Hindustan+Bakers+and+confectioners" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          View Reviews on Google →
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-8 bg-[#FAFAF7] border border-stone-200 rounded-lg hover:shadow-lg transition">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-600">★★★★★</span>
              <span className="text-xs text-stone-500">{review.time}</span>
            </div>
            <p className="text-stone-700 mb-6 italic line-clamp-4">"{review.text}"</p>
            <p className="font-semibold text-stone-900">— {review.author}</p>
          </div>
        ))}
      </div>
      
      {/* View All Reviews Button */}
      <div className="text-center mt-8">
        <a 
          href="https://www.google.com/maps/search/Hindustan+Bakers+and+confectioners" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          View All {businessName} Reviews on Google →
        </a>
      </div>
    </>
  );
}
