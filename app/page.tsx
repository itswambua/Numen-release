'use client';

import { useState, useEffect } from 'react';
import { IFeature } from '@/types/features'; // Import the IFeature type
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookDetailsSection from '@/components/BookDetailsSection';
import BookFeatures from '@/components/BookFeatures';  // Default import
import FeaturedReviews from '@/components/FeaturedReviews';
import AuthorSection from '@/components/AuthorSection';
import Link from 'next/link';
import { IBook } from '@/models/Book';

export default function Home() {
  const [book, setBook] = useState<IBook | null>(null);
  const [authorName, setAuthorName] = useState<string>('Unknown Author');
  const [features, setFeatures] = useState<IFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // State to handle loading
  const [error, setError] = useState<string | null>(null);  // State to handle errors


  const quickLinks = [
    { href: '/book', label: 'The Book', icon: <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg> },
    { href: '/reviews', label: 'Reviews', icon: <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> },
    { href: '/purchase', label: 'Purchase', icon: <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg> },
    { href: '/about', label: 'About Author', icon: <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg> },
  ];
  
  const socialLinks = [
    { href: 'https://twitter.com/HillanNzioka', label: 'Twitter', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { href: 'https://www.linkedin.com/in/hillan-nzioka-b3540436/', label: 'LinkedIn', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg> }
  ];
  
  const contactEmail = "info@numenofbanda.com";
  
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
      <Navbar />
      <Hero />

      <BookDetailsSection 
        title={book.title} 
        formats={book.formats} 
        author={authorName} 
      />

      <BookFeatures features={features} />

      <FeaturedReviews />
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

      <Footer 
            quickLinks={quickLinks} 
            socialLinks={socialLinks} 
            contactEmail={contactEmail} 
          />
    </>
  );
}
