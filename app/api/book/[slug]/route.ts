import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Book } from '@/models/Book';
import { Author } from '@/models/Author';

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  try {
    // Ensure params are awaited correctly
    const slug = context.params.slug; // Destructure slug from params

    // Wait for database connection
    await connectToDB();

    // Fetch the book based on the slug
    const book = await Book.findOne({ slug });

    if (!book) {
      return new NextResponse('Book not found', { status: 404 });
    }

    // Fetch the author information based on the authorId of the book
    const author = await Author.findById(book.authorId);

    if (!author) {
      return new NextResponse('Author not found', { status: 404 });
    }

    // Combine book and author data into a single response
    return NextResponse.json({
      book: {
        ...book.toObject(), // Convert book to plain object
        author: {
          name: author.name,
          bio: author.bio,
          photoUrl: author.photoUrl,
          contactEmail: author.contactEmail,
          socialLinks: author.socialLinks,
        },
      },
    });
  } catch (err) {
    return new NextResponse('Failed to fetch book', { status: 500 });
  }
}
