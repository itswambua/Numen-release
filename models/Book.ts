import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IAuthor } from './Author'; // Import IAuthor interface

interface IFormat {
  type: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  price: number;
}

interface IFeature {
  icon: string;
  title: string;
  description: string;
  iconClassName?: string;  // Optional field for storing the icon class name
}

export interface IBook extends Document {
  title: string;
  slug: string;
  authorId: IAuthor;  // Type directly as IAuthor
  synopsis?: string;
  chapterPreview?: string;
  coverImageUrl?: string;
  formats: IFormat[];
  features?: IFeature[];
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    synopsis: String,
    chapterPreview: String,
    coverImageUrl: String,
    formats: [
      {
        type: {
          type: String,
          enum: ['hardcover', 'paperback', 'ebook', 'audiobook'],
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],
    features: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        iconClassName: { type: String }, // Add iconClassName to store the class name for the icon
      },
    ],
  },
  { timestamps: true }
);

export const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
