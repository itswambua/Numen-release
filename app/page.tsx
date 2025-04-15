'use client';

import { useState, useEffect } from 'react';
import { IFeature } from '@/types/features'; // Import the IFeature type

import Hero from '@/components/Hero';
import BookDetailsSection from '@/components/BookDetailsSection';
import BookFeatures from '@/components/BookFeatures';  // Default import
import FeaturedReviews from '@/components/FeaturedReviews';
import AuthorSection from '@/components/AuthorSection';
import Link from 'next/link';
import { IReview } from '@/models/Review';

import { IBook } from '@/models/Book';


export default function Home() {
  const [book, setBook] = useState<IBook | null>(null);
  const [authorName, setAuthorName] = useState<string>('Unknown Author');
  const [features, setFeatures] = useState<IFeature[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // State to handle loading
  const [error, setError] = useState<string | null>(null);  // State to handle errors



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // Set loading to true when the fetch starts
        const res = await fetch('/api/book');  // Adjusted to fetch all books
        const data = await res.json();

        if (!data.success || data.data.length === 0) {
          setError('No books found');
          setLoading(false);
          return;
        }

        const firstBook = data.data[0];  // Use the first book
        setBook(firstBook);
        setAuthorName(firstBook.author ? firstBook.author.name : 'Unknown Author');

        // Preprocess features to inject the correct class names for icons
        const processedFeatures = firstBook.features.map((feature: any) => {
          console.log(feature.icon);  // Check the actual value of feature.icon

          let iconClassName;

          switch (feature.icon) {
            case 'book':
              iconClassName = 'w-12 h-12 text-blue-500';
              break;
            case 'users':
              iconClassName = 'w-12 h-12 text-green-500';
              break;
            case 'globe':
              iconClassName = 'w-12 h-12 text-orange-500';
              break;
            case 'heart':
              iconClassName = 'w-12 h-12 text-red-500';
              break;
            default:
              iconClassName = 'w-12 h-12 text-gray-500';
          }

          return { ...feature, iconClassName };
        });

        setFeatures(processedFeatures);  // Set processed features

        // ✅ Fetch featured reviews
        const reviewsRes = await fetch(`/api/reviews?book=${firstBook._id}`);
        const reviewsJson = await reviewsRes.json();
        const featuredReviews = reviewsJson.data?.filter((review: IReview) => review.rating >= 4) || [];
        setReviews(featuredReviews);


        setLoading(false);  // Set loading to false after fetching is done
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load book data');
        setLoading(false);  // Set loading to false on error
      }


    };

    fetchData();
  }, []);

  // Show loading state while waiting for data
  if (loading) {
    return (
      <div className="p-6 text-center text-deep-brown">
        <h2 className="font-semibold text-lg">Loading Book Information...</h2>
      </div>
    );
  }

  // Show error message if fetching fails
  if (error) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  // If book is not found, return a proper message
  if (!book) {
    return <div className="p-6 text-red-600 font-semibold">Book not found.</div>;
  }

  // If book is found, render the content
  return (
    <>
      {/* <Navbar /> */}
      <Hero />

      <BookDetailsSection 
        title={book.title} 
        formats={book.formats} 
        author={authorName} 
      />

      <BookFeatures features={features} />

      <FeaturedReviews reviews={reviews} />
      <AuthorSection />

      <section className="py-16 bg-sky text-deep-brown text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Begin Your Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have already discovered the magic of <strong>{book.title}</strong>.
          </p>
          <Link href="/purchase" className="btn-primary">Get Your Copy Now</Link>
        </div>
      </section>


    </>
  );
}
