// components/BookDetailsSection.tsx

import React from 'react';
import Link from 'next/link';

interface Format {
  type: string;
  price: number;
}

interface BookDetailsSectionProps {
  title: string;
  formats: Format[];
  author: string;
}

const BookDetailsSection: React.FC<BookDetailsSectionProps> = ({ title, formats, author }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-deep-brown">Discover the Epic Tale</h2>
            <p className="text-lg mb-4">
              Set against the backdrop of Kenya's post-colonial landscape, <strong>{title}</strong> follows Benjo's journey through treacherous territories
              and sacred rituals that test not only his courage but his understanding of what it means to be heir to a warrior's legacy.
            </p>
            <p className="text-lg mb-6">
              With prose that has been described as &quot;mesmerizing&quot; and &quot;evocative,&quot; <strong>{title}</strong> invites readers into a world
              where ancestral spirits and modern medicine collide, where each page reveals the powerful bonds between generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary">Read Chapter Preview</Link>
              <Link href="/purchase" className="btn-primary">Purchase Options</Link>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-sky rounded-lg p-8 shadow-lg border border-mountain">
              <h3 className="text-2xl font-bold mb-4 text-deep-brown">Book Details</h3>
              <ul className="space-y-3 text-deep-brown">
                <li className="flex"><span className="font-semibold w-32">Title:</span><span>{title}</span></li>
                <li className="flex"><span className="font-semibold w-32">Author:</span><span>{author}</span></li>
                <li className="flex"><span className="font-semibold w-32">Formats:</span><span>{formats.map(f => f.type).join(', ')}</span></li>
                <li className="flex"><span className="font-semibold w-32">Price:</span><span>${formats.find(f => f.type === 'hardcover')?.price}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsSection;
