import { connectToDB } from '../db';
import { Book } from '@/models/Book';

export const getBooks = async () => {
  try {
    await connectToDB();
    return await Book.find({}).lean();
  } catch (error) {
    console.error('[GET_BOOKS_ERROR]', error);
    return []; // fail-safe return
  }
};
