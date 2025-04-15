import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/User';
import { NextRequest } from 'next/server';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectToDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('Auth Error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export const GET = (req: NextRequest) => handler(req);
export const POST = (req: NextRequest) => handler(req);
