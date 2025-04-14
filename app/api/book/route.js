import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Book } from '@/models/Book';
import { Author } from '@/models/Author'; // Import the Author model

export async function GET() {
  try {
    await connectToDB();

    const books = await Book.find({}); // Fetch all books

    // Fetch author data for each book
    const booksWithAuthor = await Promise.all(
      books.map(async (book) => {
        const author = await Author.findById(book.authorId);

        if (author) {
          return {
            ...book.toObject(),
            author: {
              name: author.name,
              bio: author.bio,
              photoUrl: author.photoUrl,
              contactEmail: author.contactEmail,
              socialLinks: author.socialLinks,
            },
          };
        } else {
          return {
            ...book.toObject(),
            author: null,
          };
        }
      })
    );

    return NextResponse.json({ success: true, data: booksWithAuthor }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch books.' },
      { status: 500 }
    );
  }
}
