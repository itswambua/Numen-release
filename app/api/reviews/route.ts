// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Review } from '@/models/Review';
import { Book } from '@/models/Book'; // ⬅ import the Book model

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const bookId = req.nextUrl.searchParams.get('book');
    const query = bookId ? { book: bookId } : {};

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .limit(3); // ✅ Limit to the 3 most recent reviews

    return NextResponse.json({ success: true, data: reviews });
  } catch (err) {
    console.error('[REVIEWS_FETCH_ERROR]', err);
    return new NextResponse('Failed to fetch reviews', { status: 500 });
  }
}


export async function POST(req: NextRequest) {
        try {
          await connectToDB();
          const body = await req.json();
          const { userName, quote, rating, title } = body;
      
          if (!userName || !quote || !rating) {
            return new NextResponse('Missing required fields', { status: 400 });
          }
      
          // Automatically fetch the book ID for the known book
          const book = await Book.findOne({ slug: 'the-numen-of-banda' });
          if (!book) {
            return new NextResponse('Book not found', { status: 404 });
          }
      
          const review = new Review({ userName, quote, rating, title, book: book._id });
          await review.save();
      
          return NextResponse.json({ message: 'Review submitted successfully', review });
        } catch (err) {
          console.error(err);
          return new NextResponse('Failed to submit review', { status: 500 });
        }
      }
      