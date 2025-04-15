import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import '@/models/Author'; // ✅ Force-load to register the model only

import { Book } from '@/models/Book';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // disable static optimization

export async function GET(_req: NextRequest) {
  try {
    await connectToDB();

    // ✅ Populate author and lean all at once (fastest + single query)
    const books = await Book.find({})
      .populate({
        path: 'authorId',
        select: 'name bio photoUrl contactEmail socialLinks',
      })
      .lean();

    // ✅ Transform output: flatten "authorId" into "author"
    const booksWithAuthor = books.map((book) => {
      const { authorId, ...rest } = book;

      if (typeof authorId === 'object' && authorId !== null && 'name' in authorId) {
        const {
          name,
          bio,
          photoUrl,
          contactEmail,
          socialLinks,
        } = authorId as any; // optionally cast to IAuthor if needed

        return {
          ...rest,
          author: {
            name,
            bio,
            photoUrl,
            contactEmail,
            socialLinks,
          },
        };
      }

      return {
        ...rest,
        author: null,
      };
    });


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
