'use client';

import { useState } from "react";
import Link from "next/link";
import { IReview } from "@/models/Review"; // ✅ Import the correct type

interface Props {
  reviews: IReview[];
}

export default function FeaturedReviews({ reviews }: Props) {
  const [activeReview, setActiveReview] = useState(0);

  const nextReview = () => setActiveReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  if (!reviews.length) return <p className="text-center">No reviews available.</p>;

  const active = reviews[activeReview];

  return (
    <section className="py-16 bg-sky/90 text-deep-brown">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-2">Reader Reviews</h2>
        <p className="text-center mb-12 text-mountain-dark">
          See what others are saying about Numen of <span className="text-rooster font-semibold">Banda</span>
        </p>

        <div className="relative max-w-4xl mx-auto">
          {/* Prev Button */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-sky-light hover:bg-sky text-deep-brown w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 border border-mountain/30"
            aria-label="Previous review"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M15 19l-7-7 7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Review Card */}
          <div className="bg-sky-light/80 rounded-lg p-8 md:p-12 shadow-lg border border-mountain/30">
            <div className="text-4xl text-rooster mb-6">❝</div>
            <p className="text-xl md:text-2xl italic mb-6 text-deep-brown">{active.quote}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-deep-brown">{active.userName}</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < active.rating ? "text-rooster" : "text-mountain-light"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l..." />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-sm text-mountain">
                {activeReview + 1} of {reviews.length}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-sky-light hover:bg-sky text-deep-brown w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-mountain/30"
            aria-label="Next review"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M9 5l7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-block border-2 border-rooster hover:bg-rooster text-deep-brown hover:text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
