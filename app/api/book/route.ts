import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Book } from '@/models/Book';
import { Author } from '@/models/Author';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic'; // disables static optimization

interface BookWithAuthor extends mongoose.Document {
  _id: string;
  title: string;
  slug: string;
  synopsis?: string;
  chapterPreview?: string;
  coverImageUrl?: string;
  formats: Array<{
    type: string;
    price: number;
  }>;
  features?: string[];
  author?: {
    name: string;
    bio: string;
    photoUrl?: string;
    contactEmail?: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  } | null;
}

export async function GET(_req: NextRequest) {
  try {
    await connectToDB();

    // 👇 to this, to ensure we work with plain objects
    const books = await Book.find({}).lean();

    const booksWithAuthor = await Promise.all(
      books.map(async (book) => {
        const author = await Author.findById(book.authorId).lean(); // also lean here!

        return {
          ...book,
          author: author
            ? {
              name: author.name,
              bio: author.bio,
              photoUrl: author.photoUrl,
              contactEmail: author.contactEmail,
              socialLinks: author.socialLinks,
            }
            : null,
        };
      })
    );


    return NextResponse.json(
      { success: true, data: booksWithAuthor },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API_BOOKS_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch books.' },
      { status: 500 }
    );
  }
}
