import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  bio: string;
  photoUrl?: string;
  contactEmail?: string;
  socialLinks: Partial<{
    facebook: string;
    instagram: string;
    linkedin: string;
    x: string;
  }>;
  quoteHighlight?: string;
  creativeProcess?: string;
  latestWork?: string;
  upcomingProjects?: {
    title: string;
    status: 'in progress' | 'published' | 'draft';
  }[];
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    photoUrl: { type: String, default: undefined },
    contactEmail: { type: String, default: undefined },
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
      x: String, // can alias internally as Twitter if needed
    },
    quoteHighlight: { type: String, default: '' },
    creativeProcess: { type: String, default: '' },
    latestWork: { type: String, default: undefined },
    upcomingProjects: [
      {
        title: { type: String, required: true },
        status: {
          type: String,
          enum: ['in progress', 'published', 'draft'],
          default: 'in progress',
        },
      },
    ],
  },
  { timestamps: true }
);

export const Author: Model<IAuthor> =
  mongoose.models.Author || mongoose.model<IAuthor>('Author', AuthorSchema);
